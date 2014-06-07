// ==UserScript==
// @name           xfirefullscreen
// @namespace      brak
// @include        http://www.xfire.com/live_video/*
// @exclude		http://www.xfire.com/live_video/
// ==/UserScript==

document.getElementsByTagName('table')[9].style.width='2300px';

/*var naptime = 5;
naptime = naptime * 1000;
var sleeping = true;
var now = new Date();
var alarm;
var startingMSeconds = now.getTime();
while(sleeping){
alarm = new Date();
alarmMSeconds = alarm.getTime();
if(alarmMSeconds - startingMSeconds > naptime){ sleeping = false; }
} */

var intValue = 0;

function mm() {
var divs = document.getElementsByTagName('div');
for(i=0; i<divs.length; i++)
{
if(divs[i].className == 'p_template_box p_template6_box2')
{
divs[i].style.width='2000px';
}
if(divs[i].className == 'p_wrapper')
{
divs[i].style.width='2000px';
}
}
document.getElementsByTagName('object')[0].width=1620;
document.getElementsByTagName('object')[0].height=940;
}

window.setTimeout(function() { mm(); }, 1000);