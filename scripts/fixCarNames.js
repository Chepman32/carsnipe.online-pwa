#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";
import { execSync } from "child_process";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "your-supabase-url";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get actual filenames from Firebase Storage
function getFirebaseFiles() {
  try {
    console.log("🔍 Getting files from Firebase Storage...");
    const listCommand = `gsutil ls gs://carsnipe-online.firebasestorage.app/images/cars/`;
    const result = execSync(listCommand, { stdio: "pipe" });
    const files = result
      .toString()
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    // Extract just the filename without the full path
    const filenames = files.map((file) => {
      const parts = file.split("/");
      return parts[parts.length - 1];
    });

    console.log(`📁 Found ${filenames.length} files in Firebase Storage`);
    return filenames;
  } catch (error) {
    console.error("❌ Error getting Firebase files:", error.message);
    return [];
  }
}

// Create a mapping from complex car names to simple filenames
function createCarNameMapping() {
  const firebaseFiles = getFirebaseFiles();
  const mapping = {};

  // Define known mappings for problematic cars
  const knownMappings = {
    // Audi cars
    "RS7 Sportback oranžinė spindesys": "Audi RS7 2019",
    "RS5 - Raudonas Grožis": "Audi RS5",
    "RS6 AVANT в ярко-синем цвете": "Audi RS6 Avant",
    "RS6 AVANT 2015": "Audi RS6 Avant 2014",

    // Citroën cars
    Jumper: "Citroën Jumper",
    Jumpy: "Citroën Jumpy",
    Spacetourer: "Citroën SpaceTourer",

    // Add more mappings as needed
  };

  // Process each mapping
  Object.entries(knownMappings).forEach(([complexName, simpleName]) => {
    console.log(`🔍 Looking for: "${complexName}" → "${simpleName}"`);

    // Debug: show some matching files
    const searchTerm = simpleName
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "")
      .replace(/\s+/g, "");
    console.log(`🔍 Search term: "${searchTerm}"`);

    // Try different search strategies
    let matchingFiles = firebaseFiles.filter((file) =>
      file.toLowerCase().includes(searchTerm)
    );

    // If no matches, try searching for just the model part
    if (matchingFiles.length === 0) {
      const modelPart = simpleName
        .split(" ")
        .slice(1)
        .join(" ")
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, "")
        .replace(/\s+/g, "");
      console.log(`🔍 Trying model search: "${modelPart}"`);
      matchingFiles = firebaseFiles.filter((file) =>
        file.toLowerCase().includes(modelPart)
      );
    }

    // If still no matches, try searching for just "rs7" or "rs6"
    if (matchingFiles.length === 0) {
      const rsMatch = simpleName.toLowerCase().match(/rs[0-9]+/);
      if (rsMatch) {
        const rsTerm = rsMatch[0];
        console.log(`🔍 Trying RS search: "${rsTerm}"`);
        matchingFiles = firebaseFiles.filter((file) =>
          file.toLowerCase().includes(rsTerm)
        );
      }
    }
    console.log(
      `🔍 Found ${matchingFiles.length} potential matches:`,
      matchingFiles.slice(0, 3)
    );

    const matchingFile = matchingFiles[0]; // Take the first match

    if (matchingFile) {
      console.log(`✅ Found matching file: ${matchingFile}`);
      // Extract make and model from the filename
      const filenameWithoutExt = matchingFile.replace(".png", "");
      const parts = filenameWithoutExt.split(" ");

      if (parts.length >= 2) {
        const make = parts[0];
        const model = parts.slice(1).join(" ");

        mapping[complexName] = {
          make: make,
          model: model,
          filename: matchingFile,
        };
        console.log(`📝 Mapped to: ${make} ${model}`);
      }
    } else {
      console.log(`❌ No matching file found for: ${simpleName}`);
    }
  });

  return mapping;
}

// Update database records to match Firebase filenames
async function updateCarNames() {
  try {
    console.log("💾 Updating car names to match Firebase filenames...");

    const carNameMapping = createCarNameMapping();
    console.log(
      "📋 Created mapping for",
      Object.keys(carNameMapping).length,
      "cars"
    );

    // Get all cars from database
    const { data: cars, error: fetchError } = await supabase
      .from("cars")
      .select("*");

    if (fetchError) {
      console.error("❌ Error fetching cars:", fetchError);
      throw fetchError;
    }

    console.log(`📊 Found ${cars.length} cars in database`);

    const updates = [];

    for (const car of cars) {
      const originalModel = car.model;

      // Check if this car needs to be updated
      const mapping = carNameMapping[originalModel];

      if (mapping) {
        updates.push({
          id: car.id,
          make: mapping.make,
          model: mapping.model,
          year: car.year,
          price: car.price,
          type: car.type,
        });
        console.log(
          `📝 Will update: "${originalModel}" → "${mapping.make} ${mapping.model}"`
        );
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
    console.error("❌ Error updating car names:", error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log("🔧 Fixing car names to match Firebase filenames...");
    console.log("");

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

    const updatedRecords = await updateCarNames();
    console.log("");
    console.log("🎉 Car name fix completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`  - Database records updated: ${updatedRecords}`);
    console.log("");
    console.log("💡 Tip: The images should now display correctly in your app!");
  } catch (error) {
    console.error("❌ Error in main:", error);
    process.exit(1);
  }
}

// Run the script
main();
