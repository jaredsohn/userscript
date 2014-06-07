// ==UserScript==
// @name       Engadget Googlefier
// @version    0.2
// @description  Changes all the links that point to Engadget tags to Google searches. This is super useful when I have no idea what tech Engadget is talking about. Their articles sometimes don't really explain the technologies very well depending on what it is. 
// @match      http://*engadget.com/*
// ==/UserScript==

var aElements = document.getElementsByTagName('a');
for (var i = 0, aElement; aElement = aElements[i]; i++) {
	aElement.href = aElement.href.replace('http://www.engadget.com/tag/','http://www.google.com/search?q=');
	aEl.setAttribute('target', '_new');
}