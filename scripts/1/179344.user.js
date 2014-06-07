// ==UserScript==
// @name        AutoAlarm
// @namespace   AutoAlarm
// @include     http://www.feuerwache.net/feuerwehr-einsaetze/*
// @version     1
// ==/UserScript==

unsafeWindow.rel = function() {
	window.location.href = 'http://www.feuerwache.net/feuerwehr-einsaetze';
}

var counter = 0;
ownMission = false;
for(var i = 0; i < document.getElementsByClassName('famfamfamicon').length; i++) {
	if(document.getElementsByClassName('famfamfamicon').item(i).alt == 'Neuer Einsatz') {
		counter = i;
	}
}

for(var i = 0; i < document.getElementsByTagName('a').length; i++) {
	if(document.getElementsByTagName('a').item(i).innerHTML == 'Fabi1996' || document.getElementsByTagName('a').item(i).innerHTML == 'In deinem Feuerwehrverband Verstärkung anfordern') {
		ownMission = true;
	}
}

if(counter > 0 && ownMission == true) {
	for(var i = 0; i < document.getElementsByTagName('input').length; i++) {
		if(document.getElementsByTagName('input').item(i).type == "submit") {
			document.getElementsByTagName('input').item(i).focus();
			document.getElementsByTagName('input').item(i).click();
			window.setTimeout('rel()', 1000);
		}
	}
}