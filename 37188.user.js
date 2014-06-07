// ==UserScript==
// @name          DT advisor countdown
// @description   change the DT countdown to alert a turn change
// @include       http://*.darkthrone.com/*
// @include       http://darkthrone.com/*
// @exclude       http://*.darkthrone.com/forum/*
// @exclude       http://darkthrone.com/forum/*
// @exclude       http://bet*.darkthrone.com/
// @exclude       http://views.darkthrone.com/*
// ==/UserScript==
var DEBUG;
var time = document.getElementById("next_turn_time");
var timeout = (parseInt(time.getElementsByTagName('span')[0].innerHTML,10)*60 + parseInt(time.getElementsByTagName('span')[1].innerHTML,10) + 1)
if (DEBUG){
	GM_log('in ' +timeout);
}
window.setTimeout(function(){
	if(DEBUG) GM_log('working');
	var advisor = document.getElementById('advisor').getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
	advisor.innerHTML = '<span style="color: Green;"><b>Turn has passed. <br />Refresh Page.</b></span><br><br>'+advisor.innerHTML;
}, DEBUG?1:timeout*1000);