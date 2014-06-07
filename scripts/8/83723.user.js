// ==UserScript==
// @name           GamesTV Connect
// @namespace      gamestvreplace
// @description    Adds a connect link to the GamesTV server page. Used in combination with Sl.GameLauncher which can be downloaded from http://wiki.splatterladder.com/Sl.Gamelauncher/.
// @include        http://www.gamestv.org/server/*
// ==/UserScript==

var htmlBody = document.body.innerHTML.replace(/\s/g, "");
var start = htmlBody.indexOf("IP</td><td>")+11;
var end = htmlBody.indexOf("</td></tr><tr><tdclass=\"description\">Location</td>");
var server = htmlBody.substring(start,end);

if ((htmlBody.toLowerCase().search(/ettvserver/) != -1) || (htmlBody.toLowerCase().search(/etmatchserver/) != -1) || (htmlBody.toLowerCase().search(/ettvdbroadcaster/) != -1)) {
	document.body.innerHTML = document.body.innerHTML.replace(server,server+" [<a href=\"et://"+server+"\"><strong>Connect</strong></a>]");
} else if (htmlBody.toLowerCase().search(/shoutcastserver/) != -1) {
	document.body.innerHTML = document.body.innerHTML.replace(server,server+" [<a href=\"http://"+server.replace("http://","")+"\"><strong>Connect</strong></a>]");
}