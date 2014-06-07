// ==UserScript== 

// @name Remove Ads: Grooveshark (HTML5)

// @description Removes advertisements on Grooveshark

// @namespace removeadsgrooveshark

// @author Emilio López

// @version 1.0

// @include http://listen.grooveshark.com/*

// ==/UserScript==



var removeAd = function(){

	var cap = document.getElementById("capital");



	if(cap != null)

		cap.parentNode.removeChild(cap);

}



//Remove the ads div

var main = document.getElementById("mainContainer");

main.addEventListener("DOMSubtreeModified", removeAd, true);

removeAd();



//Add some CSS to expand the app

head = document.getElementsByTagName('head')[0];

style = document.createElement('style');

style.type = 'text/css';

style.innerHTML =	'#application{margin-right: 0 !important;}';

head.appendChild(style);

