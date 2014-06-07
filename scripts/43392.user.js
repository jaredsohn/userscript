// ==UserScript==
// @name           Make Userstyles.org Screenshots Clickable
// @namespace      http://userstyles.org/users/15142
// @include        http://userstyles.org/*
// @include        http://www.userstyles.org/*
// ==/UserScript==

function addscreenlink( ) {

	// get all screenshot images
	var oldscreens = document.getElementsByClassName("screenshot");
	
	for (var i = oldscreens.length - 1; i >= 0; i--) {
		// getting info about the specific screenshot
		var oldscreen = oldscreens[i];
		var screensrc = oldscreen.src;
		var screenclasses = oldscreen.getAttribute("class");
		
		// create a parent link for the screenshot
		var newscreen = document.createElement("a");
		newscreen.setAttribute("href", screensrc);
		newscreen.setAttribute("class", "screenshot-link");
		
		// create a inner image to have it linked
		var newscreenimg = document.createElement("img");
		newscreenimg.setAttribute("src", screensrc);
		newscreenimg.setAttribute("class", screenclasses);
		newscreenimg.setAttribute("alt", "");
		
		// place the new image inside the new link
		newscreen.appendChild(newscreenimg);
		
		// replace the old screenshot image with the new link
		oldscreen.parentNode.replaceChild(newscreen, oldscreen);
	}

}

addscreenlink( );