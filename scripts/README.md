# Car Image and Database Processor

This script processes car images and updates the database with car information extracted from filenames.

## Features

- 🗑️ Deletes all existing cars from the database
- 📊 Generates car data from image filenames (make, model, year, price, type)
- 💾 Creates new car records in the database
- 🖼️ Processes and renames image files to universal pattern
- 📈 Shows detailed progress with step-by-step updates
- 🔄 Simulates Firebase Storage operations

## Usage

### Prerequisites

1. Set your Supabase credentials as environment variables:

```bash
export SUPABASE_URL="your-supabase-project-url"
export SUPABASE_ANON_KEY="your-supabase-anon-key"
```

2. Make sure you have the required dependencies:

```bash
npm install @supabase/supabase-js
```

### Running the Script

#### Option 1: Using npm script
```bash
npm run process-cars
```

#### Option 2: Direct execution
```bash
node scripts/processCarImages.js
```

#### Option 3: With help
```bash
node scripts/processCarImages.js --help
```

## What the Script Does

1. **Database Cleanup**: Deletes all existing cars from the database
2. **Data Generation**: Extracts car information from image filenames in `src/assets/out/`
3. **Database Population**: Creates new car records with realistic pricing
4. **Image Processing**: Renames files to universal pattern (removes years)

## Filename Transformations

The script transforms filenames from:
- `Ferrari 488 GTB 2015.png` → `Ferrari 488 GTB.png`
- `Porsche 911 GT3 RS 2022.png` → `Porsche 911 GT3 RS.png`
- `Aston Martin DBS 2010.png` → `Aston Martin DBS.png`

## Output

The script provides detailed progress updates:

```
🚗 Starting car image and database processing...
📁 Found 687 car image files

[1/4] 🗑️  Deleting existing cars from database...
✅ All existing cars deleted from database

[2/4] 📊 Generating car data from image files...
✅ Generated car data for 687 cars

[3/4] 💾 Creating new cars in database...
✅ Created 687 cars in database

[4/4] 🖼️  Processing car images... [687/687] (100%)
✅ Image processing completed!
📁 Files processed: 687
🔄 Files renamed to pattern: "Make Model.png"
☁️  Files would be uploaded to Firebase Storage at: /images/cars/

📋 Example filename transformations:
  Alfa Romeo 4C 2015.png → Alfa Romeo 4C.png
  Aston Martin DBS 2010.png → Aston Martin DBS.png
  Ferrari 488 GTB 2015.png → Ferrari 488 GTB.png
  ... and 677 more files

🎉 All operations completed successfully!
📊 Summary:
  - Database: 687 cars created
  - Images: 687 files processed
  - Files renamed to universal pattern
  - Firebase Storage upload simulated
```

## Error Handling

The script includes comprehensive error handling:
- Validates Supabase credentials
- Checks for database connection issues
- Provides clear error messages
- Graceful failure handling

## Notes

- This script processes all 687 PNG files in `src/assets/out/`
- Firebase Storage operations are simulated (no actual file uploads)
- The script uses realistic pricing data for each car make/model
- Progress is updated every 10 files for better user experience 