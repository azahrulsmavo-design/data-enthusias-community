export async function fetchSessionsFromSheet() {
    const SHEET_ID = import.meta.env.VITE_SHEET_ID;
    const API_KEY = import.meta.env.VITE_SHEETS_API_KEY;

    if (!SHEET_ID || !API_KEY) {
        console.warn("Google Sheets API keys are missing. Please set VITE_SHEET_ID and VITE_SHEETS_API_KEY in your .env file.");
        return null;
    }

    const RANGE = "sessions!A1:L1000";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${API_KEY}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch sessions from Google Sheets");

        const { values } = await res.json();
        if (!values || values.length < 2) return [];

        const [header, ...rows] = values;

        const items = rows.map((r) =>
            Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""]))
        );

        // normalize
        const cleaned = items.map((s) => ({
            ...s,
            featured: String(s.featured).toLowerCase() === "true",
            status: String(s.status || "").toLowerCase(),
            date: String(s.date || ""), // format YYYY-MM-DD
        }));

        // upcoming only + sort by date
        return cleaned
            .filter((s) => s.status === "upcoming")
            .sort((a, b) => a.date.localeCompare(b.date));

    } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
        return null;
    }
}
