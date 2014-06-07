// ==UserScript==
// @name			[ALL] Pennerchat
// @namespace		http://pennertools.com/script.html
// @author			Javan_xD [http://www.pennergame.de/profil/id:1679719/]
// @description		Der Deutsche Penner-Chat.de fuer alle Staedte und Laender von Pennergame. Hier kannst du dich immer mit anderen Pennern austauschen. Es wird angezeigt, wer und wann sich zuletzt ins Spiel eingeloggt hat, die Uhrzeit wann jemand etwas geschrieben hat, Ein Link auf jedem Namen zu dem jeweiligen Profil und vieles weiteres, wie ein Einstellungsmenü um ein zu stellen wo der Chat sein soll etc..
// @include			http://*pennergame.de*
// @include			http://*menelgame.pl*
// @include			http://*clodogame.fr*
// @include			http://*mendigogame.es*
// @include			http://*dossergame.co.uk*
// @include			http://*serserionline.com*
// @include			http://*bumrise.com*
// @include			http://*bichionline.ru*
// @include			http://*pivetgame.com.br*
// @include			http://*faveladogame.com.br*
// @exclude			http://*board*
// @exclude			http://*redirect*
// @exclude			http://*/chat/applet/*
// @exclude			http://*change/*
// @exclude			http://*hack*
// @exclude			http://*my*
// @version			1.1.9 Border radius, verschieben
// @version			1.1.8 Exclude hinzugefügt + link var fix
// @version			1.1.7 Halloween angepasst
// @version			1.1.6 Kleiner Link Fehler
// @version			1.1.5 Fehler beim erkennen des Landes behoben
// @version			1.1.4 Scroll funktion, informationen und check unter einstellungen
// @version			1.1.3 Einfaches Design und Links zu den Ländern aktualisiert
// @version			1.1.2 Einstellungsbereich hinzugefügt
// @version			1.1.1 Länder und Städte aktualisiert
// ==/UserScript==

// Link für das jeweilige Land oder die Stadt
if (location.toString().indexOf("www.pennergame") != -1) {
	var link = 'http://www.pennergame.de/';
} else if (location.toString().indexOf("berlin.pennergame") != -1) {
	var link = 'http://berlin.pennergame.de/';
} else if (location.toString().indexOf("muenchen.pennergame") != -1) {
	var link = 'http://muenchen.pennergame.de/';
} else if (location.toString().indexOf("halloween.pennergame") != -1) {
	var link = 'http://halloween.pennergame.de/';
} else if (location.toString().indexOf("warszawa.menelgame") != -1) {
	var link = 'http://warszawa.menelgame.pl/'
} else if (location.toString().indexOf("krakow.menelgame") != -1) {
	var link = 'http://krakow.menelgame.pl/';
} else if (location.toString().indexOf("paris.clodogame") != -1) {
	var link = 'http://paris.clodogame.fr/';
} else if (location.toString().indexOf("marseille.clodogame") != -1) {
	var link = 'http://marseille.clodogame.fr/';
} else if (location.toString().indexOf("mendigogame") != -1) {
	var link = 'http://www.mendigogame.es/';
} else if (location.toString().indexOf("dossergame") != -1) {
	var link = 'http://www.dossergame.co.uk/';
} else if (location.toString().indexOf("serserionline") != -1) {
	var link = 'http://www.serserionline.com/';
} else if (location.toString().indexOf("bumrise") != -1) {
	var link = 'http://www.bumrise.com/';
} else if (location.toString().indexOf("bichionline") != -1) {
	var link = 'http://www.bichionline.ru/';
} else if (location.toString().indexOf("faveladogame") != -1) {
	var link = 'http://www.faveladogame.com.br/';
}	
	
// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = "1.1.9";
var THISSCRIPTNAME = "[ALL] Pennerchat";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/79217';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/79217.user.js'; // Skript-URL bei userscripts.org

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Skript-Versionen gibt (im Abstand von checkminutes) 
// und zeigt im positiven Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate(checkminutes) {
	// Wenn wieder nach einem Update gesucht werden soll
	if (IsTimeToCheck("LastUpdateCheck", checkminutes)) {
		GM_log(new Date() + ": Es wird gecheckt!");
		
		// ***********************************************************************************************
		// Abrufen der Skriptseite von userscripts.org
		// ***********************************************************************************************
		GM_xmlhttpRequest({method: 'GET', url: THISSCRIPTINSTALL_URL, onload: function(responseDetails) {

			// Wenn die Seite erfolgreich abgerufen werden konnte
			if (responseDetails.status == 200) {
				var content = responseDetails.responseText;
	
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
	
				switch (TOWNEXTENSION) {
					case "B": var keyname = 'blb'; break;
					case "HH": var keyname = 'blh'; break;
					case "MU": var keyname = 'blm'; break;
				}

				if (content.indexOf(keyname + ":") != -1) {
					var b = content.split(keyname + ":")[1].split("/" + keyname)[0];
					GM_setValue(keyname, b);
				}
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."
	
					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		}
		});
	}
}


// Position
if(GM_getValue('breite') == null){
GM_setValue('breite', '220');
}
if(GM_getValue('hoehe') == null){
GM_setValue('hoehe', '1150');
}
if(GM_getValue('scroll') == null){
GM_setValue('scroll', 'off');
}
if(GM_getValue('farberahmen') == null){
GM_setValue('farberahmen', 'orange');
}
if(GM_getValue('farbeschrift') == null){
GM_setValue('farbeschrift', 'white');
}

var body_1 = document.getElementsByTagName('body')[0];
var newtags = document.createElement('div');
newtags.setAttribute('id', 'tags');
body_1.appendChild(newtags);

// Frame und drum herum
document.getElementById('tags').innerHTML = '<div id=\"dasganze\" style="z-index:32767;border:2px solid '+GM_getValue('farberahmen')+';-moz-border-radius:10px;left:'+GM_getValue('vonseite', '1')+';top:'+GM_getValue('vonoben', '550')+';position:absolute;"><a href="http://www.pennertools.com/script.html" target="_blank" title="Pennerchat namespace" style="color:'+GM_getValue('farbeschrift')+'"><b><font size="3" face="Comic Sans Ms,Verdana"><center>Pennerchat</center></font></b></a><br><br><center><iframe src="http://penner-chat.de/" style="border:0px #FFFFFF; -moz-border-radius: 10px;" name="Chatframe" scrolling="'+GM_getValue('scroll')+'" height="'+GM_getValue('hoehe')+'" width="'+GM_getValue('breite')+'"></iframe><br> <br> <br><input type="button" id="setting" value="[Einstellungen]"></center><br><div id="settingbereich"></div></div>';
document.getElementById('dasganze').style.backgroundColor = "#000000";

