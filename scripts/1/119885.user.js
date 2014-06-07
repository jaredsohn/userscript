// ==UserScript==
// @name           klavogonki-zen
// @namespace      klavogonki
// @include        http://*klavogonki.ru/*
// ==/UserScript==


function removeElementById(elementId) {
    parentObj = document.getElementById(elementId).parentNode;
	childObj = document.getElementById(elementId); 

	parentObj.removeChild(childObj);
}

for (elemId in ["chat-block", "play-right", "stats-block"]) {
	removeElementById(elemId);
}

