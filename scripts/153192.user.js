// ==UserScript==
// @name        Google Reader NASA Image of the Day
// @description	Adds the images to Google Reader so you don't have to click the link and leave the page.
// @include     http://www.google.com/reader/view/*
// @include     https://www.google.com/reader/view/*
// @grant       none
// @version	1.0
// ==/UserScript==

/*************************************************
 This script is based on 
	- Google Reader Large Dilbert Daily Strip
		http://userscripts.org/scripts/show/26767
	- SFWImaginator
		http://www.aidansean.com/greasemonkey/sfwimaginator.user.js
		
***************************************************/

document.addEventListener("DOMNodeInserted",
	function(evt) {
		var nasaImages = document.evaluate(".//a[contains(@href, 'www.nasa.gov/images')]", evt.target, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		
		if (nasaImages) {
			var p = document.createElement('p');
			p.style.textAlign = 'center';
			p.innerHTML = '<img src="' + nasaImages.href + '" style="border:1px solid black;margin:auto"/>' ;
			nasaImages.parentNode.parentNode.appendChild(p) ;
		}
	}, false);
	