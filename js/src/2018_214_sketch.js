let fft, song, songStarted = false, numBars = 1024;

function setup() {
  createCanvas(windowWidth, windowHeight);
  song = loadSound('http://www.uegeek.com/Cluster-Manchmal.mp3');
}

function draw() {
  background(246, 88, 104);
  smooth();
  // text('Click to pause / play.', 50, 10);

  if (typeof song != 'undefined' // There's a song
      && song.isLoaded()         // The song is loaded
      && !songStarted) {    // If is playing, don't draw every loop

        // loader.classList.remove('loading');

        song.play();
        song.setVolume(0.5);
        // playPauseButton.innerHTML = "&#9646;&#9646;"; // pause button

        fft = new p5.FFT();  // [p5.js | reference](https://p5js.org/reference/#/p5.FFT)
        fft.waveform(numBars); //Number: Must be a power of two between 16 and 1024.
        fft.smooth(0.85);  //Smooth FFT analysis by averaging with the last analysis frame.

        songStarted = true;
      }

  if (typeof fft != 'undefined') {
    let spectrum = fft.analyze(); //Returns an array of amplitude values (0~255) across the frequency spectrum.

    noStroke();
    // fill("rgb(178, 107, 237)");
    fill(254, 223, 145);

    // draw the bars
    for(let i = 0; i < numBars; i++) {
      let x = map(i, 0, numBars, 0, width*2); // where bar starts
      let h = map(spectrum[i], 0, 255, 0, height); // y = height means the bottom of canvas
      rect(x, height, width/numBars*1.8, -h/2);
    }
  }
}

function mousePressed(){
  if (song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
