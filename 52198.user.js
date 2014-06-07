// ==UserScript==
// @name           Tagesschau No Flashplayer
// @namespace      pothos:kailueke.de.vu
// @description    Replaces Tagesschau.de-Flashplayer with some media-plug-in
// @include        http://tagesschau.de/*
// @include        http://www.tagesschau.de/*
// @include        http://*.tagesschau.de/*
// ==/UserScript==

(function() {

var derplayer; // Player-Class ausfindig machen:
 var tags = document.getElementsByTagName('*'); // alle Elemente durchsuchen
 var tcl = " fPlayer "; // nach der Class wird gesucht
for(i=0,j=0; i<tags.length; i++) {
	var test = " " + tags[i].className + " "; // Alle Tags durchsuchen und
	if (test.indexOf(tcl) != -1){ // schauen, ob der Klassenname richtig ist
		derplayer = tags[i]; // unserer Player-Class-Variable wird der gefundene zugewiesen

var derstart = derplayer.innerHTML.indexOf('id=%2F'); // Anfangsposition von Flash-Video-ID finden
var dasende = derplayer.innerHTML.indexOf('.hi&'); // Ende finden
var dieid = derplayer.innerHTML.substring(derstart + 3, dasende); // ID extrahieren

var starttimepos = derplayer.innerHTML.indexOf("start="); // Die Startposition und die Stoppositionen finden
var starttime = derplayer.innerHTML.substring(starttimepos + 6, starttimepos + 9);
var endtimepos = derplayer.innerHTML.indexOf("stop=");
var endtime = derplayer.innerHTML.substring(endtimepos + 5, endtimepos + 8);

var vidhtmlpos = derplayer.innerHTML.indexOf("windowOpen('/multimedia/video/"); // Links zur Videoseite finden
var vidhtmlposende = derplayer.innerHTML.indexOf(".html',820,700,1,1);return false");
var vidhtml = 'http://www.tagesschau.de' + derplayer.innerHTML.substring(vidhtmlpos + 12, vidhtmlposende + 5);

// MMS-URL erzeugen
var dieurl = 'mms://tagesschau.wmod.llnwd.net/a3705/d1' + dieid + '.wm.hi.wmv'; // alternativ .wm.lo.wmv für sehr schlechte Quali
dieurl=unescape(dieurl); // Schrägstriche ordentlich darstellen

// Einbetten eines Plug-ins anstelle des Flashplayers (irgendwann dann auch mal HTML 5 <video>-Tags)
derplayer.innerHTML="<embed height=288 src=" + dieurl + " width=384 starttime=" + starttime + " endtime=" + endtime + " autostart=false /><br /><a href='" + vidhtml + "'>Weitere Video-Formate</a>";
// derplayer.innerHTML="<embed height=288 src=" + dieurl + " width=384 /><br /><a href='" + vidhtml + "'>Weitere Video-Formate</a>";

// für jede fPlayer-Klasse gemacht
		}
}

})()
