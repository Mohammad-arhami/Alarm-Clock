const selectMenu = document.querySelectorAll("select");
const time = document.querySelector(".time");
const h2 = document.querySelector("h2");
const btn = document.querySelector("button");
const ringtoon = new Audio('./Assets/ringtone.mp3');
const content = document.querySelector(".content");
let alarmTime , alarmState = "noset";

let curentTime = new Date();
time.innerHTML = `${curentTime.getHours()}:${curentTime.getMinutes()}:${curentTime.getSeconds()}`;

for (let i = 23; i >= 0 ; i--) {
    i = i < 10 ? '0' + i : i;

    // if (i < 10 ) i = '0' + i
    // else i = i

    let option = `<option value="${i}">${i}</option>`;  
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0 ; i--) {
    i = i < 10 ? '0' + i : i;

    let option = `<option value="${i}">${i}</option>`;  
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}


let timer = setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

   time.innerHTML = `${h}:${m}:${s}`;
   
   if (alarmTime ==  `${h}:${m}`) {
        ringtoon.play();
        ringtoon.loop = true;

        console.log("ring");
   }
    
}, 1000);


btn.addEventListener("click" , () => {

    if (selectMenu[0].value !== "Hour" && selectMenu[1].value !== "Minute") {

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;

        // let h2 = `<h2>Your Alarm Set For: ${alarmTime}</h2>`;
        // time.insertAdjacentHTML("afterend", h2);

    }else{
        return alert("Please select a valid time");
    }

    checkState(alarmState);

});

function checkState(state) {
    if (state == "noset") {
        content.classList.add("disable");
        btn.innerText = "clear alarm";
        alarmState = "set";
        h2.innerText = `Your Alarm Set For : ${alarmTime}`;
    } else{
        content.classList.remove("disable");
        alarmTime = "";
        ringtoon.pause();
        alarmState = "noset";
        btn.innerText = "set alarm";
        h2.innerText = "";
    }

}