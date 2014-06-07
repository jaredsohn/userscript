// ==UserScript==
// @name	Yahoo! Answers Prioity Colorizer
// @namespace	http://userscripts.org/people/14536
// @description	Highlights unanswered questions and questions with one answer.
//			-Based on http://userscripts.org/scripts/show/6137 by Vaughan Chandler.
//			-Idea from http://userscripts.org/forums/2/topics/1803 by Etheesdad.
// @include	http://answers.yahoo.com/dir/*
// @version	1.1
// @author	Bleh7777
// @website	http://blockheadbleh.googlepages.com/index.html
// @license	http://sam.zoy.org/wtfpl/
// ==/UserScript==
window.addEventListener("load", function(e) {
	var elms;
	elms = getElementsByStyleClass( 'question qrownorm', 'tr' );
	for (var i=0; i<elms.length; i++) {
		if (elms[i].innerHTML.indexOf('- 1 answer')!=-1) {
			elms[i].style.padding='1px 3px'; elms[i].style.background='#ffffdd'; elms[i].style.border='1px solid #ccccaa';
		}
		else if (elms[i].innerHTML.indexOf('- 0 answers')!=-1) {
			elms[i].style.padding='1px 3px'; elms[i].style.background='#ffdddd'; elms[i].style.border='1px solid #ccaaaa';
		}
	}
	elms = getElementsByStyleClass( 'question qrowalt', 'tr' );
	for (var i=0; i<elms.length; i++) {
		if (elms[i].innerHTML.indexOf('- 1 answer')!=-1) {
			elms[i].style.padding='1px 3px'; elms[i].style.background='#f8f8d6'; elms[i].style.border='1px solid #c5c5a3';
		}
		else if (elms[i].innerHTML.indexOf('- 0 answers')!=-1) {
			elms[i].style.padding='1px 3px'; elms[i].style.background='#f8d6d6'; elms[i].style.border='1px solid #c5a3a3';
		}
	}
}, false);
function getElementsByStyleClass (className, tagName) {
	var all = document.all ? document.all : document.getElementsByTagName(tagName);
	var elements = new Array();
	for (var e = 0; e < all.length; e++)
		if (all[e].className == className)
			elements[elements.length] = all[e];
	return elements;
}