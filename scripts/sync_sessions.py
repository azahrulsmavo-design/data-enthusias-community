import gspread
import json
import os

def sync_sessions():
    try:
        # Connect to Google Sheets
        print("Connecting to Google Sheets...")
        gc = gspread.service_account(filename='credentials.json')
        
        # Open the sheet by Key (Safest) or Name
        SHEET_KEY = "17hxYRB5HVkubpaOF2W9xWI_lxyo39pzADOS14rO3NSU"
        sh = gc.open_by_key(SHEET_KEY)
        worksheet = sh.sheet1
        
        # Get all records
        print("Fetching data...")
        records = worksheet.get_all_records()
        
        # Filter for 'Published' or active status if needed, but for now take all
        # Transform or validate if necessary
        
        # Save to public/sessions.json
        output_path = os.path.join('public', 'sessions.json')
        with open(output_path, 'w') as f:
            json.dump(records, f, indent=2)
            
        print(f"Successfully synced {len(records)} sessions to {output_path}")
        
    except Exception as e:
        print(f"Error syncing sessions: {e}")

if __name__ == "__main__":
    sync_sessions()
