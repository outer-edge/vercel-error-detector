# Vercel Error Detector

A Chrome extension that detects Vercel deployment errors and displays them in a popup for easy copying to Cursor.

## Features

🔴 **Automatic Error Detection** - Monitors Vercel deployments page for errors
📋 **One-Click Copy** - Copy error messages directly to clipboard
⏱️ **Timestamps** - Shows when errors were detected
🔄 **Real-Time Updates** - Refreshes every 3 seconds

## Installation

### Step 1: Prepare the Files

1. Clone or download this repository
2. 2. You should have these files:
   3.    - `manifest.json`
         -    - `popup.html`
              -    - `popup.js`
                   -    - `content.js`
                        -    - `background.js`
                         
                             - ### Step 2: Create Icons (Optional)
                         
                             - The extension expects icons at:
                             - - `icons/icon-16.png`
                               - - `icons/icon-48.png`
                                 - - `icons/icon-128.png`
                                  
                                   - You can use any 16x16, 48x48, and 128x128 PNG images, or skip this step and the extension will still work.
                                  
                                   - ### Step 3: Load Into Chrome
                                  
                                   - 1. Open `chrome://extensions/` in your browser
                                     2. 2. Enable **Developer mode** (toggle at top right)
                                        3. 3. Click **Load unpacked**
                                           4. 4. Select the folder containing these files
                                              5. 5. The extension should appear in your Chrome toolbar
                                                
                                                 6. ## Usage
                                                
                                                 7. 1. Navigate to any Vercel deployments page
                                                    2. 2. Click the extension icon in your Chrome toolbar
                                                       3. 3. Any detected deployment errors will appear in the popup
                                                          4. 4. Click **"📋 Copy to Clipboard"** to copy the error
                                                             5. 5. Paste the error into Cursor for debugging!
                                                               
                                                                6. ## How It Works
                                                               
                                                                7. - **Content Script** (`content.js`) - Monitors Vercel pages for errors in real-time
                                                                   - - **Popup** (`popup.html`/`popup.js`) - Displays errors with copy buttons
                                                                     - - **Background Worker** (`background.js`) - Manages extension lifecycle
                                                                       - - **Storage** - Uses Chrome's local storage to keep track of errors
                                                                        
                                                                         - ## File Structure
                                                                        
                                                                         - ```
                                                                           vercel-error-detector/
                                                                           ├── manifest.json       # Extension configuration
                                                                           ├── popup.html          # Popup UI
                                                                           ├── popup.js            # Popup functionality
                                                                           ├── content.js          # Page monitoring
                                                                           ├── background.js       # Background worker
                                                                           ├── README.md           # This file
                                                                           └── icons/              # (Optional) Extension icons
                                                                               ├── icon-16.png
                                                                               ├── icon-48.png
                                                                               └── icon-128.png
                                                                           ```

                                                                           ## Troubleshooting

                                                                           **Extension not detecting errors?**
                                                                           - Make sure you're on a Vercel deployments page
                                                                           - - Check that the extension is enabled in `chrome://extensions/`
                                                                             - - Refresh the page
                                                                              
                                                                               - **Copy button not working?**
                                                                               - - Ensure you're using Chrome/Edge (requires clipboard permissions)
                                                                                 - - The extension needs the `clipboardWrite` permission
                                                                                  
                                                                                   - ## Contributing
                                                                                  
                                                                                   - Feel free to fork and improve this extension!
                                                                                  
                                                                                   - ## License
                                                                                  
                                                                                   - MIT - Feel free to use and modify!
