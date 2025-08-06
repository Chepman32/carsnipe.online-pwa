#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || "your-supabase-url";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
          make: car.make,
          model: newModel,
          year: car.year,
          price: car.price,
          type: car.type,
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

// Main function
async function main() {
  try {
    console.log("🔧 Updating database records to remove underscores...");
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

    const updatedRecords = await updateDatabaseRecords();
    console.log("");
    console.log("🎉 Database update completed successfully!");
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
