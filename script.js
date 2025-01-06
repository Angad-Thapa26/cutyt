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
    updateDownloadLink();
}

function onPlayerStateChange(event) {
    // Handle state changes if needed
}

function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : false;
}

function previewStart() {
    const startTime = parseInt(document.getElementById('startTime').value);
    player.seekTo(startTime);
    player.playVideo();
}

function previewEnd() {
    const endTime = parseInt(document.getElementById('endTime').value);
    player.seekTo(endTime - 3);
    player.playVideo();
}

function playSegment() {
    const startTime = parseInt(document.getElementById('startTime').value);
    const endTime = parseInt(document.getElementById('endTime').value);
    
    player.seekTo(startTime);
    player.playVideo();
    
    // Stop video when reaching end time
    const checkTime = setInterval(() => {
        if (player.getCurrentTime() >= endTime) {
            player.pauseVideo();
            clearInterval(checkTime);
        }
    }, 100);
}

function updateDownloadLink() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const link = document.getElementById('downloadLink');
    
    // Create a link that opens YouTube with the timestamp
    const youtubeUrl = `https://youtube.com/watch?v=${videoId}&t=${startTime}s`;
    link.href = youtubeUrl;
} 