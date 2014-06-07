// ==UserScript==
// @name           dAmnNavigator
// @namespace      DJ-Zemar
// @description    Keeps you from accidentally refreshing or closing the deviantART chat.
// @include        http://chat.deviantart.com/chat/*
// @grant          none
// ==/UserScript==

var bGreasemonkeyServiceDefined = false;

try {
	if (typeof Components.interfaces.gmIGreasemonkeyService === "object"){
		bGreasemonkeyServiceDefined = true;
	}
} catch(err) {
	//Derp
}

if ( typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined){
	unsafeWindow = (function(){
		var dummyElem = document.createElement('p');
		dummyElem.setAttribute ('onclick', 'return window;');
		return dummyElem.onclick();
	})();
}
unsafeWindow.document.title = 'Stay on page?';

unsafeWindow.onbeforeunload = confirmExit;
function confirmExit(){
  return "You have attempted to leave or refresh the deviantART Chatroom, would you like to continue?";
}