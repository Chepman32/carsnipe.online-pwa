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
} from "../src/utils/imageProcessor.js";

// Configuration
const SOURCE_DIR = path.join(__dirname, "../src/assets/out");
const FIREBASE_STORAGE_PATH =
  "gs://carsnipe-online.firebasestorage.app/images/cars";

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

// Delete all files from Firebase Storage
async function deleteFirebaseFiles() {
  try {
    console.log("🗑️  Deleting all files from Firebase Storage...");

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

// Upload files to Firebase Storage
async function uploadToFirebase() {
  try {
    console.log("☁️  Uploading files to Firebase Storage...");

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
        3,
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

// Main Firebase Storage operations function
async function processFirebaseStorage() {
  try {
    console.log("🚗 Starting Firebase Storage operations...");
    console.log(`📁 Source directory: ${SOURCE_DIR}`);
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

    // Step 1: Delete existing files from Firebase Storage
    updateProgress(1, "🗑️  Deleting existing files from Firebase Storage...");
    await deleteFirebaseFiles();
    console.log("");

    // Step 2: Verify source files
    updateProgress(2, "📋 Verifying source files...");
    const files = fs
      .readdirSync(SOURCE_DIR)
      .filter((file) => file.endsWith(".png"));
    console.log(`✅ Found ${files.length} PNG files ready for upload`);
    console.log("");

    // Step 3: Upload files to Firebase Storage
    updateProgress(3, "☁️  Uploading files to Firebase Storage...");
    await uploadToFirebase();
    console.log("");

    console.log("🎉 Firebase Storage operations completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`  - Files processed: ${files.length}`);
    console.log(`  - Files uploaded to: ${FIREBASE_STORAGE_PATH}`);
    console.log(`  - All files now follow universal naming pattern`);
    console.log("");
    console.log(
      "💡 Tip: You can verify the upload by checking the Firebase Console"
    );
  } catch (error) {
    console.error("❌ Error in processFirebaseStorage:", error);
    process.exit(1);
  }
}

// CLI interface
function showUsage() {
  console.log("☁️  Firebase Storage Uploader");
  console.log("");
  console.log("Usage:");
  console.log("  node scripts/uploadToFirebase.js");
  console.log("");
  console.log("Prerequisites:");
  console.log("  1. Firebase CLI installed: npm install -g firebase-tools");
  console.log("  2. Authenticated with Firebase: firebase login");
  console.log("  3. Correct project selected: firebase use carsnipe-online");
  console.log("");
  console.log("This script will:");
  console.log("  1. Delete all existing files from Firebase Storage");
  console.log("  2. Upload all renamed car images to Firebase Storage");
  console.log("  3. Show detailed progress and summary");
  console.log("");
}

// Show usage if help is requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showUsage();
  process.exit(0);
}

// Run the script
processFirebaseStorage();
