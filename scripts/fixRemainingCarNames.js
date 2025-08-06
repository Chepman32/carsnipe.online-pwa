#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "your-supabase-url";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Define specific problematic patterns to fix
const PROBLEMATIC_PATTERNS = [
  // Partial names and incomplete descriptions
  /\bTURQUOISE\s+AND\b/gi,
  /\bBACK\s+PRIEKINIS\s+VAIZDAS\b/gi,
  /\bна\s+белом\s+фоне\b/gi,

  // Lithuanian descriptive phrases
  /\bPRIEKINIS\s+VAIZDAS\b/gi, // front view
  /\bŠONINIS\s+VAIZDAS\b/gi, // side view
  /\bGALINIS\s+VAIZDAS\b/gi, // rear view

  // Russian descriptive phrases
  /\bна\s+красном\s+фоне\b/gi, // on red background
  /\bна\s+синем\s+фоне\b/gi, // on blue background
  /\bна\s+зеленом\s+фоне\b/gi, // on green background
  /\bна\s+желтом\s+фоне\b/gi, // on yellow background
  /\bна\s+черном\s+фоне\b/gi, // on black background

  // English descriptive phrases
  /\bon\s+white\s+background\b/gi,
  /\bon\s+red\s+background\b/gi,
  /\bon\s+blue\s+background\b/gi,
  /\bon\s+green\s+background\b/gi,
  /\bon\s+yellow\s+background\b/gi,
  /\bon\s+black\s+background\b/gi,

  // Common descriptive words
  /\bBACK\b/gi,
  /\bFRONT\b/gi,
  /\bSIDE\b/gi,
  /\bREAR\b/gi,
  /\bVIEW\b/gi,
  /\bBACKGROUND\b/gi,
  /\bBEAUTY\b/gi,
  /\bELEGANCE\b/gi,
  /\bSTYLE\b/gi,
  /\bPREMIUM\b/gi,
  /\bLUXURY\b/gi,
];

// Clean car model name by removing problematic patterns
function cleanCarModel(model) {
  let cleaned = model;

  // Remove problematic patterns
  PROBLEMATIC_PATTERNS.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, "");
  });

  // Clean up extra spaces and dashes
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  cleaned = cleaned.replace(/^[\s-]+|[\s-]+$/g, "");

  return cleaned;
}

// Update database records to remove problematic patterns
async function fixRemainingCarNames() {
  try {
    console.log("💾 Fixing remaining car names with descriptive elements...");

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
      const cleanedModel = cleanCarModel(originalModel);

      if (originalModel !== cleanedModel && cleanedModel.length > 0) {
        updates.push({
          id: car.id,
          make: car.make,
          model: cleanedModel,
          year: car.year,
          price: car.price,
          type: car.type,
        });
        console.log(`📝 Will update: "${originalModel}" → "${cleanedModel}"`);
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
    console.error("❌ Error fixing remaining car names:", error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log("🔧 Fixing remaining car names with descriptive elements...");
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

    const updatedRecords = await fixRemainingCarNames();
    console.log("");
    console.log("🎉 Remaining car name fixes completed successfully!");
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
