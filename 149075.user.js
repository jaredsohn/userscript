// ==UserScript==
// @name        Pocket_Open_Original_Links
// @namespace   com.feldschmid
// @description Opens the original instead of the pocket View!
// @include     http://getpocket.com/*
// @include     https://getpocket.com/*
// @version     3
// ==/UserScript==

function doOpen() {
	this.go = function () {
	var original = document.getElementsByClassName('original');
		if(original.length == 1) {
			var ahref = original[0].firstChild;
			window.location = ahref;
		}
	}
}
	
window.onload =  function() {
		setTimeout(function(){
			new doOpen().go();
		}, 500);
		setTimeout(function(){
			new doOpen().go();
		}, 1500);
		setTimeout(function(){
			new doOpen().go();
		}, 5000);
	}
