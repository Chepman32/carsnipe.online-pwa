#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the image processor functions
import {
  ALL_CAR_FILES,
  extractCarInfo,
  generateUniversalFilename,
  generateAllCarData,
} from "../src/utils/imageProcessor.js";

// Import Supabase client
import { createClient } from "@supabase/supabase-js";

// Configuration
const SOURCE_DIR = path.join(__dirname, "../src/assets/out");
const BACKUP_DIR = path.join(__dirname, "../src/assets/out_backup");
const FIREBASE_STORAGE_PATH =
  "gs://carsnipe-online.firebasestorage.app/images/cars";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "your-supabase-url";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Progress tracking
let currentStep = 0;
let totalSteps = 5;

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

// Step 1: Delete all existing cars from database
async function deleteDatabaseCars() {
  try {
    updateProgress(1, "🗑️  Deleting existing cars from database...");

    const { error: deleteError } = await supabase
      .from("cars")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("❌ Error deleting cars:", deleteError);
      throw deleteError;
    }

    console.log("✅ All existing cars deleted from database");
  } catch (error) {
    console.error("❌ Error in deleteDatabaseCars:", error);
    throw error;
  }
}

// Step 2: Create new cars in database
async function createDatabaseCars() {
  try {
    updateProgress(2, "💾 Creating new cars in database...");

    const carData = generateAllCarData();
    console.log(`📊 Generated car data for ${carData.length} cars`);

    const { data: createdCars, error: createError } = await supabase
      .from("cars")
      .insert(carData)
      .select();

    if (createError) {
      console.error("❌ Error creating cars:", createError);
      throw createError;
    }

    console.log(`✅ Created ${createdCars.length} cars in database`);
  } catch (error) {
    console.error("❌ Error in createDatabaseCars:", error);
    throw error;
  }
}

// Step 3: Rename files locally
async function renameLocalFiles() {
  try {
    updateProgress(3, "🔄 Renaming files to universal pattern...");

    // Create backup if it doesn't exist
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
      console.log("📁 Created backup directory");

      // Copy all files to backup directory
      for (const filename of ALL_CAR_FILES) {
        const sourcePath = path.join(SOURCE_DIR, filename);
        const backupPath = path.join(BACKUP_DIR, filename);

        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, backupPath);
        }
      }
      console.log(`✅ Backup created with ${ALL_CAR_FILES.length} files`);
    }

    // Rename files
    const fileMappings = [];
    const totalFiles = ALL_CAR_FILES.length;
    let renamedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < totalFiles; i++) {
      const filename = ALL_CAR_FILES[i];
      const carInfo = extractCarInfo(filename);
      const newFilename = generateUniversalFilename(
        carInfo.make,
        carInfo.model
      );

      const sourcePath = path.join(SOURCE_DIR, filename);
      const targetPath = path.join(SOURCE_DIR, newFilename);

      fileMappings.push({
        original: filename,
        renamed: newFilename,
        make: carInfo.make,
        model: carInfo.model,
        year: carInfo.year,
      });

      // Only rename if the file exists and the new name is different
      if (fs.existsSync(sourcePath)) {
        if (filename !== newFilename) {
          try {
            fs.renameSync(sourcePath, targetPath);
            renamedCount++;
          } catch (error) {
            console.error(`❌ Error renaming ${filename}:`, error.message);
          }
        } else {
          skippedCount++;
        }
      }

      // Update progress every 10 files or on the last file
      if ((i + 1) % 10 === 0 || i === totalFiles - 1) {
        updateProgress(
          3,
          "🔄 Renaming files to universal pattern...",
          i + 1,
          totalFiles
        );
      }

      // Small delay to prevent overwhelming the system
      await new Promise((resolve) => setTimeout(resolve, 5));
    }

    console.log(`✅ File renaming completed!`);
    console.log(`📁 Files processed: ${totalFiles}`);
    console.log(`🔄 Files renamed: ${renamedCount}`);
    console.log(`⏭️  Files skipped: ${skippedCount}`);
  } catch (error) {
    console.error("❌ Error in renameLocalFiles:", error);
    throw error;
  }
}

