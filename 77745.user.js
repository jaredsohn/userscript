// ==UserScript==
// @name           timeout alert
// @namespace      klavogonki
// @author         andremacareno
// @include        http://klavogonki.ru/play/*
// ==/UserScript==
(function() {function tm_alert() {
		if(typeof soundManager != 'undefined')var time=null;
		time=document.getElementById('waiting_timeout').innerHTML;
		if(time == "00:10" || time == "00:05" || time == "00:03") soundManager.play("tm_alert");
		if (document.getElementById("waiting_timeout").innerHTML == "00:00") clearInterval(document.getElementById("alert_init").value)
}	
	var hidden_elm=document.createElement('input');
	hidden_elm.type='hidden';
	hidden_elm.id='alert_init';
	document.body.appendChild(hidden_elm);
		var elem=document.createElement("script");
		elem.innerHTML="soundManager.createSound('tm_alert','/typo.mp3');"+tm_alert + 'document.getElementById("alert_init").value = setInterval("tm_alert()", 1000);';
		document.body.appendChild(elem);})();