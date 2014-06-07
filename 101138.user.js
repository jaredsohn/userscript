// ==UserScript==
// @name		BugFlut Reloaded Pfandflaschenkurs Warner
// @namespace	by Darkshare
// @include		http://koeln.pennergame.de/*
// @description Pfandflaschenkurs Warner blinkt bei hohen Kurs
// ==/UserScript==


var allElms = document.getElementsByTagName('a'); //Alle <a>'s
var thisElm;

var cur_farbe = 0;
var new_color;

function clr_space (str) {
	var str_arr = str.split("	"); //Tab entfernen
	str = str_arr.join("");
	str_arr = str.split("\n"); //Umbruch entfernen
	str = str_arr.join("");
	return str;
}

function toggle() {
	if(cur_farbe == 0) {
		thisElm.style.color = new_color;
		cur_farbe = 1;
	}
	else {
		thisElm.style.color = "white";
		cur_farbe = 0;
	}
}

for(var i =0; i < allElms.length; i++) { // in schleife durchgehen
	thisElm = allElms[i];
	if(thisElm.className == "ttip") { //Wenn sie der klasse ttip angehören (obere zeile)
		if(thisElm.innerHTML.indexOf("Cent") != -1) { //Und Das Wort "Cent" enthalten ist
			var kurs = clr_space(thisElm.innerHTML).replace("Cent",""); //Cent entfernen
			if((kurs >= 5) && (kurs <= 20)) { //Einfärben :D
				thisElm.style.color = "#FF0000"; //helles rot
			}
			else if((kurs >= 20) && (kurs <= 24)) {
				thisElm.style.color = "yellow";
			}
			else if(kurs > 24) {
				new_color = "#0AF739";
				var interval = setInterval(toggle,500);
			}
			break;
		}
	}
}