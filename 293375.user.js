// ==UserScript==
// @name          alles gelesen,samp
// @namespace     absolut-fair.com
// @description   http://forum.sa-mp.de/off-topic/smalltalk/p1269416-smalltalk/#post1269416
// @include       http://forum.sa-mp.de/*
// @include       https://forum.sa-mp.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var secid = unsafeWindow.SECURITY_TOKEN;
var sid = unsafeWindow.SID_ARG_2ND;
secid=secid+sid;

$(document).ready(function() {
	$("li.last",".mainMenuInner").before('<li id="mainMenuItem3"><a href="http://forum.sa-mp.de/index.php?action=BoardMarkAllAsRead&t='+secid+'" title="Gelesen"><img src="http://forum.sa-mp.de/icon/boardMarkAsReadS.png" alt="" /> <span>Alles gelesen</span></a></li>');
});