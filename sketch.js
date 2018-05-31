var c;
var capture;
var tracker;
var w = 640,
h = 480;

function setup() {
  c = createCanvas(w,h);
  background(0);
  c.position(0,0);

  capture = createCapture({
    audio: false,
    video: {
        width: w,
        height: h
    }
}, function() {
    console.log('get it started!')
});

  capture.elt.setAttribute('playsinline', '');
  createCanvas(w, h);
  capture.size(w, h);
  c.parent('video');
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

    noFill();
    stroke(255);

    beginShape();
    for (var i=0; i<positions.length; i++) {
        ellipse(positions[i][0], positions[i][1], 4, 4);
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
        /*for this prototype the results are generated randomly. 
        in the future I/d like to do something that pulls from the 
        position of the user's mouth/eyes/etc. */
        for (var i = 0; i < positions.length; i++) {
            fill(map(i, 0, positions.length, 0, 360), 50, 100);
            ellipse(positions[i][0], positions[i][1], 4, 4);
        }
    }

    function randomSet() {
      loadJSON('tarot.json', gotTarot);
  }

  function gotTarot(data) {
  //Assigns variables to the tarot.json file 
  var index = floor(random(data.tarot_interpretations.length));
  var all = data.tarot_interpretations[index].fortune_telling;

    //iterates through tarot.json and prints a fortune 
    for (var c = 0; c <= index; c++) {
        ind = floor(random(c));

        // var names = data.tarot_interpretations[ind].name;
        var interpretations = data.tarot_interpretations[ind].fortune_telling;
    }

    /* I chose not to include the tarot card from the dataset but it could be
    included depending on the context
    reading = createP(names);*/
    meaning = createP(interpretations);

    // reading.parent('#title');
    meaning.parent('#meaning');        

}

//removes generated fortune
function refresh() {
  // reading.remove();
  meaning.remove();
}

