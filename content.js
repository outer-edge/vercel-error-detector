function detectAndStoreErrors() {
    const errors = [];

  const errorElements = document.querySelectorAll('[class*="error"], [class*="Error"]');

  const errorBox = document.querySelector('[class*="error"]');
    if (errorBox && errorBox.textContent.includes('Build Failed')) {
          const errorTitle = errorBox.querySelector('h3, div[class*="title"]')?.textContent || 'Build Failed';
          const errorMessage = errorBox.textContent;

      errors.push({
              title: 'Build Failed',
              message: errorMessage.trim(),
              timestamp: new Date().toLocaleTimeString(),
              deployment: window.location.pathname.split('/').pop()
      });
    }

  const allText = document.body.innerText;
    if (allText.includes('Build Failed') || allText.includes('exited with')) {
          const lines = allText.split('\n');
          const errorLineIndex = lines.findIndex(l => l.includes('exited with'));
          if (errorLineIndex !== -1) {
                  const errorMessage = lines[errorLineIndex];

            if (!errors.some(e => e.message.includes(errorMessage))) {
                      errors.push({
                                  title: 'Build Failed',
                                  message: errorMessage,
                                  timestamp: new Date().toLocaleTimeString(),
                                  deployment: window.location.pathname.split('/').pop(),
                                  fullLog: allText
                      });
            }
          }
    }

  const deploymentRows = document.querySelectorAll('a[href*="/deployments/"]');
    deploymentRows.forEach(row => {
          const statusIndicator = row.querySelector('[class*="error"], [style*="red"]');
          if (statusIndicator && (statusIndicator.textContent.includes('Error') || statusIndicator.className.includes('error'))) {
                  const deploymentId = row.getAttribute('href')?.split('/').pop();
                  if (deploymentId && !errors.some(e => e.deployment === deploymentId)) {
                            errors.push({
                                        title: 'Deployment Error',
                                        message: 'Deployment failed - click to view details',
                                        deployment: deploymentId,
                                        timestamp: new Date().toLocaleTimeString()
                            });
                  }
          }
    });

  if (errors.length > 0) {
        chrome.storage.local.set({ vercelErrors: errors });
        console.log('Vercel errors detected:', errors);
  }
}

detectAndStoreErrors();

setInterval(detectAndStoreErrors, 3000);

const observer = new MutationObserver(detectAndStoreErrors);
observer.observe(document.body, { 
                   subtree: true, 
    childList: true 
});
