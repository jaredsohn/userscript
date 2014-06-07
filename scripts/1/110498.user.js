// ==UserScript==
// @name           Highlight Last Chat Message
// @namespace     http://combee.net/userscripts
// @description    Turns last chat message gray when you leave the Campfire tab so you can find where you were last reading when returning.
// @include        https://*.campfirenow.com/room/*
// @version       1.1
// ==/UserScript==

GM_addStyle('table.chat tr.GMLastMessage td { background-color: #DDD !important }');

var addClassName = function(element, className) {
	if (!element.className) { 
		element.className=className;
		return;
	}
	var arr = element.className.split(' '); 
	var nameUpper = className.toUpperCase(); 
	
	for (var i=0; i<arr.length; i++) {
		if (nameUpper==arr[i].toUpperCase())
			return;
	}
	arr.push(className);
	element.className = arr.join(' ');
}

var removeClassName = function(element, className) {
	if (!element.className) {
		return;
	}
	var arr = element.className.split(' '); 
	var nameUpper = className.toUpperCase(); 
	for (var i=0; i<arr.length; i++) {
		if (nameUpper==arr[i].toUpperCase()) {
			arr.splice(i,1);
			i--;
		}
	}
	element.className = arr.join(' ');
}  

var lastChatMessage;
var highlightLastChat = function() {
	if (lastChatMessage)
		removeClassName(lastChatMessage, "GMLastMessage");
	lastChatMessage = document.getElementById("chat").lastElementChild;
	addClassName(lastChatMessage, "GMLastMessage");
};

window.addEventListener("blur", highlightLastChat);

