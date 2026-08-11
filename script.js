/* ==========================================
   LOADING SCREEN
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loading").style.display = "none";

    }, 1000);

});

/* ==========================================
   GET ELEMENTS
========================================== */

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const welcome = document.getElementById("welcome");
const letter = document.getElementById("letter");

const music = document.getElementById("birthdayMusic");

const typingText = document.getElementById("typingText");

/* ==========================================
   BIRTHDAY MESSAGE
========================================== */

const message = `Happy Birthday Isha ❤️

Today is your special day.

I just wanted to remind you how amazing you are.

May this year bring you happiness, success, good health, and lots of beautiful memories.

Never stop smiling.

Keep shining.

Enjoy every moment of your birthday.

Happy Birthday once again ❤️

— Yadnyesh`;

/* ==========================================
   TYPEWRITER
========================================== */

let index = 0;

function typeWriter(){

    if(index < message.length){

        typingText.innerHTML += message.charAt(index);

        index++;

        setTimeout(typeWriter,10);

    }else{

        continueBtn.style.display="inline-block";

    }

}

/* ==========================================
   OPEN SURPRISE
========================================== */

startBtn.addEventListener("click",()=>{

    music.play();

    welcome.classList.add("hidden");

    letter.classList.remove("hidden");

    typeWriter();

});
// ============================
// CONTINUE BUTTON
// ============================

const voucher = document.getElementById("voucher");

/* ==========================================
   VOUCHER + SCRATCH CARD
========================================== */

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

/* Show Voucher */

continueBtn.addEventListener("click", () => {

    letter.classList.add("hidden");

    voucher.classList.remove("hidden");

    createScratchCard();

});

/* Draw Silver Layer */

function createScratchCard(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

    ctx.fillStyle="#C0C0C0";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#666";

    ctx.font="bold 30px Poppins";

    ctx.textAlign="center";

    ctx.fillText("Scratch Here",canvas.width/2,canvas.height/2);

}

let scratching=false;

/* Mouse Events */

canvas.addEventListener("mousedown",()=>{

    scratching=true;

});

canvas.addEventListener("mouseup",()=>{

    scratching=false;

});

canvas.addEventListener("mouseleave",()=>{

    scratching=false;

});

canvas.addEventListener("mousemove",(e)=>{

    if(!scratching) return;

    scratch(e.offsetX,e.offsetY);

});

function scratch(x,y){

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(x, y, 25, 0, Math.PI * 2);

    ctx.fill();

    checkScratchCompletion();

}
/* ==========================================
   SCRATCH COMPLETE DETECTION
========================================== */

let celebrationStarted = false;

function checkScratchCompletion() {

    if (celebrationStarted) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let transparentPixels = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {

        if (imageData.data[i] === 0) {

            transparentPixels++;

        }

    }

    const percent = transparentPixels / (canvas.width * canvas.height);

    if (percent > 0.55) {

        celebrationStarted = true;

        startCelebration();

    }

}
/* ==========================================
   CELEBRATION
========================================== */

const finalPage = document.getElementById("finalPage");

function startCelebration(){

    createConfetti();

    setTimeout(() => {

        voucher.classList.add("hidden");

        finalPage.classList.remove("hidden");

    },30000000);

}
/* ==========================================
   SIMPLE CONFETTI
========================================== */

function createConfetti(){

    for(let i=0;i<120;i++){

        const conf=document.createElement("div");

        conf.innerHTML="🎉";

        conf.style.position="fixed";

        conf.style.left=Math.random()*100+"vw";

        conf.style.top="-30px";

        conf.style.fontSize=(18+Math.random()*18)+"px";

        conf.style.transition="4s linear";

        conf.style.zIndex="9999";

        document.body.appendChild(conf);

        setTimeout(()=>{

            conf.style.top="110vh";

            conf.style.transform="rotate(720deg)";

        },50);

        setTimeout(()=>{

            conf.remove();

        },4500);

    }

}