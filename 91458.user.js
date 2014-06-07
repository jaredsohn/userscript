// ==UserScript==
// @name             تضليل وقت وصول الجيوش الى قرية العدو
// @namespace        فله ما منها مله
// @author           Peety (Ursprung war ein Script von C1B1)
// @description      Angriff/Unterstützung/Graue Dörfer auf der Bestätigungsseite farbig hervorheben
// @version          0.15
// @include          http://*.*tribalwars.*/game.php?*screen=place*try=confirm*
// @include          http://*.*tribal*.*/game.php?*screen=place*try=confirm*
// ==/UserScript==



// Einstellungen:  (1: Rahmen anzeigen oder 0: Rahmen nicht anzeigen)
var attack_day    = 1;			// Angriff tagsüber
var attack_night  = 1;			// Angriff nachts, nur mit PA
var attack_grey   = 1;			// Angriff Barbarendorf
var support_day   = 1;			// Unterstützung tagsüber
var support_night = 1;			// Unterstützung nachts, nur mit PA
var support_grey  = 1;			// Unterstützung Barbarendorf



/*------------------------------------------------------------------------------------------*/

if(window.frames[1]) {
	var Doc = window.frames[1].document;
	if(Doc.location.href.search(/game.php/) <= 0)
	{
		Doc = window.frames[0].document;
	}
}
else {
	var Doc = window.document;
}
if(Doc.body) {
	var Body = Doc.body.innerHTML;
}
else {
	return;
}
var td = document.getElementById('date_arrival');
if (!td) {
	return;		// on Error , bei fehlerhafter Eingabe
}
var id = td.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.nextSibling.firstChild.href.split('=').pop();
var server = document.location.host.split('.')[0];
var s = /[dcn][ehl](\d+)/;

var nightstart = 24;
var nighttime = 0;
if(Body.match(/popup_scroll\(\'villages\.php/)) {
	nightstart = 0;

	if (s.test(server)) {								// SDS- und Classic-Welten ausfiltern
		if (server.match(/ch/)){			// schwyz
			var world = server.match(/ch(\d+)/);
			//Welt Schweiz 1,2,3,4,5,6,7,8,.,..,..,..,..,..,..  - bei neuen Welten hier ergänzen
			var swiss = [0,8,8,7,8,7,7,7,7,7, 7, 7, 7, 7, 7, 7];
			nighttime = swiss[world[1]];
		} 
		else if (server.match(/nl/)){		// nederlands
			var world = server.match(/nl(\d+)/);
			//Welt Nederlands 1,2,3,4,5,6,7,8,9,10,11,12,13,14,..,..,..,..,..  - bei neuen Welten hier ergänzen
			var start_ned  = [0,0,1,1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
			var nederlands = [0,7,7,7,7,7,7,7,7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
			nightstart = start_ned[world[1]];
			nighttime = nederlands[world[1]];
		} 
		else {						// deutsch
			var world = server.match(/de(\d+)/);
			//        Zehnerstelle der Welt:  1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4 4 4 4 4 4 4 4 4 4 5 5 5 5 5
			// Welt deutsch 1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,.,.,.,.,.,. - bei neuen Welten hier ergänzen
			var german = [0,0,0,0,0,0,7,7,7,0,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,8,0,8,8,8,8,8,7,8,8,8,8,8,8,8,7,8,7,8,8,8,8];
			nighttime = german[world[1]];
		}
	}
}

var bord = "";
var supp = false;
for(i = 0, inputs = document.getElementsByTagName("input"); i < inputs.length; i++) {
	if (inputs[i].name == "support") {
		supp = true;
		break;
	}  
}
if(id != "") {
	var time = td.firstChild.data.match(/(\d{1,2}\:\d{1,2})/g)[0].split(":");
	if(time[0][0] == '0') {
		time[0] = time[0][1];
	}
	if((parseInt(time[0]) < nighttime) && (parseInt(time[0]) >= nightstart)) {
		if (supp && (support_night > 0)) {				// Unterstützung nachts
			bord = "border: green 3px solid";
		}
		else if (!supp && (attack_night > 0)) {			// Angriff nachts
			bord = "border: red 4px solid";
		}
	} 
	else {
		if (supp && (support_day > 0)) {				// Unterstützung tagsüber
			bord = "border: green 1px solid";
		}
		else if (!supp && (attack_day > 0)) {			// Angriff tagsüber
			bord = "border: red 1px solid";
		}
	}
}
else {											// graues Dorf
	if (supp && (support_grey > 0)) { 					// Unterstützung graues Dorf
		bord = "border: black 2px solid";
	}
	else if (!supp && (attack_grey > 0)) {				// Angriff graues Dorf
		bord = "border: grey 1px dotted";
	}
}
td.setAttribute("style",bord+"; white-space: nowrap;");
