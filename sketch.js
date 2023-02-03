var confLocs;
var confTheta;

let slider;


function setup() {
    createCanvas(900, 800, WEBGL);
    //sets the position of the current camera in a 3D sketch. 
    camera(800,-600,800,0,0,0,0,1,0);
    angleMode(DEGREES);

    let value = createSpan('Camera:');
    value.position(10, 850);

    let value1 = createSpan('R value:');
    value1.position(10, 890);

    let value2 = createSpan('G value:');
    value2.position(10, 930);

    let value3 = createSpan('B value:');
    value3.position(10, 970);
    
    confLocs = [];
    confTheta = [];

    for(var i =0; i <200;i++){
        var a = random(-500,500);
        var b = random(-500,0);
        var c = random(-500,500);
        confLocs.push(createVector(a,b,c));
        confTheta.push(random(0,360));
    }

    slider = createSlider(0, 1000, 600);
    slider.position(80, 850);
    slider.style('width', '80px');

    slider1 = createSlider(0, 255, 198);
    slider1.position(80, 890);
    slider1.style('width', '80px');

    slider2 = createSlider(0, 255, 207);
    slider2.position(80, 930);
    slider2.style('width', '80px');

    slider3 = createSlider(0, 255, 243);
    slider3.position(80, 970);
    slider3.style('width', '80px');

}

//confetti 
function confetti(){
    for(var i = 0; i < confLocs.length; i++){
        push();
        translate(confLocs[i].x,confLocs[i].y,confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15,15);

        confLocs[i].y += 1;
        confTheta[i] += 10;

        if(confLocs[i].y > 0){
            confLocs[i].y = -800;
        }
        pop();
    }
}

function draw() {
    background(125);

    let b = slider1.value();

    let g = slider2.value();
   
    let r = slider3.value();

    pointLight(r, g, b, -200, 100);

    let val = slider.value();
    print(val);

    //Amend the camera() command and get the camera to fly in a circle 
    //around the structure
    var xLoc = cos(frameCount)*height;
    var zLoc = sin(frameCount)*height;
    camera(xLoc, -val, zLoc, 0, 0, 0, 0, 1, 0);

    confetti();

    noStroke();

    //create a grid of boxes
    for(var x = -400; x < 400; x += 50){
       // print("x:"+x);
        for(var y= -400; y < 400; y +=50){
            //print(y);
            push();
            translate(x,0,y);
            //calculate its distance from the centre of the coordinate 
            //system using its x and z coordinates and dist(),
            //then save it in a variable called distance.
            var distance = dist(0,0,x,y)+frameCount;
            //Create a new variable length and modulate its value from 
            //100 to 300 using the sin() function and the distance 
            //variable. 
            var length = map(sin(distance),-1,1,100,300);
            box(50,length,50);
            pop();
        }
    }
}