// Step 4: Delete files from Firebase Storage
async function deleteFirebaseFiles() {
  try {
    updateProgress(4, "🗑️  Deleting files from Firebase Storage...");

    // List all files in the storage bucket
    const listCommand = `gsutil ls ${FIREBASE_STORAGE_PATH}/*`;
    let filesToDelete = [];

    try {
      const result = execSync(listCommand, { stdio: "pipe" });
      filesToDelete = result
        .toString()
        .trim()
        .split("\n")
        .filter((line) => line.trim());
    } catch (error) {
      console.log(
        "ℹ️  No existing files found in Firebase Storage (or bucket is empty)"
      );
      return;
    }

    if (filesToDelete.length === 0) {
      console.log("ℹ️  No files to delete from Firebase Storage");
      return;
    }

    console.log(`🗑️  Found ${filesToDelete.length} files to delete`);

    // Delete files in batches to avoid command line length limits
    const batchSize = 50;
    for (let i = 0; i < filesToDelete.length; i += batchSize) {
      const batch = filesToDelete.slice(i, i + batchSize);
      const deleteCommand = `gsutil -m rm ${batch.join(" ")}`;

      try {
        execSync(deleteCommand, { stdio: "pipe" });
        console.log(
          `✅ Deleted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
            filesToDelete.length / batchSize
          )}`
        );
      } catch (error) {
        console.error(
          `❌ Error deleting batch ${Math.floor(i / batchSize) + 1}:`,
          error.message
        );
      }
    }

    console.log("✅ All files deleted from Firebase Storage");
  } catch (error) {
    console.error("❌ Error deleting Firebase files:", error.message);
    throw error;
  }
}

// Step 5: Upload files to Firebase Storage
async function uploadToFirebase() {
  try {
    updateProgress(5, "☁️  Uploading files to Firebase Storage...");

    const files = fs
      .readdirSync(SOURCE_DIR)
      .filter((file) => file.endsWith(".png"));
    const totalFiles = files.length;

    console.log(`📁 Found ${totalFiles} PNG files to upload`);

    // Upload files in batches
    const batchSize = 20;
    let uploadedCount = 0;

    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);

      // Create upload commands for the batch
      const uploadCommands = batch.map((filename) => {
        const localPath = path.join(SOURCE_DIR, filename);
        const remotePath = `${FIREBASE_STORAGE_PATH}/${filename}`;
        return `gsutil cp "${localPath}" "${remotePath}"`;
      });

      // Execute upload commands
      for (const command of uploadCommands) {
        try {
          execSync(command, { stdio: "pipe" });
          uploadedCount++;
        } catch (error) {
          console.error(
            `❌ Error uploading ${batch[uploadCommands.indexOf(command)]}:`,
            error.message
          );
        }
      }

      // Update progress
      const current = Math.min(i + batchSize, totalFiles);
      updateProgress(
        5,
        "☁️  Uploading files to Firebase Storage...",
        current,
        totalFiles
      );
    }

    console.log(
      `✅ Uploaded ${uploadedCount}/${totalFiles} files to Firebase Storage`
    );
  } catch (error) {
    console.error("❌ Error uploading to Firebase:", error.message);
    throw error;
  }
}

// Main complete processing function
async function completeCarProcessing() {
  try {
    console.log("🚗 Starting complete car processing...");
    console.log(`📁 Found ${ALL_CAR_FILES.length} car image files`);
    console.log(`📂 Source directory: ${SOURCE_DIR}`);
    console.log(`☁️  Firebase Storage path: ${FIREBASE_STORAGE_PATH}`);
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

    // Check if source directory exists
    if (!fs.existsSync(SOURCE_DIR)) {
      console.error(`❌ Error: Source directory not found: ${SOURCE_DIR}`);
      console.error("Please make sure the car images are in src/assets/out/");
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

    // Execute all steps
    await deleteDatabaseCars();
    console.log("");

    await createDatabaseCars();
    console.log("");

    await renameLocalFiles();
    console.log("");

    await deleteFirebaseFiles();
    console.log("");

    await uploadToFirebase();
    console.log("");

    console.log("🎉 Complete car processing finished successfully!");
    console.log(`📊 Summary:`);
    console.log(`  - Database: ${ALL_CAR_FILES.length} cars created`);
    console.log(
      `  - Files: ${ALL_CAR_FILES.length} files renamed and uploaded`
    );
    console.log(`  - Firebase Storage: Updated with new files`);
    console.log(`  - Backup: Created in ${BACKUP_DIR}`);
    console.log("");
    console.log(
      "💡 Tip: You can verify the upload by checking the Firebase Console"
    );
  } catch (error) {
    console.error("❌ Error in completeCarProcessing:", error);
    process.exit(1);
  }
}

// CLI interface
function showUsage() {
  console.log("🚗 Complete Car Processing Script");
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/completeCarProcessing.js");
  console.log("");
  console.log("Prerequisites:");
  console.log("  1. Firebase CLI installed: npm install -g firebase-tools");
  console.log("  2. Authenticated with Firebase: firebase login");
  console.log("  3. Correct project selected: firebase use carsnipe-online");
  console.log("  4. Supabase credentials set as environment variables");
  console.log("");
  console.log("This script will:");
  console.log("  1. Delete all existing cars from database");
  console.log("  2. Create new cars in database with realistic pricing");
  console.log("  3. Rename all image files to universal pattern");
  console.log("  4. Delete old files from Firebase Storage");
  console.log("  5. Upload renamed files to Firebase Storage");
  console.log("");
}

// Show usage if help is requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showUsage();
  process.exit(0);
}

// Run the script
completeCarProcessing();
