var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Composite = Matter.Composite;

// creates the engine matter.js uses
var engine = Engine.create();
    world = engine.world;


// creates the renderer
var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: '#9f622f',
            wireframes: false,
            showAngleIndicator: true,       //Left on intentionally btw
            showCollisions: false,
            showVelocity: false
        }
    });

let boxSizeX = 50;
let boxSizeY = 50;
let boxSpawnHeight = 0;

//creating the boxes in a formation
var boxA = Bodies.rectangle(window.innerWidth / 2 - 30, 100, boxSizeX, boxSizeY);
var boxB = Bodies.rectangle(window.innerWidth / 2 - 60, 200, boxSizeX, boxSizeY);
var boxC = Bodies.rectangle(window.innerWidth / 2, 200, boxSizeX, boxSizeY);
var boxD = Bodies.rectangle(window.innerWidth / 2 - 90, 300, boxSizeX, boxSizeY);
var boxE = Bodies.rectangle(window.innerWidth / 2 - 30, 300, boxSizeX, boxSizeY);
var boxF = Bodies.rectangle(window.innerWidth / 2 + 30, 300, boxSizeX, boxSizeY);
var boxG = Bodies.rectangle(window.innerWidth / 2 + 90, 300, boxSizeX, boxSizeY);
var boxH = Bodies.rectangle(window.innerWidth / 2 + 60, 200, boxSizeX, boxSizeY);
var boxI = Bodies.rectangle(window.innerWidth / 2 + 30, 100, boxSizeX, boxSizeY);
var boxJ = Bodies.rectangle(window.innerWidth / 2, 100, boxSizeX, boxSizeY);

//Setting the box colors
boxA.render.fillStyle = "#bf9469";
boxB.render.fillStyle = "#643d13";
boxC.render.fillStyle = "#744e23";
boxD.render.fillStyle = "#744e23";
boxE.render.fillStyle = "#bf9469";
boxF.render.fillStyle = "#643d13";
boxG.render.fillStyle = "#744e23";
boxH.render.fillStyle = "#744e23";
boxI.render.fillStyle = "#bf9469";
boxJ.render.fillStyle = "#643d13";

//Creating the ground and barriers
let ground;
let ceiling;
let wallLeft;
let wallRigt;

function BarriersSet()
{
    const groundHeight = 60;
    const ceilingHeight = 50
    const wallLeftWidth = 50;
    const wallRightWidth = 50;
    
    ground = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight - groundHeight / 2,
        window.innerWidth * 2, // optional: wide enough so edges never show
        groundHeight,
        {
        isStatic: true,
        render: {
            fillStyle: "#472e19"  // 👈 ground color
        }
    }
    );

    ceiling = Bodies.rectangle(
        window.innerWidth / 2,
        -ceilingHeight / 2,
        window.innerWidth * 2,
        ceilingHeight,
        {
            isStatic: true,
            render: {
                fillStyle: "#472e1900"  
            }
        }
    );

    wallLeft = Bodies.rectangle(
        -wallLeftWidth / 2,
        window.innerHeight / 2,
        wallLeftWidth,
        window.innerHeight * 2,
        {
            isStatic: true,
            render: {
                fillStyle: "#472e1900"  
            }
        }
    );

    wallRight = Bodies.rectangle(
        window.innerWidth + wallRightWidth / 2,
        window.innerHeight / 2,
        wallRightWidth,
        window.innerHeight * 2,
        {
            isStatic: true,
            render: {
                fillStyle: "#472e1900"  
            }
        }
    );
    

    Composite.add(engine.world, [ground, ceiling, wallLeft, wallRight]);
}

BarriersSet();

//The function that checks when the brower window size is changed and adjusts the ground position accordingly
window.addEventListener("resize", () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;

    Matter.Body.setPosition(ground, {x: window.innerWidth / 2, y: window.innerHeight - 30});    //reseting teh ground to the bottom of the screen again.
});

// Matter.Body.setPosition(ground, {
//   x: boxB.position.x,
//   y: boxB.position.y + 700
// });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, boxC, boxD, boxE, boxF, boxG, boxH, boxI, boxJ]);

var mouse = Mouse.create(render.canvas);

var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.01,
        render: { visible: false }
    }
});

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;


// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();


// run the engine
Runner.run(runner, engine);

 