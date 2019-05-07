let media = document.querySelector('video');
let controls = document.querySelector('.controls');

let play = document.querySelector('.play');
var stop = document.querySelector('.stop');
var rwd = document.querySelector('.rwd');
var fwd = document.querySelector('.fwd');

var timerWrapper = document.querySelector('.timer');
var timer = document.querySelector('.timer span');
var timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';

//playPauseMedia() function is invoked when the play button is clicked
play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
media.addEventListener('timeupdate', setTime);

// Fixing function
function stopRwdFwd() {
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}


// Playing and pausing

function playPauseMedia() {
    // fixing play/pause
    stopRwdFwd();

    if(media.paused) {
        play.setAttribute('data-icon','u');
        media.play();
    } else {
        play.setAttribute('data-icon','P');
        media.pause();
    }
}

//Stopping the video

function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon','P');
    /* there is no stop() method on the 
    HTMLMediaElement API — the equivalent 
    is to pause() the video, and set its 
    currentTime property to 0. */

    // fixing play/pause
    stopRwdFwd();
}

//Seeking back and forth
let intervalRwd;
let intervalFwd;

/* The classList is a rather handy property that 
exists on every element — it contains a list of 
all the classes set on the element, as well as 
methods for adding/removing classes, etc.*/

function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');

    if(rwd.classList.contains('active')) {
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add('active');
        media.pause();
        /* setInterval() creates an active interval, 
        meaning that it runs the function given as 
        the first parameter every x milliseconds, 
        where x is the value of the 2nd parameter. */
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if(fwd.classList.contains('active')) {
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

//define windForward() and windBackward() functions
function windBackward() {
    if(media.currentTime <= 3) {
        /*rwd.classList.remove('active');
        clearInterval(intervalRwd);*/
        stopMedia();
    } else {
        media.currentTime -= 3;
        /*So in effect, we are rewinding the video 
        by 3 seconds, once every 200 milliseconds*/
    }
}

function windForward() {
    if(media.currentTime >= media.duration - 3) {
        stopMedia();
    } else {
        media.currentTime += 3;
    }
}

//Updating the elapsed(истекшего) time
function setTime() {
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;

    let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
    timerBar.style.width = barLength + 'px';
}