// ==UserScript==
// @name           Hide Israel Reddit Submissions
// @namespace      Israelreddit
// @description    Hides all stories with "Israel" (and other related terms) in the headline
// @include        http://*reddit.com/*
// ==/UserScript==
var alinks = document.getElementsByTagName('a');
for (var i = 0; i < alinks.length; i++) {
	var element = alinks[i];
	if (/title/.test(element.id) && (/Israel/i.test(element.innerHTML) || /IDF/i.test(element.innerHTML) || /Israeli/i.test(element.innerHTML) || 

/Israelis/i.test(element.innerHTML))) {
		element.parentNode.parentNode.parentNode.style.display = 'none';