// ==UserScript==
// @name           Notifikacija
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    Jebem ti admine u prkno
// @version        0.21223232323
// @include        http://ww*.erepublik.com/*
// ==/UserScript==



var brojevi = document.getElementById('maildisplay').getElementsByClassName('smalldotted');
var notif = parseInt(brojevi[1].innerHTML);
if (notif>0) {
	alert("Zvonce: " + brojevi[1].innerHTML);
}



