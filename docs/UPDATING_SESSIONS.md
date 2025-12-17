# Updating Upcoming Sessions

This guide explains how to update the "Upcoming Sessions" section on the website.

## Data Source
The sessions are powered by `public/sessions.json`. This file acts as the source of truth until the Python sync script is fully automated.

## JSON Structure
Each session is an object in the array:

```json
{
  "title": "Event Title",
  "subtitle": "Short descriptive subtitle",
  "date": "27 Januari 2025",
  "time": "19.00 – 20.30 WIB",
  "location": "Online · Community Session",
  "description": "Full description of the event.",
  "link": "https://link-to-registration...",
  "featured": "TRUE", 
  "image": "URL_TO_IMAGE",
  "status": "upcoming"
}
```

### Key Fields
1.  **date**: Must be in format `DD Month YYYY` (e.g., `27 Januari 2025`). The system automatically filters out past dates.
2.  **featured**: Set to `"TRUE"` to force this item to be the large Featured card. If multiple are true, the first one is picked. If none are true, the nearest upcoming event is picked.
3.  **image**: URL to the poster image.
    -   **Ratio**: Must be **9:16** (Portrait).
    -   **Resolution**: Recommended height > 600px, width > 340px.

## Automatic Logic
The website automatically:
1.  **Filters**: Removes events where `date` is in the past.
2.  **Sorts**: Orders events from nearest to furthest date.
3.  **Selects Featured**: Picks the first valid "Featured" item, or defaults to the soonest event.

## How to Update
1.  Open `public/sessions.json`.
2.  Add a new block for the new event.
3.  Ensure the image link is valid and proper ratio.
4.  Save and Deploy.
