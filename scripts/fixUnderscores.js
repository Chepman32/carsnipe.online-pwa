#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Supabase client
import { createClient } from "@supabase/supabase-js";

// Configuration
const FIREBASE_STORAGE_PATH =
  "gs://carsnipe-online.firebasestorage.app/images/cars";
const FIREBASE_STORAGE_BASE =
  "https://firebasestorage.googleapis.com/v0/b/carsnipe-online.firebasestorage.app/o";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "your-supabase-url";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Progress tracking
let currentStep = 0;
let totalSteps = 3;

function updateProgress(step, message, current = 0, total = 0) {
  currentStep = step;
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const progressBar =
    total > 0 ? ` [${current}/${total}] (${percentage}%)` : "";
  console.log(`[${step}/${totalSteps}] ${message}${progressBar}`);
}

// Check if Firebase CLI is installed
function checkFirebaseCLI() {
  try {
    execSync("firebase --version", { stdio: "pipe" });
    return true;
  } catch (error) {
    return false;
  }
}

// Check if user is authenticated with Firebase
function checkFirebaseAuth() {
  try {
    const result = execSync("firebase projects:list", { stdio: "pipe" });
    return result.toString().includes("carsnipe-online");
  } catch (error) {
    return false;
  }
}

// Find files with underscores in Firebase Storage
async function findFilesWithUnderscores() {
  try {
    console.log("🔍 Finding files with underscores in Firebase Storage...");

    const listCommand = `gsutil ls ${FIREBASE_STORAGE_PATH}/*`;
    let allFiles = [];

    try {
      const result = execSync(listCommand, { stdio: "pipe" });
      allFiles = result
        .toString()
        .trim()
        .split("\n")
        .filter((line) => line.trim());
    } catch (error) {
      console.log("ℹ️  No files found in Firebase Storage");
      return [];
    }

    const filesWithUnderscores = allFiles.filter((file) => file.includes("_"));
    console.log(
      `📁 Found ${filesWithUnderscores.length} files with underscores out of ${allFiles.length} total files`
    );

    return filesWithUnderscores;
  } catch (error) {
    console.error("❌ Error finding files with underscores:", error.message);
    return [];
  }
}

// Rename files in Firebase Storage
async function renameFilesInFirebase(filesWithUnderscores) {
  try {
    console.log("🔄 Renaming files in Firebase Storage...");

    let renamedCount = 0;
    const totalFiles = filesWithUnderscores.length;

    for (let i = 0; i < totalFiles; i++) {
      const oldPath = filesWithUnderscores[i];
      const filename = oldPath.split("/").pop();
      const newFilename = filename.replace(/_/g, "");
      const newPath = oldPath.replace(filename, newFilename);

      try {
        // Copy file to new name
        const copyCommand = `gsutil cp "${oldPath}" "${newPath}"`;
        execSync(copyCommand, { stdio: "pipe" });

        // Delete old file
        const deleteCommand = `gsutil rm "${oldPath}"`;
        execSync(deleteCommand, { stdio: "pipe" });

        renamedCount++;
        console.log(`✅ Renamed: ${filename} → ${newFilename}`);
      } catch (error) {
        console.error(`❌ Error renaming ${filename}:`, error.message);
      }

      // Update progress
      updateProgress(
        2,
        "🔄 Renaming files in Firebase Storage...",
        i + 1,
        totalFiles
      );
    }

    console.log(
      `✅ Renamed ${renamedCount}/${totalFiles} files in Firebase Storage`
    );
    return renamedCount;
  } catch (error) {
    console.error("❌ Error renaming files in Firebase:", error.message);
    throw error;
  }
}

