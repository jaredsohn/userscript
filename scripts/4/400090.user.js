// ==UserScript==
// @name          BSN .gif Avatars Mod
// @description   Allows you to see everyone's glorious animated .gif profile photos on the new BSN forums
// @include       http://forum.bioware.com/*
// @version       2014.2.27
// @grant         none
// ==/UserScript==

var targetObject = document.body,
	imgElems = document.getElementsByTagName('img'),
	imgSrc = '';

  // Create an observer object and assign a callback function.
var observerObject = new MutationObserver(callback);

  // Register the target node to observe and specify which DOM changes to watch.
observerObject.observe(targetObject, { 
    attributes: true,
    characterData: true,
    childList: true
});

function callback() {
	setTimeout(function() {
		setGifs();
	}, 3000); // allow time for post to load before calling setGifs
}

function setGifs() {
	console.log('setgifs called');
	for (var i = 0; i < imgElems.length; i++) {
		if (imgElems[i].className.indexOf('ipsUserPhoto') !== -1 || imgElems[i].className.indexOf('user_photo') !== -1) {
			if (imgElems[i].src.indexOf('gif') !== -1) {
				imgSrc = imgElems[i].src;
				imgSrc.replace('thumb-','');
				imgElems[i].src = imgSrc.replace('thumb-','');
			}
		}
	}
}

setGifs();
