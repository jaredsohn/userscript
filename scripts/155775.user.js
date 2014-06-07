// ==UserScript==
// @name          Alle Beiträge gelesen BF-RP
// @namespace     industrial-destruction.de
// @description   Damit wird oben im mainMenu ein Icon eingebelndet, welches alle Foren als gelesen markiert.
// @include       http://breadfish-rp.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var secid = unsafeWindow.SECURITY_TOKEN;
var sid = unsafeWindow.SID_ARG_2ND;
secid=secid+sid;

$(document).ready(function() {
	$("li.last",".mainMenuInner > ul").before('<li id="mainMenuItem8"><a href="http://www.breadfish-rp.de/index.php?action=BoardMarkAllAsRead&t=='+secid+'" title="Gelesen"><img src="http://breadfish-rp.de/icon/boardMarkAsReadS.png" alt="" /> <span>Alle gelesen</span></a></li>');
});