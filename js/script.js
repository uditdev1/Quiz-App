const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

const question=document.getElementById("question");
const options=document.getElementById("options");
const nextBtn=document.getElementById("nextBtn");
const result=document.getElementById("result");
const progress=document.getElementById("progress");
const timer=document.getElementById("timer");
const questionCount=document.getElementById("questionCount");

const correctSound = new Audio("assets/sounds/correct.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");
const clickSound = new Audio("assets/sounds/click.mp3");

let current=0;
let score=0;
let time=15;
let interval;
let answered=false;

function loadQuestion(){

clearInterval(interval);
answered=false;

let q=questions[current];

question.innerText=q.question;
questionCount.innerText=`Question ${current+1} of ${questions.length}`;
options.innerHTML="";
result.innerText="";

q.options.forEach(option=>{
let btn=document.createElement("button");
btn.innerText=option;
btn.classList.add("option");

btn.onclick=()=>selectAnswer(btn,option,q.answer);

options.appendChild(btn);
});

progress.style.width=`${((current+1)/questions.length)*100}%`;

startTimer();
}

function selectAnswer(btn,selected,correct){

if(answered) return;

answered=true;
clearInterval(interval);

Array.from(options.children).forEach(button=>{
button.disabled=true;

if(button.innerText===correct){
button.classList.add("correct");
}
});

if(selected===correct){
correctSound.play();
score++;
}else{
wrongSound.play();
btn.classList.add("wrong");
}
}

function startTimer(){

time=15;
timer.innerText=time;

interval=setInterval(()=>{
time--;
timer.innerText=time;

if(time===0){
clearInterval(interval);
nextQuestion();
}
},1000);
}

function nextQuestion(){

clickSound.play();

current++;

if(current<questions.length){
loadQuestion();
}else{
showResult();
}
}

function showResult(){

localStorage.setItem("lastScore", score);
localStorage.setItem("totalQuiz", current);

question.innerText="Quiz Completed 🎉";
options.innerHTML="";
nextBtn.style.display="none";
timer.style.display="none";
questionCount.style.display="none";

result.innerText=`Your Score: ${score}/${questions.length}`;
}

nextBtn.onclick=nextQuestion;

loadQuestion();