// Settingbereich
document.getElementById('setting').addEventListener('click', function settingoeffnen(){
var settingbereich = document.getElementById('settingbereich');
settingbereich.innerHTML = ' <center><span style="color:'+GM_getValue('farbeschrift')+'"><br><table> '
+'<tr><td>Breite (px): </td><td><input type="text" size="2" id="breite" value="'+GM_getValue('breite')+'"></td></tr>'
+'<tr><td><br> H&ouml;he (px): </td><td><input type="text" size="2" id="hoehe" value="'+GM_getValue('hoehe')+'"></td></tr>'
+'<tr><td><br> Scroll: </td><td><input type="text" size="2" id="scroll" value="'+GM_getValue('scroll')+'"></td></tr>'
	+'<font color=\"FF0000\"><tr><td><br>Farbe des Rahmen: </td><td> </font>'

	+'<select name="farberahmen">'
	+'<option style="color: red; background-color: rgb(250, 250, 250);" value="red" class="genmed">Rot</option>'
	+'<option style="color: OrangeRed; background-color: rgb(250, 250, 250);" value="#FF4500" class="genmed">Orange Red</option>'
	+'<option style="color: grey20; background-color: rgb(250, 250, 250);" value="#333333" class="genmed">Pennergame User Profil Grau</option>'
	+'<option style="color: grey12; background-color: rgb(250, 250, 250);" value="#1F1F1F" class="genmed">Pennergame Banden Profil Grau</option>'
	+'<option style="color: darkred; background-color: rgb(250, 250, 250);" value="darkred" class="genmed">Dunkelrot</option>'
	+'<option style="color: orange; background-color: rgb(250, 250, 250);" value="orange" class="genmed">Orange</option>'
	+'<option style="color: brown; background-color: rgb(250, 250, 250);" value="brown" class="genmed">Braun</option>'
	+'<option style="color: yellow; background-color: rgb(250, 250, 250);" value="yellow" class="genmed">Gelb</option>'
	+'<option style="color: green; background-color: rgb(250, 250, 250);" value="green" class="genmed">Gruen</option>'
	+'<option style="color: olive; background-color: rgb(250, 250, 250);" value="olive" class="genmed">Oliv</option>'
	+'<option style="color: cyan; background-color: rgb(250, 250, 250);" value="cyan" class="genmed">Cyan</option>'
	+'<option style="color: blue; background-color: rgb(250, 250, 250);" value="blue" class="genmed">Blau</option>'
	+'<option style="color: darkblue; background-color: rgb(250, 250, 250);" value="darkblue" class="genmed">Dunkelblau</option>'
	+'<option style="color: indigo; background-color: rgb(250, 250, 250);" value="indigo" class="genmed">Indigo</option>'
	+'<option style="color: violet; background-color: rgb(250, 250, 250);" value="violet" class="genmed">Violett</option>'
	+'<option style="color: white; background-color: rgb(250, 250, 250);" value="white" class="genmed">Weiß</option>'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="black" class="genmed">Schwarz</option>'
	+'</select>'
		+'<font color=\"FF0000\"><tr><td><br>Farbe der Schrift:</td><td> </font>'

	+'<select name="farbeschrift">'
	+'<option style="color: white; background-color: rgb(250, 250, 250);" value="white" class="genmed">Weiß</option>'
	+'<option style="color: red; background-color: rgb(250, 250, 250);" value="red" class="genmed">Rot</option>'
	+'<option style="color: OrangeRed; background-color: rgb(250, 250, 250);" value="#FF4500" class="genmed">Orange Red</option>'
	+'<option style="color: grey20; background-color: rgb(250, 250, 250);" value="#333333" class="genmed">Pennergame User Profil Grau</option>'
	+'<option style="color: grey12; background-color: rgb(250, 250, 250);" value="#1F1F1F" class="genmed">Pennergame Banden Profil Grau</option>'
	+'<option style="color: darkred; background-color: rgb(250, 250, 250);" value="darkred" class="genmed">Dunkelrot</option>'
	+'<option style="color: orange; background-color: rgb(250, 250, 250);" value="orange" class="genmed">Orange</option>'
	+'<option style="color: brown; background-color: rgb(250, 250, 250);" value="brown" class="genmed">Braun</option>'
	+'<option style="color: yellow; background-color: rgb(250, 250, 250);" value="yellow" class="genmed">Gelb</option>'
	+'<option style="color: green; background-color: rgb(250, 250, 250);" value="green" class="genmed">Gruen</option>'
	+'<option style="color: olive; background-color: rgb(250, 250, 250);" value="olive" class="genmed">Oliv</option>'
	+'<option style="color: cyan; background-color: rgb(250, 250, 250);" value="cyan" class="genmed">Cyan</option>'
	+'<option style="color: blue; background-color: rgb(250, 250, 250);" value="blue" class="genmed">Blau</option>'
	+'<option style="color: darkblue; background-color: rgb(250, 250, 250);" value="darkblue" class="genmed">Dunkelblau</option>'
	+'<option style="color: indigo; background-color: rgb(250, 250, 250);" value="indigo" class="genmed">Indigo</option>'
	+'<option style="color: violet; background-color: rgb(250, 250, 250);" value="violet" class="genmed">Violett</option>'
	+'<option style="color: black; background-color: rgb(250, 250, 250);" value="black" class="genmed">Schwarz</option>'
	+'</select>'
+'</td></tr></table><br> <br> <br>1 centimeter (cm) = 28 pixel (px)<br> <br>Scroll on = Scrollleiste erscheint <br> Scroll off = Scrollleiste entfernt (Standard) <br> Scrolleiste ist gut, wenn die Chat H&ouml;he niedrig eingestellt wurde <br> <br> <br>'
+'<input type="button" id="speichern" value="[Speichern]"><br> <br><br>'
+'Der Chat reloadet sich regelm&auml;ßig selbst.<br> Du brauchst kein Passwort, den das Script erkennt deinen Namen und deine ID und ist missbrauch sicher. <br> Du musst dich nicht ausloggen, den sobald du eine Seite von Pennergame verläst bist du ausgeloggt. <br> Bei Fragen schreibe bitte eine E-Mail an <a href="mailto:fragen@pennertools.com">fragen@pennertools.com</a><br> <br>'
+'Dein Pennergame Account ist unter diesem Link: '+link+'<br> und mit dem Namen '+name+' im Penner-Chat angemeldet. <br>Dein Profillink lautet: <a href='+link+'profil/id:'+id+'/>'+link+'profil/id:'+id+'/</a>'
+'<br></span></center><br>';
document.getElementById('speichern').addEventListener('click', function speichern(){
GM_setValue('breite', document.getElementById('breite').value);
GM_setValue('hoehe', document.getElementById('hoehe').value);
GM_setValue('scroll', document.getElementById('scroll').value);
GM_setValue("farberahmen", document.getElementsByName("farberahmen")[0].value);
GM_setValue("farbeschrift", document.getElementsByName("farbeschrift")[0].value);
location.reload()
},false);

},false);

