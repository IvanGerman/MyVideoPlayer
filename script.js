const playerWrapper = document.querySelector('.player-wrapper');
const video = playerWrapper.querySelector('.viewer');
const playProgress = playerWrapper.querySelector('.play-progress');
const playProgressBar = playerWrapper.querySelector('.play-progress-filled');
const toggleBtn = playerWrapper.querySelector('.toggle');
const skipBtns = playerWrapper.querySelectorAll('[data-skip]');
const sliders = playerWrapper.querySelectorAll('.player-slider');
const toggleBtnImage = playerWrapper.querySelector('.toggleBtn');
const volumenSlider = playerWrapper.querySelector('.volumen-slider');
const playbackSlider = playerWrapper.querySelector('.playback-slider');

//--------------------------------------------------------------------------------------------------------

function changePlayMode() {
  const videoMode = video.paused ? 'play' : 'pause';
  video[videoMode]();
};

function updateToggleBtn() { 

  if ( this.paused ) {   
    toggleBtnImage.src = "./assets/Images/VideoToggleBtn.svg";
  };
  if ( !this.paused ) {  
    toggleBtnImage.src = "./assets/Images/pause-24.png"; 
  };
};

function updateSlider() {
  video[this.name] = this.value;
};

function updatePlayProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  playProgressBar.style.flexBasis = `${percent}%`;
};

function jump(event) {
  const jumpTime = (event.offsetX / playProgress.offsetWidth) * video.duration;
  video.currentTime = jumpTime;
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
;}




//--------------------------------------------------------------------------------------------------------

video.addEventListener('click', changePlayMode);
video.addEventListener('play', updateToggleBtn);
video.addEventListener('pause', updateToggleBtn);
video.addEventListener('timeupdate', updatePlayProgressBar);

toggleBtn.addEventListener('click', changePlayMode);
skipBtns.forEach(button => button.addEventListener('click', skip));
sliders.forEach(slider => slider.addEventListener('change', updateSlider));
sliders.forEach(slider => slider.addEventListener('mousemove', updateSlider));

let mousedown = false;

playProgress.addEventListener('click', jump);
playProgress.addEventListener('mousemove', (event) => mousedown && jump(event));
playProgress.addEventListener('mousedown', () => mousedown = true);
playProgress.addEventListener('mouseup', () => mousedown = false);


//-------------------------------------------------------------------------------------------------

//eventlisteners for tastature keys:
// f - fullscreen on/off
// space - pause/play
// m - muted/unmuted
// > - faster play
// < - slower play

document.addEventListener('keydown', function(event) {

  //Space Bar------------------------------------------

  if ( event.code == 'Space' && video.paused ) {
    video.play();
    return;
  };
  
  if ( event.code == 'Space' && !video.paused ) {
    video.pause();
  };

  //Key M-----------------------------------------------
  
  if ( event.code == 'KeyM' ) {
    if ( video.muted ) {
      video.muted = false; return;
    };
    video.muted = true;
  };
  
  //Key F-----------------------------------------------

  if (event.code == 'KeyF') {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    };
  };

  //Key > -----------------------------------------------

  if (event.code == 'Period') {
    if ( video.playbackRate > 1.9 ) { return; };
    video.playbackRate += 0.1;
  };

  //Key < -----------------------------------------------

  if (event.code == 'Comma') {
    if ( video.playbackRate < 0.6 ) { return; };
    video.playbackRate -= 0.1;
  };


  // Extra added functional keys:
  // b - change background color
  // j - skip 10 seconds forward
  // l - skip 10 seconds back
  // Home - skip to the start of video
  // End - skip to the end of video
  

  //Key B -----------------------------------------------

  if ( event.code == 'KeyB' ) { 

    if ( document.body.style.backgroundColor == 'rgb(190, 180, 180)' ) {
      document.body.style.backgroundColor = 'rgb(0, 0, 0)';
      return;
    };

    document.body.style.backgroundColor = 'rgb(190, 180, 180)'; 
  };

  //Key J -----------------------------------------------
   
  if ( event.code == 'KeyJ' ) { 
    
    video.currentTime += 10;
  };
  
  //Key L -----------------------------------------------
   
  if ( event.code == 'KeyL' ) { 
    
    video.currentTime -= 10;
  };

  //Key Home -----------------------------------------------
   
  if ( event.code == 'Home' ) { 
    
    video.currentTime = 0;
    video.play();
  };

  //Key End -----------------------------------------------
   
  if ( event.code == 'End' ) { 
    
    video.currentTime = video.duration;
  };
});
