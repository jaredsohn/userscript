// ==UserScript==
// @name       ArchBattle Week Countdown
// @namespace  http://sheflaprod.free.fr
// @version    0.2
// @description Week time countdown in empire view.
// @match      http://archbattle.com/play/index.php
// @copyright  MIT License
// ==/UserScript==

doc  = document;
cell = doc.querySelector('.bc4c');
mins = cell.textContent.match(/([0-9]{1,2})/)[1]
secs = 0;

cell.innerHTML = 'Next Week in <b id="week-countdown"></b> Minute<span id="week-plural"></span>';
count  = doc.getElementById('week-countdown');
plural = doc.getElementById('week-plural'); 
plural.textContent = mins > 1 ? 's' : '';

countdown = function(){
    if (secs == 0){
        mins--;
        secs = 60;
    }
    secs--;
    if (!mins && !secs){
        cell.innerHTML = '<b>A new week has begun!</b>';
        return;
    }
    count.style.color =  mins > 19
        ? 'green' : mins > 9
            ? 'orange' : 'red';
    mins < 1 && (plural.textContent = '');
    ('' + secs).length == 2 || (secs = '0' + secs);
    count.textContent = mins + ':' + secs;   
    setTimeout(countdown, 1000);
};

countdown();
