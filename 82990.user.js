// ==UserScript==
// @name           Blacklist Site Blocker
// @namespace      Site Blocker
// @include        *
// @author         0nk3lb3rt0
// @description    Allows you to set a list of keywords in lower case to block automatically
// ==/UserScript==

BadWordList = new Array("word1","word2","word3","word4");
var locc = window.location.href.toLowerCase();
for (var i in BadWordList) {
	if (locc.indexOf(BadWordList[i])>-1)
		document.body.innerHTML = "<h1>This site has been blocked!</h1>";
}