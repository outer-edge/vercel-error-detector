async function loadErrors() {
    const container = document.getElementById('errors-container');

  try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab.url.includes('vercel.com') || !tab.url.includes('deployments')) {
              container.innerHTML = '<div class="no-errors">Navigate to a Vercel deployments page to see errors</div>';
              return;
      }

      const result = await chrome.storage.local.get(['vercelErrors']);
        const errors = result.vercelErrors || [];

      if (errors.length === 0) {
              container.innerHTML = '<div class="no-errors">✅ No deployment errors detected</div>';
              return;
      }

      container.innerHTML = '';
        errors.forEach((error, index) => {
                const errorBox = document.createElement('div');
                errorBox.className = 'error-box';

                             const title = document.createElement('div');
                title.className = 'error-title';
                title.textContent = `Error ${errors.length - index}: ${error.title || 'Build Failed'}`;

                             const message = document.createElement('div');
                message.className = 'error-message';
                message.textContent = error.message || error.fullLog;

                             const status = document.createElement('div');
                status.className = 'status';
                status.textContent = `${error.timestamp || 'Just now'} • ${error.deployment}`;

                             const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.textContent = '📋 Copy to Clipboard';

                             copyBtn.addEventListener('click', async () => {
                                       try {
                                                   await navigator.clipboard.writeText(error.message);
                                                   copyBtn.textContent = '✅ Copied!';
                                                   copyBtn.classList.add('copied');
                                                   setTimeout(() => {
                                                                 copyBtn.textContent = '📋 Copy to Clipboard';
                                                                 copyBtn.classList.remove('copied');
                                                   }, 2000);
                                       } catch (err) {
                                                   console.error('Failed to copy:', err);
                                       }
                             });

                             errorBox.appendChild(title);
                errorBox.appendChild(message);
                errorBox.appendChild(status);
                errorBox.appendChild(copyBtn);
                container.appendChild(errorBox);
        });
  } catch (error) {
        console.error('Error loading errors:', error);
        container.innerHTML = '<div class="no-errors">Error loading data</div>';
  }
}

loadErrors();
setInterval(loadErrors, 2000);
