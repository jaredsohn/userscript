// ==UserScript==
// @name           chessmail autoreload
// @namespace      http://userscripts.org/users/66259/scripts
// @description    Script reloads chessmail.de game_list every 10 minutes
// @description    http://www.chessmail.info/cmwiki/index.php/Chessmail_Autoreload
// @include        http://www.chessmail.de/
// @include        http://www.chessmail.de/game_list*
// @include        http://www.chessmail.de/forumboards.do
// ==/UserScript==
//
// 10 Minuten
// Bitte nicht weniger einstellen, da sonst der Chessmailserver überlastet!
// ==========================================================================
var interval = 1000*60*10;
//
// Setzen des Reload intervals
// NEU: Relaod lädt jetzt die Forum Seite
// ==========================================================================
window.gm_auto_reload = window.setTimeout("location.href='http://www.chessmail.de/forumboards.do';", interval);
//
// Suchen der offenen Spiele im linken Frame
// ==========================================================================
var allDivs = document.evaluate("//div[@class='menuarea']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var thisDiv = allDivs.snapshotItem(1).innerHTML;
var tueck = thisDiv.split("<br>")[0].split("</a>");
//
// Anzahl auswerten
// ==========================================================================
if (tueck[1]) {
//
// Es gibt offene Spiele - icon setzen - Title ändern
// ==========================================================================
	var fav = document.createElement('link');
	fav.setAttribute('rel','shortcut icon');
	fav.setAttribute('href','http://home.arcor.de/me36835/sub/favicon.ico');
	document.getElementsByTagName('head')[0].appendChild(fav);
	if (tueck[1] == "(1)") {
		document.title =tueck[1]+" Spiel wartet auf Dich";
	} else {
		document.title =tueck[1]+" Spiele warten auf Dich";
	}
} else {
//
// Es gibt kein offenen Spiele - Zeit ermitteln - Title ändern
// ==========================================================================
	var curDate = new Date();
	var curHour = curDate.getHours();
	var curMin = curDate.getMinutes();
// alert("time = "+curHour+":"+curMin);
	document.title =curHour+":"+(curMin < 10 ? "0" + curMin : curMin)+" "+document.title;
}
//
// Fußnote an die HTML Seite anhängen
// ==========================================================================
document.body.innerHTML = document.body.innerHTML.replace('Nutzungsbedingungen</a>','Nutzungsbedingungen</a></td></tr><tr><td id="footer" colspan="2" style="color: #0033FF; font-size: 11px; font-weight: normal;">Greasemonkey script <a style="text-decoration: underline;color: #0033FF; font-size: 11px; font-weight: normal;" href="http://userscripts.org/scripts/show/52980" target="_blank">chessmail autoreload</a> Version 1.04');