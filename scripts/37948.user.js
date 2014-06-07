// ==UserScript==
// @name			LAU Websense & FreeGate
// @author			ROX
// @namespace		http://www.Rachini.com
// @description		LAU Websense & FreeGate
// ==/UserScript==

//var BADURL = "http://192.168.104.211:15871";
//var CURL = content.document.location.href;
if (content.document.location.href.match("http://192.168.104.211:15871")){
	var PREURL = "http://127.0.0.1:8580/loc/redirect.php?pm=y&URL=";
	var BLKURL = document.getElementById("UrlText");
	var PSTURL = "&groovybtn1=Anonymous+Surfing";
	var NEWURL = PREURL + BLKURL.innerHTML + PSTURL;
	content.document.location.replace(NEWURL);
}