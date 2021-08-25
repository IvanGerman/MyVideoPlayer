const playerWrapper = document.querySelector('.player-wrapper');
const video = playerWrapper.querySelector('.viewer');
const playProgress = playerWrapper.querySelector('.play-progress');
const playProgressBar = playerWrapper.querySelector('.play-progress-filled');
const toggleBtn = playerWrapper.querySelector('.toggle');
const skipBtns = playerWrapper.querySelectorAll('[data-skip]');
const sliders = playerWrapper.querySelectorAll('.player-slider');
const toggleBtnImage = playerWrapper.querySelector('.toggleBtn');

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

  if ( event.code == 'Space' && video.paused ) {
    console.log('play');
    video.play();
  };

  if ( event.code == 'Space' && !video.paused ) {
    console.log('pause');
    video.pause();
  };

});
