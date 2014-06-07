// ==UserScript==
// @name Pennergame ErrorReload modified
// @namespace 1334769[Bande:Arschbackenhoernchen] edit by das_bazie
// @description Bei Fehlerseite 400, 404, 500, 505 wird die Seite alle 5 sec. neu geladen.
// @include		*pennergame.de*
// @include		*clodogame.fr*
// @include		*mendigogame.es*
// @include		*menelgame.pl*
// @include		*dossergame.co.uk*
// @include		*serserionline.com*
// @include		*bumrise.com*
// @include		*bichionline.ru*
// @include		*faveladogame.com.br*
// @exclude		*chat*
// @exclude		*board*
// @exclude  	*change_please*
// @exclude		*forum*
// @exclude     *redirect*
// @exclude     *highscore*
// ==/UserScript==

var url = document.location.href;

if (url.indexOf("http://www.pennergame")>=0) { var gamelink = "http://www.pennergame.de" }
if (url.indexOf("http://berlin.pennergame")>=0) { var gamelink = "http://berlin.pennergame.de" }
if (url.indexOf("http://muenchen.pennergame")>=0) { var gamelink = "http://muenchen.pennergame.de" }
if (url.indexOf("http://warzawa.menelgame")>=0) { var gamelink = "http://warzawa.menelgame.pl" }
if (url.indexOf("http://krakow.menelgame")>=0) { var gamelink = "http://krakow.menelgame.pl" }
if (url.indexOf("paris.clodogame")>=0) { var gamelink = "http://paris.clodogame.fr" }
if (url.indexOf("marseille.clodogame")>=0) { var gamelink = "http://marseille.clodogame.fr" }
if (url.indexOf("http://www.mendigogame")>=0) { var gamelink = "http://www.mendigogame.es" }
if (url.indexOf("http://www.dossergame")>=0) { var gamelink = "http://www.dossergame.co.uk" }
if (url.indexOf("http://www.serserionline")>=0) { var gamelink = "http://www.serserionline.com" }
if (url.indexOf("http://www.bumrise")>=0) { var gamelink = "http://www.bumrise.com" }
if (url.indexOf("http://www.faveladogame")>=0) { var gamelink = "http://www.faveladogame.com.br" }

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
"<input id=\"Hauptseite\" type=\"Button\" value=\"Hauptseite\" onClick=\"self.location.href=\""+gamelink+"\">"
+
"<br><br><hr><br>"
+
"<a href=\"javascript:history.back()\"><img src=\"http:\/\/static.pennergame.de/de/img/error/500_"+zahl+".jpg\" border=\"0\" /></a>"
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