Makhana Landing (Next.js) - Google Sheets Integration
----------------------------------------------------

This repo is a minimal Next.js landing page for Makhana with a waitlist form.

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
   NEXT_PUBLIC_FB_PIXEL_ID=1234567890
   SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbxYourScriptID/exec
   ```

3. Create a Google Sheet with headers `Email, Timestamp`.
4. Open Extensions > Apps Script and paste this code:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([data.email, new Date()]);
     return ContentService.createTextOutput(
       JSON.stringify({ result: "success" })
     ).setMimeType(ContentService.MimeType.JSON);
   }
   ```

5. Deploy it as a Web App (Anyone with link can access). Use the deployment URL as `SHEETS_WEBHOOK_URL`.

6. Run locally:
   ```bash
   npm run dev
   ```

7. Deploy on Vercel and set environment variables in project settings.
