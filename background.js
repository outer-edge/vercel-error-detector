chrome.runtime.onInstalled.addListener(() => {
    console.log('Vercel Error Detector installed');
    chrome.storage.local.set({ vercelErrors: [] });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('vercel.com')) {
          chrome.scripting.executeScript({
                  target: { tabId },
                  function: () => {
                            console.log('Vercel Error Detector active on this tab');
                  }
          });
    }
});
