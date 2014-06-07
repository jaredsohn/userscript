// ==UserScript==
// @name           Google+ RegCheck
// @namespace      beautify_gplus
// @include        https://plus.google.com/u/0/up/start/?sw=1&type=st
// ==/UserScript==

function timedRefresh(timeoutPeriod) {
	setTimeout("window.location.reload(true);",timeoutPeriod);
}
if(document.getElementsByClassName('a-H-f-zbIvOe')[0].innerHTML == "Sie haben bereits eine Einladung bekommen?"){
	var from = 10000;
	var to = 120000;
	function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    }
	var rand = randomFromTo(from, to);
	timedRefresh(rand);
}
else {
	alert('The registry is now open');
	var i = document.createElement('audiodiv');
		i.type = 'div';
		i.innerHTML = '<audio src="http://beautify.it/alarm.ogg" autoplay="autoplay" controls="controls" style="margin-top:104px;">Your browser does not support the audio element.</audio>';
	
	var d = document.getElementById('gb');
		d.appendChild(i);
}