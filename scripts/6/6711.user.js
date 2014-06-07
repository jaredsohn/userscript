// ==UserScript==
// @name          Make Standards Compliant: Google Video
// @namespace     http://rolandog.com/
// @description   Replaces the HTML code in the text area with a more standards-compliant version.
// @include       *video.google.tld/videoplay*
// ==/UserScript==

window.addEventListener("load",function(){
	var o=document.createElement("script");
	o.type="text/javascript";
	o.src="http://rolandog.com/js/comply.js";
	document.body.appendChild(o);
},false);