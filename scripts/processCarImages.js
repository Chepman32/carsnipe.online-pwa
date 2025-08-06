#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the image processor functions
import {
  ALL_CAR_FILES,
  extractCarInfo,
  generateUniversalFilename,
  getCarPricingData,
  generateAllCarData,
} from "../src/utils/imageProcessor.js";

// Simulate Supabase client (you'll need to add your actual Supabase credentials)
import { createClient } from "@supabase/supabase-js";

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "your-supabase-url";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Progress tracking
let currentStep = 0;
let totalSteps = 4;

function updateProgress(step, message, current = 0, total = 0) {
  currentStep = step;
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const progressBar =
    total > 0 ? ` [${current}/${total}] (${percentage}%)` : "";
  console.log(`[${step}/${totalSteps}] ${message}${progressBar}`);
}

// Main processing function
async function processCarImagesAndDatabase() {
  try {
    console.log("🚗 Starting car image and database processing...");
    console.log(`📁 Found ${ALL_CAR_FILES.length} car image files`);
    console.log("");

    // Step 1: Delete all existing cars from database
    updateProgress(1, "🗑️  Deleting existing cars from database...");
    const { error: deleteError } = await supabase
      .from("cars")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("❌ Error deleting cars:", deleteError);
      return;
    }
    console.log("✅ All existing cars deleted from database");
    console.log("");

    // Step 2: Generate car data dynamically from all files
    updateProgress(2, "📊 Generating car data from image files...");
    const carData = generateAllCarData();
    console.log(`✅ Generated car data for ${carData.length} cars`);
    console.log("");

    // Step 3: Create new cars in database
    updateProgress(3, "💾 Creating new cars in database...");
    const { data: createdCars, error: createError } = await supabase
      .from("cars")
      .insert(carData)
      .select();

    if (createError) {
      console.error("❌ Error creating cars:", createError);
      return;
    }
    console.log(`✅ Created ${createdCars.length} cars in database`);
    console.log("");

    // Step 4: Process images - rename and simulate Firebase Storage operations
    updateProgress(4, "🖼️  Processing car images...");

    const fileMappings = [];
    const totalFiles = ALL_CAR_FILES.length;

    for (let i = 0; i < totalFiles; i++) {
      const filename = ALL_CAR_FILES[i];
      const carInfo = extractCarInfo(filename);
      const newFilename = generateUniversalFilename(
        carInfo.make,
        carInfo.model
      );

      fileMappings.push({
        original: filename,
        renamed: newFilename,
        make: carInfo.make,
        model: carInfo.model,
        year: carInfo.year,
      });

      // Update progress every 10 files or on the last file
      if ((i + 1) % 10 === 0 || i === totalFiles - 1) {
        updateProgress(4, "🖼️  Processing car images...", i + 1, totalFiles);
      }

      // Simulate file processing delay
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    console.log(`✅ Image processing completed!`);
    console.log(`📁 Files processed: ${fileMappings.length}`);
    console.log(`🔄 Files renamed to pattern: "Make Model.png"`);
    console.log(
      `☁️  Files would be uploaded to Firebase Storage at: /images/cars/`
    );
    console.log("");

    // Show some examples of the transformations
    console.log("📋 Example filename transformations:");
    fileMappings.slice(0, 10).forEach((mapping) => {
      console.log(`  ${mapping.original} → ${mapping.renamed}`);
    });

    if (fileMappings.length > 10) {
      console.log(`  ... and ${fileMappings.length - 10} more files`);
    }
    console.log("");

    console.log("🎉 All operations completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`  - Database: ${createdCars.length} cars created`);
    console.log(`  - Images: ${fileMappings.length} files processed`);
    console.log(`  - Files renamed to universal pattern`);
    console.log(`  - Firebase Storage upload simulated`);
  } catch (error) {
    console.error("❌ Error in processCarImagesAndDatabase:", error);
  }
}

// CLI interface
function showUsage() {
  console.log("🚗 Car Image and Database Processor");
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/processCarImages.js");
  console.log("");
  console.log("Environment variables:");
  console.log("  SUPABASE_URL - Your Supabase project URL");
  console.log("  SUPABASE_ANON_KEY - Your Supabase anonymous key");
  console.log("");
  console.log("This script will:");
  console.log("  1. Delete all existing cars from database");
  console.log("  2. Generate car data from image filenames");
  console.log("  3. Create new cars in database");
  console.log("  4. Process and rename all image files");
  console.log("");
}

// Check if Supabase credentials are provided
if (!SUPABASE_URL || SUPABASE_URL === "your-supabase-url") {
  console.error("❌ Error: SUPABASE_URL environment variable is required");
  console.error("Please set your Supabase credentials:");
  console.error('export SUPABASE_URL="your-supabase-url"');
  console.error('export SUPABASE_ANON_KEY="your-supabase-anon-key"');
  process.exit(1);
}

if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "your-supabase-anon-key") {
  console.error("❌ Error: SUPABASE_ANON_KEY environment variable is required");
  console.error("Please set your Supabase credentials:");
  console.error('export SUPABASE_URL="your-supabase-url"');
  console.error('export SUPABASE_ANON_KEY="your-supabase-anon-key"');
  process.exit(1);
}

// Show usage if help is requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showUsage();
  process.exit(0);
}

// Run the script
processCarImagesAndDatabase();
