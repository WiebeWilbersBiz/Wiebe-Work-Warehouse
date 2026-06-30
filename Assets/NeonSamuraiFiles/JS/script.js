//SCRIPT WILL BE SPLIT UP LATER!

const canvas = document.getElementById("player");
const level = document.getElementById("level");
const obstacle = document.getElementById("obstacle");
const tallObstacle = document.getElementById("tallObstacle");
const score = document.getElementById("score");
const ceiling = document.getElementById("heightCeiling");

let titleArray = [
    document.getElementById("10"),
    document.getElementById("20"),
    document.getElementById("30"),
    document.getElementById("40"),
    document.getElementById("50"),
    document.getElementById("60"),
    document.getElementById("70"),
    document.getElementById("80"),
    document.getElementById("90")
];


const cntx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = "Assets/NeonSamurai.png"

const scoreUp = new Audio();
scoreUp.src = "Assets/337049__shinephoenixstormcrow__320655__rhodesmas__level-up-01.mp3"

let marginX = 200;
let marginY = 530;

let obstacleX = 1400;
let obstacleMovementUp = 1000;

let movementY = 0;

let grounded = false;
let canJump = true;

let scoreCount = 0;

let paused = false;
let isDead = false;

let lastTime = 0;
const gravity = 4000;

function Update(currentTime)
{
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    if (paused)
    {
        obstacle.style.animationPlayState = "paused";

        requestAnimationFrame(Update);
        return;
    }

    cntx.clearRect(0, 0, canvas.width, canvas.height);

    
    //grounded = false;

    movementY -= gravity * deltaTime;

    marginY -= movementY * deltaTime;
    

    Collide(deltaTime);

    cntx.drawImage(playerImage, marginX, marginY, 75, 125);

    MoveObstacle(deltaTime);

    CheckBoxBoundries();

    if(isDead)
    {
        loseAudio.currentTime = 0;
        loseAudio.play();
    }

    requestAnimationFrame(Update);
}

requestAnimationFrame(Update);

//Logic for when the obstacle hits the player and for when the player reaches the jump cap
function Collide()
{
    if (marginY >= canvas.height - 125)
    {
        marginY = canvas.height - 125;

        grounded = true;
        canJump = true;

        // stop downward velocity only
        if (movementY < 0)
        {
            movementY = 0;
        }
    }

   if (marginY < 150)
    {
        marginY = 150;

        // kill upward velocity immediately
        if (movementY > 0)
        {
            movementY = 0;
        }

        canJump = false;
    }

    //setting the different faces of the player and obstacle
    const playerLeft = marginX;
    const playerRight = marginX + 65;
    const playerTop = marginY;
    const playerBottom = marginY + 125;

    const obstacleLeft = obstacleX;
    const obstacleRight = obstacleX + 50; 
    const obstacleTop = canvas.height - 60; 
    const obstacleBottom = canvas.height;

    if (playerRight > obstacleLeft && playerLeft < obstacleRight && playerBottom > obstacleTop && playerTop < obstacleBottom)       //if the obstacle hits the player the game is over and freezes
    {
        paused = true;
        console.log("HIT");
    }
}

//Moves the obatacle left constantly
function MoveObstacle(deltaTime)
{
    obstacleX -= obstacleMovementUp * deltaTime;

    obstacle.style.left = obstacleX + "px";
}

//Check obstacle position function
function CheckBoxBoundries()                
{
    const obstRect = obstacle.getBoundingClientRect();

    if (obstRect.right < 0)             //checks if the obstacle is off screen.
    {
        obstacleX = window.innerWidth;

        obstacle.style.left = obstacleX + "px"
        //console.log("Past")

        obstacleMovementUp += 12.5;          //increases the speed of the obstacle each time it goes of screen and back.
        console.log("speedUp");

        UpdateScore();
    }
}

let currentTitle = 0;
let scoreNeeded = 10;
let cantExceed = 20;

//Updates the score when players make the jump over the obstacle
function UpdateScore()
{
    scoreCount += 1;
    let scoreVar = `Score: ${scoreCount}`        //ups the scrore ifd the obstacle reaches past the screen, indicating it didnt hit the player.

    score.innerHTML = scoreVar;     //actually setting the in game score equal to the scoreVar.

    scoreUp.currentTime = 0;
    scoreUp.volume = 0.05;
    scoreUp.play();
    
    //Array that manages which score title to display
    if (scoreCount >= scoreNeeded && scoreCount < cantExceed)
    {
        for (let i = 0; i < titleArray.length; i++)
        {
            if (i == currentTitle)
            {
                titleArray[i].style.opacity = 1;
            }
            else
            {
                titleArray[i].style.opacity = 0;
            }

            if (scoreCount >= 100)
            {
                titleArray[8].style.opacity = 1;
            }
        }

        scoreNeeded += 10;
        cantExceed += 10;
        currentTitle += 1;
    }
}

//checks when player presses spacebar
addEventListener("keydown", function(e)
{
    if (grounded == true && canJump == true)
    {
        if(e.code == 'Space')
        {
            movementY = 1500;             //moves the player up
            grounded = false;
        }

        if (paused && e.code == 'Space')
        {
            location.reload();
        }
    }
});

addEventListener("keydown", function(e)
{
    if (paused && e.code == 'Space')
    {
        location.reload();          //Basically refreshes the screen when you press space is your "Dead"
    }
});