// Splitet deine id aus dem Avatar und deinen Namen
var body = document.getElementsByTagName('body')[0].innerHTML;
var id = body.split('/avatare/')[1].split('_small.jpg')[0];
var name = document.getElementById('my-profile').innerHTML.split('">')[4].split('</a>')[0];

// Loggt dich ein
document.getElementById('useronline').innerHTML = '<iframe src="http://penner-chat.de/login.php?name='+name+'&id='+id+'&link='+link+'" name="chatlogin" scrolling="no" frameborder="0" height="0" width="0"></iframe>';



document.getElementById('dasganze').addEventListener('dblclick', function(mouseEvent){		//alles verschieben mit dblclick
	var objDrag = document.getElementById('dasganze');
	var oldX = mouseEvent.pageX;
	var oldY = mouseEvent.pageY;
	var objX = objDrag.offsetLeft;
	var objY = objDrag.offsetTop;
	var newX = 0;
	var newY = 0;
	var move = function (mouseEvent){
		newX = mouseEvent.pageX;
		newY = mouseEvent.pageY;
		objDrag.style.left = (objX + newX - oldX) + 'px';
		objDrag.style.top = (objY + newY - oldY) + 'px';
	}
	document.body.addEventListener('mousemove', move, true);
	objDrag.addEventListener('click', function (){		//aktuelle position speichern
		document.body.removeEventListener('mousemove', move, true);
		objDrag.style.cursor = 'auto';
		if (newX != 0 || newY != 0){
			GM_setValue('vonseite',(objX + newX - oldX)+'px'); 
			GM_setValue('vonoben',(objY + newY - oldY)+'px'); 
			
		}
	},false);
	objDrag.style.cursor = 'move';
}, false);


// Copyright (c) by Javan_xD @ Pennertools.com
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.