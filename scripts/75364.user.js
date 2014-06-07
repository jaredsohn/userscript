// ==UserScript==
// @name              Stadtswitch Pennergame 4.0 Berlin + Hamburg + Muenchen
// @namespace     Grundversion: 11235813[Kuestenpenner] modifiziert von niceguy0815
// @description      Zeigt rechts unter dem Shop Button einen Stadswitsch an. Womit man  mit einen klick die Stadt wechseln kann. Fuer Hamburg Berlin und Muenchen.
// @include           http://*.pennergame.de*
// @exclude           http://*.pennergame.de/redirect/?site=*
// @exclude           http://newboard.pennergame.de
// @version           1.0.8 Bilder Links geändert
// @version           1.0.7 jetzt auch Hamburg reloaded 2 Klamer vergessen 
// @version           1.0.5  angepasst wegen änderungen auf PG Seiten
// @version           1.0.4  Bug in Koel gefixt falscher link zu muenchen 
// @version           1.0.3  jetzt auch Koeln mit funktionierenden Zeiten im header
// @version           1.0.2  jetzt auch Koeln
// @version           1.0.1  Hamburg Berlin Muenchen
// ==/UserScript==

// ***********************************************************************************************
// ***********************************************************************************************
//--------------Update Funktion by Sageo----natuerlich mit seiner Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "1.0.8";
var THISSCRIPTNAME = "Stadtswitch Pennergame 4.0 Berlin + Hamburg + Muenchen";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/75364';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/75364.user.js'; // Skript-URL bei userscripts.org

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = "";
	var month = "";
	var day = "";

	year = DateToFormat.getFullYear();
	month = DateToFormat.getMonth() + 1;
	month = "0" + month;
	if (month.length == 3) { 
		month = month.substr(1,2);
	}
	day = "0" + DateToFormat.getDate();
	if (day.length == 3) {
		day = day.substr(1,2);
	}

	return year + "-" + month + "-" + day;
}


// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion �berpr�ft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
// Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate() {
	// Aktuelles Tagesdatum erzeugen und formatieren
	var today = new Date();
	var tagesdatum = FormatDate(today);

	// Wenn heute noch nicht nach einem Skript-Update gesucht wurde	
	if (GM_getValue("LastScriptUpdateCheck","") != tagesdatum) {
		// Abrufen der Skriptseite von userscripts.org
		GM_xmlhttpRequest({
			method: 'GET', 
			url: THISSCRIPTINSTALL_URL, 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
								
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlie&szlig;end durchgef&uuml;hrt werden.\n\nHinweis: Die &uuml;berpr&uuml;fung auf neue Versionen wird nur einmal pro Tag durchgef&uuml;hrt."

					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu erm&ouml;glichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgef&uuml;hrt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

CheckForUpdate();

// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende----------------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************

var hoch = '94';
var breit = '15';
var picgroese ='height="18" width="30"';

//'+picgroese+'
//'+picwidth+'
//  HH Reloded Bild http://i56.tinypic.com/2zoksqo.jpg

var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/info_images/muenchen_wappen-large-2.png" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}

if (url.indexOf("http://pennergame")>=0) {
var gamelink = "http://pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/info_images/muenchen_wappen-large-2.png" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}

if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" border="0" '+picgroese+'></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/info_images/muenchen_wappen-large-2.png" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}

if (url.indexOf("http://www.berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" '+picgroese+' width="35"></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/info_images/muenchen_wappen-large-2.png" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}

if (url.indexOf("http://koeln")>=0) {
var gamelink = "http://koeln.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><br><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" border="0" h'+picgroese+'></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/muenchen_wappen-large.png" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}
if (url.indexOf("http://www.koeln")>=0) {
var gamelink = "http://www.koeln.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" border="0" '+picgroese+'></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/info_images/muenchen_wappen-large-2.png" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}
if (url.indexOf("http://muenchen")>=0) {
var gamelink = "http://muenchen.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><br><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}

if (url.indexOf("http://www.muenchen")>=0) {
var gamelink = "http://www.muenchen.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><br><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a><br><a href="http://reloaded.pennergame.de/overview/" title="Pennergame Hamburg Reloaded"><img src="http://i56.tinypic.com/2zoksqo.jpg" border="0" '+picgroese+'></a></div>';
}

if (url.indexOf("http://reloaded")>=0) {
var gamelink = "http://reloaded.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><br><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" border="0" h'+picgroese+'></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/info_images/muenchen_wappen-large-2.png" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a></div>';
}

if (url.indexOf("http://www.reloaded")>=0) {
var gamelink = "http://www.reloaded.pennergame.de"
document.getElementById("topmenu").innerHTML += '<div style="position:absolute; top:'+hoch+'px; right:'+breit+'px; padding:0px; margin-left:90px;"><a href="http://berlin.pennergame.de/overview/" title="Pennergame Berlin"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/berlin-dienstflagge-flaggen-60-x-90-cm-large.jpg" border="0" '+picgroese+'></a><a href="http://www.pennergame.de/overview/" title="Pennergame Hamburg"><img src="http://www.flaggenparadies.de/images/product_images/popup_images/hamburg-large-2.jpg" border="0" '+picgroese+'></a><br><a href="http://muenchen.pennergame.de/overview/" title="Pennergame M&uuml;nchen"><img src="http://www.flaggenparadies.de/images/product_images/info_images/muenchen_wappen-large-2.png" border="0" '+picgroese+'></a><br><a href="http://koeln.pennergame.de/overview/" title="Pennergame K&ouml;ln"><img src="http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif" border="0" '+picgroese+'></a></div>';
}
// http://www.flaggenparadies.de/images/product_images/info_images/koeln-stockflagge-large.gif