// Update database records to remove underscores
async function updateDatabaseRecords() {
  try {
    console.log("💾 Updating database records to remove underscores...");

    // Get all cars from database
    const { data: cars, error: fetchError } = await supabase
      .from("cars")
      .select("*");

    if (fetchError) {
      console.error("❌ Error fetching cars:", fetchError);
      throw fetchError;
    }

    console.log(`📊 Found ${cars.length} cars in database`);

    let updatedCount = 0;
    const updates = [];

    for (const car of cars) {
      const originalModel = car.model;
      const newModel = car.model.replace(/_/g, "");

      if (originalModel !== newModel) {
        updates.push({
          id: car.id,
          make: car.make, // Include the make field to avoid null constraint
          model: newModel,
        });
        console.log(`📝 Will update: ${originalModel} → ${newModel}`);
      }
    }

    if (updates.length === 0) {
      console.log("ℹ️  No database records need updating");
      return 0;
    }

    // Update all records that need changes
    const { data: updatedCars, error: updateError } = await supabase
      .from("cars")
      .upsert(updates, { onConflict: "id" })
      .select();

    if (updateError) {
      console.error("❌ Error updating cars:", updateError);
      throw updateError;
    }

    console.log(`✅ Updated ${updates.length} database records`);
    return updates.length;
  } catch (error) {
    console.error("❌ Error updating database records:", error.message);
    throw error;
  }
}

// Main function to fix underscores
async function fixUnderscores() {
  try {
    console.log("🔧 Starting underscore fix process...");
    console.log("");

    // Check prerequisites
    if (!checkFirebaseCLI()) {
      console.error("❌ Error: Firebase CLI is not installed");
      console.error(
        "Please install Firebase CLI: npm install -g firebase-tools"
      );
      process.exit(1);
    }

    if (!checkFirebaseAuth()) {
      console.error(
        "❌ Error: Not authenticated with Firebase or wrong project"
      );
      console.error("Please run: firebase login");
      console.error(
        "And make sure you're in the correct project: firebase use carsnipe-online"
      );
      process.exit(1);
    }

    // Check Supabase credentials
    if (!SUPABASE_URL || SUPABASE_URL === "your-supabase-url") {
      console.error("❌ Error: SUPABASE_URL environment variable is required");
      console.error("Please set your Supabase credentials:");
      console.error('export SUPABASE_URL="your-supabase-url"');
      console.error('export SUPABASE_ANON_KEY="your-supabase-anon-key"');
      process.exit(1);
    }

    if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "your-supabase-anon-key") {
      console.error(
        "❌ Error: SUPABASE_ANON_KEY environment variable is required"
      );
      console.error("Please set your Supabase credentials:");
      console.error('export SUPABASE_URL="your-supabase-url"');
      console.error('export SUPABASE_ANON_KEY="your-supabase-anon-key"');
      process.exit(1);
    }

    // Step 1: Find files with underscores
    updateProgress(1, "🔍 Finding files with underscores...");
    const filesWithUnderscores = await findFilesWithUnderscores();
    console.log("");

    if (filesWithUnderscores.length === 0) {
      console.log("✅ No files with underscores found. Nothing to fix!");
      return;
    }

    // Step 2: Rename files in Firebase Storage
    updateProgress(2, "🔄 Renaming files in Firebase Storage...");
    const renamedFiles = await renameFilesInFirebase(filesWithUnderscores);
    console.log("");

    // Step 3: Update database records
    updateProgress(3, "💾 Updating database records...");
    const updatedRecords = await updateDatabaseRecords();
    console.log("");

    console.log("🎉 Underscore fix completed successfully!");
    console.log(`📊 Summary:`);
    console.log(
      `  - Files found with underscores: ${filesWithUnderscores.length}`
    );
    console.log(`  - Files renamed in Firebase Storage: ${renamedFiles}`);
    console.log(`  - Database records updated: ${updatedRecords}`);
    console.log("");
    console.log("💡 Tip: The images should now display correctly in your app!");
  } catch (error) {
    console.error("❌ Error in fixUnderscores:", error);
    process.exit(1);
  }
}

// CLI interface
function showUsage() {
  console.log("🔧 Underscore Fix Script");
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/fixUnderscores.js");
  console.log("");
  console.log("Prerequisites:");
  console.log("  1. Firebase CLI installed: npm install -g firebase-tools");
  console.log("  2. Authenticated with Firebase: firebase login");
  console.log("  3. Correct project selected: firebase use carsnipe-online");
  console.log("  4. Supabase credentials set as environment variables");
  console.log("");
  console.log("This script will:");
  console.log("  1. Find all files with underscores in Firebase Storage");
  console.log("  2. Rename files to remove underscores");
  console.log("  3. Update database records to match new filenames");
  console.log("");
}

// Show usage if help is requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showUsage();
  process.exit(0);
}

// Run the script
fixUnderscores();
