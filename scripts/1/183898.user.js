// ==UserScript==
// @name       Dota 2 Lounge bumper
// @namespace  http://www.mochatavern.com/
// @version    1.0
// @description  Automatically bumps trades when you load them
// @match      http://dota2lounge.com/mytrades
// @copyright  2013
// ==/UserScript==

//EDITED by Greencyber (Nambah Bunyi Notif)
var linkaudioogg = 'http://irpi.jr1.ru/ku-ku.ogg'; //Ссылка на звуковой файл
var enabledsound = true; //Воспроизведить звук если есть новые предложения
var audio = new Audio();
var newoffer = document.getElementsByClassName('notification');
var notiftime = 60; //notif reminder *second
var refreshtime = Math.floor((Math.random()*3)+1); //refresh page interval *minute
if(newoffer.length != 0) playsound(linkaudioogg);
function playsound(audios)
{
audio.src = audios;
audio.autoplay = enabledsound;
}
setInterval(function(){if(newoffer.length != 0) playsound(linkaudioogg);},notiftime*1000);
//


Array.prototype.Add = function (element) {
    this[this.length] = element;
};

var next_refresh = new Date();

function timedRefresh(timeoutPeriod) {
    window.setTimeout("location.reload();", timeoutPeriod);
    //window.setTimeout(open_win(), timeoutPeriod);
    next_refresh = new Date();
    next_refresh.setTime(next_refresh.getTime() + timeoutPeriod); 
}

function displayTimer() {
    var time = new Date();
    time.setTime(next_refresh.getTime() - time.getTime());
    var seconds = parseInt(time.getTime() / 1000, 10);
    document.getElementById("timer").innerHTML = "Time until next reload: " + (seconds - seconds % 60) / 60 + ":" + seconds % 60;
}

function bumpTrades() {
    var trades, buttonright, i;
    trades = document.getElementsByClassName("tradepoll"); 
    buttonright = undefined;
    for (i = 0; i < trades.length; i++) {
        buttonright = trades[i].getElementsByClassName("buttonright")[0];
        if (buttonright)
        {
            buttonright.click();
            buttonright.onclick = new function(){};
            buttonright.style.display = "block";
            buttonright.innerHTML = "Successfully bumped!";
        } 
    }
  
    var timer = document.createElement('div');
    timer.id = 'timer';
    timer.className = 'button';
    timer.innerHTML = "Time until next reload:";
    document.getElementsByClassName("standard")[0].appendChild(timer);
    
}

bumpTrades();
timedRefresh(refreshtime*60000); //EDITED
self.setInterval(function(){displayTimer()},1000);