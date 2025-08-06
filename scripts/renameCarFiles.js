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
} from "../src/utils/imageProcessor.js";

// Configuration
const SOURCE_DIR = path.join(__dirname, "../src/assets/out");
const BACKUP_DIR = path.join(__dirname, "../src/assets/out_backup");

// Progress tracking
let currentStep = 0;
let totalSteps = 2;

function updateProgress(step, message, current = 0, total = 0) {
  currentStep = step;
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const progressBar =
    total > 0 ? ` [${current}/${total}] (${percentage}%)` : "";
  console.log(`[${step}/${totalSteps}] ${message}${progressBar}`);
}

// Create backup directory
function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log("📁 Created backup directory");
  }
}

// Main file renaming function
async function renameCarFiles() {
  try {
    console.log("🚗 Starting car file renaming process...");
    console.log(`📁 Found ${ALL_CAR_FILES.length} car image files`);
    console.log(`📂 Source directory: ${SOURCE_DIR}`);
    console.log(`💾 Backup directory: ${BACKUP_DIR}`);
    console.log("");

    // Step 1: Create backup
    updateProgress(1, "💾 Creating backup of original files...");
    createBackup();

    // Copy all files to backup directory
    for (const filename of ALL_CAR_FILES) {
      const sourcePath = path.join(SOURCE_DIR, filename);
      const backupPath = path.join(BACKUP_DIR, filename);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, backupPath);
      }
    }
    console.log(`✅ Backup created with ${ALL_CAR_FILES.length} files`);
    console.log("");

    // Step 2: Rename files
    updateProgress(2, "🔄 Renaming files to universal pattern...");

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
          2,
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
    console.log(`⏭️  Files skipped (already correct): ${skippedCount}`);
    console.log(`💾 Backup saved to: ${BACKUP_DIR}`);
    console.log("");

    // Show some examples of the transformations
    console.log("📋 Example filename transformations:");
    fileMappings.slice(0, 15).forEach((mapping) => {
      const status = mapping.original !== mapping.renamed ? "✅" : "⏭️";
      console.log(`  ${status} ${mapping.original} → ${mapping.renamed}`);
    });

    if (fileMappings.length > 15) {
      console.log(`  ... and ${fileMappings.length - 15} more files`);
    }
    console.log("");

    console.log("🎉 File renaming completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`  - Files processed: ${totalFiles}`);
    console.log(`  - Files renamed: ${renamedCount}`);
    console.log(`  - Files skipped: ${skippedCount}`);
    console.log(`  - Backup created: ${BACKUP_DIR}`);
    console.log("");
    console.log(
      "💡 Tip: You can restore original files from the backup directory if needed."
    );
  } catch (error) {
    console.error("❌ Error in renameCarFiles:", error);
  }
}

// CLI interface
function showUsage() {
  console.log("🚗 Car File Renamer");
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/renameCarFiles.js");
  console.log("");
  console.log("This script will:");
  console.log("  1. Create a backup of all original files");
  console.log("  2. Rename files to universal pattern (remove years)");
  console.log("  3. Show detailed progress and examples");
  console.log("");
  console.log("Files will be renamed from:");
  console.log("  Ferrari 488 GTB 2015.png → Ferrari 488 GTB.png");
  console.log("  Porsche 911 GT3 RS 2022.png → Porsche 911 GT3 RS.png");
  console.log("  Aston Martin DBS 2010.png → Aston Martin DBS.png");
  console.log("");
}

// Show usage if help is requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showUsage();
  process.exit(0);
}

// Check if source directory exists
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`❌ Error: Source directory not found: ${SOURCE_DIR}`);
  console.error("Please make sure the car images are in src/assets/out/");
  process.exit(1);
}

// Run the script
renameCarFiles();
