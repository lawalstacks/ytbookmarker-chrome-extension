chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveVideo') {
    saveCurrentVideo();
  }
});

function saveCurrentVideo() {
  const videoTitle = document.querySelector('h1.title').innerText;
  const videoUrl = window.location.href;
  const timestamp = new Date().toISOString();
  const videoData = {
    title: videoTitle,
    url: videoUrl,
    timestamp,
    color: getRandomColor()
  };

  const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");
  savedVideos.push(videoData);
  localStorage.setItem("savedVideos", JSON.stringify(savedVideos));

  alert("Video saved!");
}
// Create and style the floating card c
const floatingCard = document.createElement('div');
floatingCard.style.position = 'fixed';
floatingCard.style.bottom = '20px';
floatingCard.style.right = '20px';
floatingCard.style.width = '300px';
floatingCard.style.border = '1px solid #ddd';
floatingCard.style.borderRadius = '8px';
floatingCard.style.boxShadow = '0px 4px 8px rgba(0,0,0,0.2)';
floatingCard.style.backgroundColor = '#fff';
floatingCard.style.zIndex = '10000';
floatingCard.style.padding = '10px';
floatingCard.style.overflowY = 'auto';
floatingCard.style.maxHeight = '300px';

// Header
const header = document.createElement('h3');
header.textContent = 'Saved Videos';
header.style.margin = '0 0 10px 0';
header.style.fontSize = '16px';
header.style.textAlign = 'center';
floatingCard.appendChild(header);

// Retrieve saved videos from localStorage
const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");

// Helper function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Add saved videos to the card
savedVideos.forEach(video => {
  const videoCard = document.createElement('div');
  videoCard.style.display = 'flex';
  videoCard.style.marginBottom = '8px';
  videoCard.style.borderBottom = '1px solid #eee';
  videoCard.style.paddingBottom = '8px';
  videoCard.style.alignItems = 'center';

  // Ribbon for color indication
  const colorRibbon = document.createElement('div');
  colorRibbon.style.width = '5px';
  colorRibbon.style.height = '100%';
  colorRibbon.style.backgroundColor = video.color || getRandomColor();
  video.color = colorRibbon.style.backgroundColor; // Store the color in the video object
  videoCard.appendChild(colorRibbon);

  // Thumbnail
  const thumbnail = document.createElement('img');
  thumbnail.src = `https://img.youtube.com/vi/${extractVideoID(video.url)}/0.jpg`;
  thumbnail.style.width = '50px';
  thumbnail.style.height = '38px';
  thumbnail.style.marginRight = '10px';
  videoCard.appendChild(thumbnail);

  // Video details
  const details = document.createElement('div');
  details.style.flex = '1';

  const title = document.createElement('p');
  title.textContent = video.title;
  title.style.margin = '0';
  title.style.fontSize = '12px';
  title.style.color = '#333';

  const timestamp = document.createElement('p');
  timestamp.textContent = `Saved: ${new Date(video.timestamp).toLocaleString()}`;
  timestamp.style.margin = '0';
  timestamp.style.fontSize = '10px';
  timestamp.style.color = '#888';

  details.appendChild(title);
  details.appendChild(timestamp);
  videoCard.appendChild(details);

  // Action buttons
  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '5px';

  // Play button
  const playButton = document.createElement('button');
  playButton.textContent = '▶️';
  playButton.title = 'Play Video';
  playButton.style.border = 'none';
  playButton.style.background = 'none';
  playButton.style.cursor = 'pointer';
  playButton.addEventListener('click', () => {
    window.open(video.url, '_blank'); // Opens the video in a new tab
  });

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑️';
  deleteButton.title = 'Delete Video';
  deleteButton.style.border = 'none';
  deleteButton.style.background = 'none';
  deleteButton.style.cursor = 'pointer';
  deleteButton.addEventListener('click', () => {
    deleteVideo(video);
  });

  // Share button
  const shareButton = document.createElement('button');
  shareButton.textContent = '🔗';
  shareButton.title = 'Share Video';
  shareButton.style.border = 'none';
  shareButton.style.background = 'none';
  shareButton.style.cursor = 'pointer';
  shareButton.addEventListener('click', () => {
    navigator.clipboard.writeText(video.url).then(() => {
      alert('Video link copied to clipboard!');
    });
  });

  actions.appendChild(playButton);
  actions.appendChild(deleteButton);
  actions.appendChild(shareButton);
  videoCard.appendChild(actions);

  floatingCard.appendChild(videoCard);
});

// Save updated videos with colors back to localStorage
localStorage.setItem("savedVideos", JSON.stringify(savedVideos));

document.body.appendChild(floatingCard);

// Helper function to extract video ID from URL
function extractVideoID(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('v');
}

// Helper function to delete a video from localStorage and refresh the UI
function deleteVideo(videoToDelete) {
  const updatedVideos = savedVideos.filter(video => video.url !== videoToDelete.ur);
  localStorage.setItem("savedVideos", JSON.stringify(updatedVideos));
  location.reload(); // Reload to refresh the UI
}