var button, fft, song, numBars = 1024;
// var songStarted = false;

function preload() {
  song = loadSound('Manchmal.m4a');
// song = loadSound('http://www.uegeek.com/Manchmal.m4a');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);//hue, saturation, brightness

  button = createButton('Play:  Manchmal.m4a');
  button.addClass('btn btn-warning btn-lg');
  button.position(windowWidth-50, windowHeight-50);
	button.mousePressed(togglePlaying);

  song.setVolume(0.5);

  fft = new p5.FFT();  // [p5.js | reference](https://p5js.org/reference/#/p5.FFT)
}

function togglePlaying() {
	if (song.isPlaying()) {
		song.pause(); // or song.loop();
    button.html('Play:  Manchmal.m4a');
	} else {
		song.play();
    button.html('Pause: Manchmal.m4a');
	}
}

function draw() {
  // background(246, 88, 104);
  background(354, 64, 96); //hsb
  smooth();

  // fft.waveform(numBars); //Number: Must be a power of two between 16 and 1024.
  fft.smooth(0.85);  //Smooth FFT analysis by averaging with the last analysis frame.


  if (typeof fft != 'undefined') {
    let spectrum = fft.analyze(); //Returns an array of amplitude values (0~255) across the frequency spectrum.

    noStroke();
    // fill(254, 223, 145);

    // draw the bars
    for(let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width*2); // where bar starts
      let h = map(spectrum[i], 0, 255, 0, height); // y = height means the bottom of canvas
      fill(i/4, 90, 90);
      rect(x, height, width/spectrum.length*2, -h/3);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
