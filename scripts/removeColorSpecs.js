#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "your-supabase-url";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Define color patterns to remove (more specific to avoid removing model names)
const COLOR_PATTERNS = [
  // Lithuanian colors
  /oranžinė\s+spindesys/gi,
  /raudonas\s+grožis/gi,
  /mėlynas\s+grožis/gi,
  /žalias\s+grožis/gi,
  /geltonas\s+grožis/gi,
  /balta\s+grožis/gi,
  /juoda\s+grožis/gi,

  // Russian/Cyrillic colors
  /в\s+ярко-синем\s+цвете/gi,
  /в\s+красном\s+цвете/gi,
  /в\s+зеленом\s+цвете/gi,
  /в\s+желтом\s+цвете/gi,
  /в\s+белом\s+цвете/gi,
  /в\s+черном\s+цвете/gi,

  // English color phrases
  /red\s+beauty/gi,
  /blue\s+beauty/gi,
  /green\s+beauty/gi,
  /yellow\s+beauty/gi,
  /white\s+beauty/gi,
  /black\s+beauty/gi,
  /orange\s+beauty/gi,
  /turquoise\s+and\s+orange\s+beauty/gi,
  /in\s+red/gi,
  /in\s+blue/gi,
  /in\s+green/gi,
  /in\s+yellow/gi,
  /in\s+white/gi,
  /in\s+black/gi,
  /in\s+orange/gi,

  // Standalone color words (only when they're not part of model names)
  /\bred\b(?!\s*[A-Z])/gi,
  /\bblue\b(?!\s*[A-Z])/gi,
  /\bgreen\b(?!\s*[A-Z])/gi,
  /\byellow\b(?!\s*[A-Z])/gi,
  /\bwhite\b(?!\s*[A-Z])/gi,
  /\borange\b(?!\s*[A-Z])/gi,
  /\bpink\b(?!\s*[A-Z])/gi,
  /\bpurple\b(?!\s*[A-Z])/gi,
  /\bbrown\b(?!\s*[A-Z])/gi,
  /\bgray\b(?!\s*[A-Z])/gi,
  /\bgrey\b(?!\s*[A-Z])/gi,
];

// Clean car model name by removing color specifications
function cleanCarModel(model) {
  let cleaned = model;

  // Remove color patterns
  COLOR_PATTERNS.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, "");
  });

  // Clean up extra spaces and dashes
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  cleaned = cleaned.replace(/^[\s-]+|[\s-]+$/g, "");

  return cleaned;
}

// Update database records to remove color specifications
async function removeColorSpecifications() {
  try {
    console.log("💾 Removing color specifications from car names...");

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
    console.error("❌ Error removing color specifications:", error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log("🔧 Removing color specifications from car names...");
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

    const updatedRecords = await removeColorSpecifications();
    console.log("");
    console.log("🎉 Color specification removal completed successfully!");
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
