document.getElementById('saveButton').addEventListener('click', async () => {
  // Get the current tab's URL
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Check if the URL is a YouTube video
  if (tab.url.includes('youtube.com/watch')) {
    chrome.tabs.sendMessage(tab.id, { action: 'saveVideo' });
  } else {
    alert("Please open a YouTube video to save it.");
  }
});