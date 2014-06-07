// ==UserScript==
// @name                Nukezone Clock
// @namespace           Nukezone
// @description         Adds the clock back above the players online link
// @include             http://www.nukezone.nu/*
// @include				http://www.nukezone.se/*
// @exclude				http://www.nukezone.nu/forum/*
// @exclude				http://www.nukezone.se/forum/*
// ==/UserScript==
var head, style;
head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#menuHolder { top: 20px; }';
head.appendChild(style);



var clock = document.createElement('span');
var br = document.createElement('br');
clock.setAttribute('id', 'placeithere');
clock.innerHTML = 'calculating...';

var after = document.getElementById('menuHolder');
after.parentNode.insertBefore(clock, after);

changevalues();

function changevalues() {
	var timestring = document.body.innerHTML.search('Current date\/time is');
	timestring = document.body.innerHTML.substr(timestring + 21, 19);
	var hour = Number(timestring.substr(11, 2)) * 3600;
	var min = Number(timestring.substr(14, 2)) * 60;
	var sec = Number(timestring.substr(17, 2));
	timeleft = (hour + min + sec);
}

var script = document.createElement('script');
script.setAttribute('language', 'Javascript1.2');
script.innerHTML = ' ' +
'var timedelay = 1000;' +
'var timeleft = ' + timeleft + ';' +
'changecontent();' +
'function calctext() {' +
'   var hour = Math.floor(timeleft / 3600) % 24;' +
'   var minute = Math.floor(timeleft / 60) % 60;' +
'   var sec = Math.floor(timeleft) % 60;' +
'   if (hour < 10) { hour = "0" + hour; }' +
'   if (minute < 10) { minute = "0" + minute; }' +
'   if (sec < 10) { sec = "0" + sec; }' +
'   var clock = hour + ":" + minute + ":" + sec;' +
'	return clock;' +
'}' +
'function changecontent() {' +
'	timeleft++;' +
'	document.getElementById("placeithere").innerHTML = calctext();' +
'	if (timeleft >= 86400)' +
'		timeleft = 0;' +
'	setTimeout("changecontent()", timedelay);' +
'}';

head.appendChild(script);