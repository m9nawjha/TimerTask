const btnMode = document.querySelector('.btn-mode');
const bodyClass = document.body.classList;
btnMode.addEventListener('click', () => bodyClass.toggle('light-mode'));


const btnTab1 = document.querySelector('#tab1');
const btnTab2 = document.querySelector('#tab2');
const handleTabFunction = (e) => {
    const tabBox1 = document.querySelector('#tab-box1');
    const tabBox2 = document.querySelector('#tab-box2');
    if (e.target.id === 'tab1') {
        btnTab1.classList.add('active')
        btnTab2.classList.remove('active')
        tabBox1.classList.add('active-box')
        tabBox2.classList.remove('active-box')
    } else if (e.target.id === 'tab2') {
        btnTab2.classList.add('active')
        btnTab1.classList.remove('active')
        tabBox2.classList.add('active-box')
        tabBox1.classList.remove('active-box')
    }
};
btnTab1.addEventListener('click', handleTabFunction);
btnTab2.addEventListener('click', handleTabFunction);

// timer start
const hoursInput = document.querySelector("#hours")
const minutesInput = document.querySelector("#minutes");
const secondsInput = document.querySelector("#seconds");
const timerBar = document.querySelector("#timer-bar");
const submitBtn = document.querySelector("#submit");
const resetBtn = document.querySelector("#reset");
const finishAlert = document.querySelector("#finish");

function inputMax(input) {
    input.addEventListener("change", ()=> {
        let v = parseInt(input.value);
        if (v > 60) input.value = 60;
    });
}
inputMax(secondsInput);
inputMax(minutesInput);

let time;
let timerBarSet;
function startTimer() {
    let hour = parseInt(hoursInput.value) || 0;
    let min = parseInt(minutesInput.value) || 0;
    let sec = parseInt(secondsInput.value) || 0;
    time = setInterval(()=>{
        sec--;
        if (sec == -1) {
          min--;
          sec = 59;
        }
        if (min == -1) {
          hour--;
          min = 59;
        }
        if(hour == -1) {
            sec = 0;
            min = 0;
            hour = 0;
            clearInterval(time);
            finishAlert.style.display = 'block';
        }
        hoursInput.value = hour;
        minutesInput.value = min;
        secondsInput.value = sec;        
    }, 1000);


    const totalTime= hoursInput.value * 60 * 60 + minutesInput.value * 60 + secondsInput.value * 1000  /100;
    let percBar = 0;
    timerBarSet = setInterval(() => {
        timerBar.style.width= percBar++ +'%';
        if (percBar >= 101) {
            percBar = 100;
            clearInterval(timerBarSet);
        };
    }, totalTime);
    finishAlert.style.display = 'none';
};
submitBtn.addEventListener("click", startTimer);

function resetTimer() {
    clearInterval(time);
    clearInterval(timerBarSet);
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
    timerBar.style.width = '0%'
    finishAlert.style.display = 'none';
};
resetBtn.addEventListener("click", resetTimer);

// stopwatch start
const hoursSW = document.querySelector('#hou-sw');
const minutesSW = document.querySelector('#min-sw');
const secondsSW = document.querySelector('#sec-sw');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const resetSW = document.querySelector('#reset-sw');
const paused = document.querySelector('#paused');

let stopwatchTime;
function startStopwatch() {
    let hourSW = parseInt(hoursSW.value) || 0;
    let minSW = parseInt(minutesSW.value) || 0;
    let secSW = parseInt(secondsSW.value) || 0;
    stopwatchTime = setInterval(()=>{
            secSW ++ ;
            if (secSW == 60) {
                minSW++;
                secSW = 0;
            }
            if (minSW == 60) {
                hourSW++;
                minSW = 0;
            }
            hoursSW.value = hourSW;
            minutesSW.value = minSW;
            secondsSW.value = secSW;
    }, 1000);
    paused.style.display = 'none';
    stop.style.display = 'block';
    start.style.display = 'none';
}
start.addEventListener("click" , startStopwatch);

function pausedStopwatch(){
    clearInterval(stopwatchTime)
    paused.style.display = 'block';
    stop.style.display = 'none';
    start.style.display = 'block';
}
stop.addEventListener("click" , pausedStopwatch);

function resetStopwatch(){
    clearInterval(stopwatchTime)
    hoursSW.value = 0;
    minutesSW.value = 0;
    secondsSW.value = 0;
    paused.style.display = 'none';
    stop.style.display = 'none';
    start.style.display = 'block';
}
resetSW.addEventListener("click" , resetStopwatch);