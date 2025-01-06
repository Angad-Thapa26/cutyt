let player;
let videoId = '';

function loadVideo() {
    const url = document.getElementById('videoUrl').value;
    videoId = extractVideoId(url);
    
    if (videoId) {
        if (player) {
            player.loadVideoById(videoId);
        } else {
            createPlayer(videoId);
        }
    } else {
        alert('Invalid YouTube URL');
    }
}

function createPlayer(videoId) {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    const duration = player.getDuration();
    document.getElementById('endTime').value = Math.floor(duration);
}

function onPlayerStateChange(event) {
    // Handle state changes if needed
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : false;
}

function downloadClip() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    if (!videoId) {
        alert('Please load a video first');
        return;
    }

    // Create download URL with parameters
    const downloadUrl = `https://your-backend-server.com/download?videoId=${videoId}&start=${startTime}&end=${endTime}`;
    
    // Note: This is where you'd need a backend service
    alert('Note: This feature requires a backend server to process the video. The complete implementation would require a server that can:' +
          '\n1. Download the YouTube video' +
          '\n2. Trim it to the specified times' +
          '\n3. Serve the resulting file to the user');
} 