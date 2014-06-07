// ==UserScript==
// @name Pennergame ErrorReload
// @namespace 1334769[Bande:Arschbackenhoernchen]
// @description Bei Fehlerseite 400, 404, 500, 505 wird die Seite alle 5 sec. neu geladen.
// @include http://*pennergame.de*
// @exclude http://newboard.pennergame.de/
// ==/UserScript==

//---------------------------------------------------------------------------------------------------

function neuladen() 
{
// Zufall's Zahl für Pennergame Pic ----
var zahl = Math.round(Math.random() * 5);
if (zahl ==0) 
{ 
(zahl=2);
}
// Counter -----------------------------
var interval = 5 ; //sec (Seite neu laden)
setInterval("window.location.reload();", interval * 1000);
//--------------------------------------

document.body.innerHTML =
"<style type=\"text/css\">"
+
"body { font:small sans-serif; background:#313131; }"
+
"</style>"
+
"<div style=\"color:#FFFFFF\" align=\"left\">Es ist ein Fehler aufgetreten (Fehler: "+Fehler+")</div>"
+
"<br><div align=\"center\">"
+
"<input id=\"Reload\" type=\"Button\" value=\"Reload\" onclick=\"location.reload()\" />"
+
"&nbsp;&nbsp;"
+
"<input id=\"Hauptseite\" type=\"Button\" value=\"Hauptseite\" onClick=\"self.location.href=\'http://pennergame.de\'\" />"
+
"<br><br><hr><br>"
+
"<a href=\"javascript:history.back()\"><img src=\"http:\/\/media.pennergame.de/de/img/error/500_"+zahl+".jpg\" border=\"0\" /></a>"
+
"</div>";
}

//---------------------------------------- Fehler ---------------------------------------------------

// Fehler 400 ------------------------------
if (document.title.indexOf("400") >= 0) 
{
var Fehler = ("400");
neuladen();
}

// Fehler 404 ------------------------------
if (document.title.indexOf("404") >= 0) 
{
var Fehler = ("404");
neuladen();
}

// Fehler 500 ------------------------------
if (document.title.indexOf("500") >= 0) 
{
var Fehler = ("500");
neuladen();
}

// Fehler 503 ------------------------------
if (document.body.innerHTML.indexOf("503 Service Unavailable") >= 0) 
{
var Fehler = ("503");
neuladen();
}

// Fehler 505 ------------------------------
if (document.title.indexOf("505") >= 0) 
{
var Fehler = ("505");
neuladen();
}