// Add js here.
const speedList = [0.5, 1, 2];
var curSpeedIdx = 1; // current speed index

// 1. page load
var video = document.getElementById("videoplayer");
var volumeInfo = document.getElementById("volume");
var volumeSider = document.getElementById("slider");
window.addEventListener("load", function() {
    video.autoplay = false;
    video.loop = false;
    video.load();
    volumeInfo.innerText = volumeSider.value;
});

// 2. play button
var playButton = document.getElementById("play");
playButton.addEventListener("click", function() {
    if (!video.paused) {
        video.load();
        curSpeedIdx = 1; // reset speed to 1
    }
    video.play();
});

// 3. pause button
var PauseButton = document.getElementById("pause");
PauseButton.addEventListener("click", function() {
    video.pause();
});

// 4. slow down
var slowDown = document.getElementById("slower");
slowDown.addEventListener("click", function() {
    if (curSpeedIdx - 1 < 0) {
        alert("Video is at slowest speed!");
        return;
    }
    curSpeedIdx--;
    video.playbackRate = speedList[curSpeedIdx];
});

// 5. speed up
var speedUp = document.getElementById("faster");
speedUp.addEventListener("click", function() {
    if (curSpeedIdx + 1 >= speedList.length) {
        alert("Video is at fastest speed!");
        return;
    }
    curSpeedIdx++;
    video.playbackRate = speedList[curSpeedIdx];
});

// 6. skip ahead
var skipButton = document.getElementById("skip");
skipButton.addEventListener("click", function() {
    if (video.currentTime + 15 > video.duration) {
        video.load();
        curSpeedIdx = 1;
        return;
    }
    video.currentTime += 15;
});

// 7. mute
var muteButton = document.getElementById("mute");
var originalVolume;
muteButton.addEventListener("click", function() {
    isMuted = video.muted;
    // 1. mute and record the original volumn
    if (!isMuted) {
        originalVolume = video.volume;
        video.muted = true;
        volumeSider.value = 0;
        volumeInfo.innerText = volumeSider.value;
        muteButton.innerText = "Unmute";
    } else {
        if (volumeSider.value == 0) {
            volumeSider.value = originalVolume * volumeSider.max;
            volumeInfo.innerText = volumeSider.value;
        }
        video.muted = false;
        muteButton.innerText = "Mute";
    }
});

// 8. volume slider
volumeSider.addEventListener("click", function() {
    video.volume = volumeSider.value / volumeSider.max;
    volumeInfo.innerText = volumeSider.value;
});


