// ==UserScript==
// @name           Maybe JegerBook
// @namespace      worm3d
// @description    Makes JegerBook, idea by L. Zkr.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

function onload(){
	var success = resizeHtmlChat();
}

function tryBody(){
	var toSelect = 'img';
	var hasClassName = new RegExp("(?:^|\\s)" + toSelect + "(?:$|\\s)");
	var allElements = document.getElementsByTagName("*");

	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) {
		if(!hasClassName.test(element.className)){
			element.style.background = '#0050a0';
			element.style.color = '#a0a000';
		}
	}
}

function trySearch(){
	var toSelect1 = 'navSearch';
	var toSelect2 = 'inputtext';
	var toSelect3 = 'innerWrap';
	
	var allElements = document.getElementsByTagName("*");

	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) {
		var hasClassName = new RegExp("(?:^|\\s)" + toSelect1 + "(?:$|\\s)");
		if(hasClassName.test(element.className)){
			element.style.background = '#00f0f0';
			element.style.color = '#a0a000';
		}
		hasClassName = new RegExp("(?:^|\\s)" + toSelect2 + "(?:$|\\s)");
		if(hasClassName.test(element.className)){
			element.style.background = '#00f0f0';
			element.style.color = '#a0a000';
		}
		hasClassName = new RegExp("(?:^|\\s)" + toSelect3 + "(?:$|\\s)");
		if(hasClassName.test(element.className)){
			element.style.background = '#00f0f0';
			element.style.color = '#a0a000';
		}
	}
}

function back(){
	document.body.style.background = '#0050a0';
	document.body.color = '#a0a000';
}
	
function resizeHtmlChat(){
	back();
	tryBody();
	trySearch();
	return true;
}

window.addEventListener('load', onload, true);