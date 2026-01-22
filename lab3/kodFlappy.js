
let board;
let boardWidth = 288*1;
let boardHeight = 512*1;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2.4;
let birdFrames;
let animationFrame=0;
let birdFrame=0;
let birdAngle=0;

let bird = {
        x: birdX,
        y: birdY,
        width: birdWidth,
        height: birdHeight
}

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -2;
let velocityY = 0;
let gravity = 0.5;
let distance = 200;

let minY = boardHeight/4;
let maxY = boardHeight*3/4;

let gameOver = false;

let wynik=0;
let najlepsze = [];

let btnX = 50;
let btnY = 200;
let btnWidth = 200;
let btnHeight = 50;

let  wingsSound = new Audio("SoundEfects/wing.wav");
let scoreSound = new Audio("SoundEfects/point.wav");
let hitSound = new Audio("SoundEfects/hit.wav");


window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    context.fillStyle = "green";
    //context.fillRect(bird.x, bird.y,bird.width,bird.height);

    let img1 = new Image();
    img1.src = "FlappyBird/yellowbird-upflap.png";

    let img2 = new Image();
    img2.src = "FlappyBird/yellowbird-midflap.png";

    let img3 = new Image();
    img3.src = "FlappyBird/yellowbird-downflap.png";

    birdFrames = [img1, img2, img3];
    img1.onload = function() {
        context.drawImage(birdFrames[0], bird.x, bird.y, bird.width, bird.height);
    }

    bottomPipeImg = new Image();
    bottomPipeImg.src="FlappyBird/pipe-green.png";
    topPipeImg = new Image();
    topPipeImg.src="FlappyBird/pipe-green.png";

    let backgroundMusic = new Audio("SoundEfects/wing.mp3");
    backgroundMusic.loop = true;  // muzyka będzie się zapętlać
    backgroundMusic.volume = 0.5; // pół głośności
    backgroundMusic.play();       // start

    requestAnimationFrame(updateBoard)

    document.addEventListener("keydown", moveBird);
    document.addEventListener("mousedown", moveBird);

    board.addEventListener("mousedown", function(e) {
        if (!gameOver) return; // tylko gdy Game Over

        let rect = board.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;

        // sprawdzenie kolizji z przyciskiem
        if (
            mouseX > btnX &&
            mouseX < btnX + btnWidth &&
            mouseY > btnY &&
            mouseY < btnY + btnHeight
        ) {
            restartGame();
        }
    });


}

function welcome(){

}

function updateBoard() {

    requestAnimationFrame(updateBoard);
    if (gameOver) {
        updateScore()
        drawGameOver();
        return;
    }
    context.clearRect(0,0,boardWidth,boardHeight);
    animationFrame+=1;
    if(animationFrame%16==0){
        birdFrame=(birdFrame+1)%3
    }

    bird.y+=velocityY;
    //bird.y = Math.max(bird.y + velocityY,0 );

    birdAngle=Math.min(60, velocityY*10);

    context.save();
    context.translate(bird.x + bird.width/2, bird.y + bird.height/2);
    context.rotate(birdAngle * Math.PI / 180);
    context.drawImage(birdFrames[birdFrame], -bird.width/2, -bird.height/2, bird.width, bird.height);
    context.restore();

    velocityY += gravity;
    if ( bird.y > board.height){ gameOver = true; }

    if (pipeArray.length === 0 || boardWidth - pipeArray[pipeArray.length - 1].x > distance) {
        placePipes();
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;

        if(pipe.isTop && !pipe.passed && pipe.x + pipe.width/2 < bird.x - bird.width/2){
            wynik+=1;
            scoreSound.play();
            pipe.passed=true;
        }

        if(pipe.isTop) {
            context.save();
            context.translate(pipe.x, pipe.y + pipe.height);
            context.scale(1, -1);
            context.drawImage(pipe.img, 0, 0, pipe.width, pipe.height);
            context.restore();
        }
        if(!pipe.isTop) {
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        }
        if(detectCollision(bird,pipe)){
            hitSound.play();
            gameOver = true;
        }

    }

    if(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();
        pipeArray.shift();
    }

    context.fillStyle = "black";
    context.fillRect(boardWidth-60, 0, 60, 55);
    context.fillStyle = "white";
    context.font="50px JetBrains Mono";
    context.fillText(wynik,boardWidth-60,45)

}

function placePipes() {
    if(gameOver) { return;}
    let randomPipeY = pipeY - pipeHeight*11/32 - Math.random()*(pipeHeight*9/16);
    //let randomPipeY = pipeY - pipeHeight*29/32;
    let openingSpace = boardHeight*3/16;

    let topPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
        isTop: true
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
        isTop: false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.type === "mousedown"){
        velocityY = -6;
        wingsSound.play()
    }
}
function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function drawGameOver(){

    for(let i=0;i<100;i++){
        if(bird.y>boardHeight){break;}
        context.clearRect(0,0,boardWidth,boardHeight);

        bird.y +=0.01;
        context.save();
        context.translate(bird.x + bird.width/2, bird.y + bird.height/2);
        context.rotate(Math.PI / 2);
        context.drawImage(birdFrames[birdFrame], -bird.width/2, -bird.height/2, bird.width, bird.height);
        context.restore();

        for (let i = 0; i < pipeArray.length; i++) {
            let pipe = pipeArray[i];

            if(pipe.isTop) {
                context.save();
                context.translate(pipe.x, pipe.y + pipe.height);
                context.scale(1, -1);
                context.drawImage(pipe.img, 0, 0, pipe.width, pipe.height);
                context.restore();
            }
            if(!pipe.isTop) {
                context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
            }
        }
    }


    let img = new Image();
    img.src="UI/gameover.png";
    context.drawImage(img, 20, 90, 192*1.3, 42*1.3);

    let btnX = 50;
    let btnY = 200;
    let btnWidth = 200;
    let btnHeight = 50;

    context.fillStyle = "black";
    context.fillRect(btnX, btnY, btnWidth, btnHeight);

    context.fillStyle = "white";
    context.font = "20px JetBrains Mono";
    context.fillText("Zacznij ponownie", btnX + 5, btnY + 30);
}
function restartGame() {
    bird.y = birdY;
    velocityY = 0;
    pipeArray = [];
    wynik = 0;
    gameOver = false;
}
function updateScore(score){
    najlepsze.push(score);
    najlepsze.sort((a,b) => b-a);
    if(najlepsze.length > 5){
        najlepsze.length=5;
    }
}
