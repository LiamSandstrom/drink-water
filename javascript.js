const select = document.querySelector("select");
const bar = document.getElementById("bar");
let fill = bar.querySelector("div");
const prevColor = getComputedStyle(fill).backgroundColor;
const dmgColor = "rgb(255, 82, 82)";
bar.addEventListener("click", addJuice);

let breakCount = 0;
let breaklimit = 10;

function addJuice() {
    let newHeight = fill.offsetHeight;
    maxHeight = bar.offsetHeight;
    newHeight = newHeight / maxHeight;
    newHeight *= 100;
    newHeight += 10;
    newHeight = Math.round(newHeight);
    if(newHeight > 95){
        newHeight = 95;
        fill.style.height = newHeight + "%";
        breakCount++;
        console.log(breakCount);
        if(breakCount >= breaklimit){
            breakGlass();
        }
        rotateGlass();
        return;
    }
    console.log(newHeight);
    fill.style.height = newHeight + "%";
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function rotateGlass(){
    fill.style.backgroundColor = dmgColor;
    let m = getRandomNumba(1, 1.4);
    let dir = 1;
    if(m > 1.2){
        dir = -1;
    }
    else{
        dir = 1;
    }
    bar.style.transform = `rotate(${dir * 17*m}deg) scale(1.2)`;
    await delay(50);
    bar.style.transform = `rotate(${dir * -25 * m}deg)`;
    console.log(bar.style.transform);
    await delay(50);
    bar.style.transform = `scale(${1 * m})`;
    fill.style.backgroundColor = prevColor;
    bar.style.transform = "rotate(0deg)";
}

async function breakGlass(){
    console.log("broken");
    console.log(prevColor);
    bar.style.transition = "scale 1.8s, transform 0.4s";
    bar.style.scale = "3";
    bar.style.pointerEvents = "none";
    document.querySelector("h1").style.visibility = "hidden";
    await delay(1500);
    bar.style.transition = "scale 0.25s, transform 0.4s";
    bar.style.scale = "1";
    await delay(150);
    bar.style.scale = "4";
    await delay(170);
    document.body.style.backgroundColor = prevColor;
    bar.style.visibility = "hidden";
}

function getRandomNumba(min, max){
    return Math.random() * (max - min) + min;
}

