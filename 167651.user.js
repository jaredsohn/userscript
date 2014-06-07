// ==UserScript==
// @name       Dota 2 Lounge bumper
// @namespace  http://www.mochatavern.com/
// @version    1.0
// @description  Automatically bumps trades when you load them
// @match      http://dota2lounge.com/mytrades
// @copyright  2013
// ==/UserScript==

Array.prototype.Add = function (element) {
    this[this.length] = element;
};

var next_refresh = new Date();

function timedRefresh(timeoutPeriod) {
    window.setTimeout("location.reload(true);", timeoutPeriod);
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
timedRefresh(1860000);
self.setInterval(function(){displayTimer()},1000);