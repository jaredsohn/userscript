// ==UserScript==
// @name           Gyazo Purifier
// @description    Removes all except the image from the gyazo.com screenshot page.
// @version        1.0.5
// @author         Neris Ereptoris (www.neris.ws)
// @namespace      http://neris.ws/GyazoPurifier
// @match          http://gyazo.com/*
// @include        http://gyazo.com/*
// @uso:script     113464
// @scriptsource   http://userscripts.org/scripts/show/113464
// ==/UserScript==

if (location.href.match(/gyazo.com\/[0-9a-f]{32}$/)) {

	var image = document.getElementById("gyazo_img");
	document.body.innerHTML = "";
	document.body.appendChild(image);
	document.body.style.cssText = "text-align: center; padding-top: 50px; background-color: gray;";
	image.style.cssText = "float: none; box-shadow: 0pt 0pt 15px black;";
}
