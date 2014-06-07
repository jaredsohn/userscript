// ==UserScript==
// @name           FlashVideo Replacer AKS
// @namespace      AKS-flash@aykevanlaethem@gmail.com
// @include        http://www.wdr.de/tv/aks/
// ==/UserScript==


var style = "position: relative; top: 0px; width: 458px; height: 286px;";

function startVideo (evt) {

	// 'this' refers to the 'video link', an html 'a' element

	/* make new player */
	var div = this.parentNode.parentNode; // videoTeaser div
	var stream = this.href; // contains the video url
	stream = stream.substring(stream.indexOf('dslSrc=')+7); // remove the start of the link
	stream = stream.substring(0, stream.indexOf('&')); // remove the end of the link
	div.innerHTML = '<object style="'+style+'" type="application/x-totem-plugin" src="'+stream+'"><param name="ShowControls" value="true"><param name="autostart" value="true" /><object type="application/x-vlc-plugin" style="'+style+'" data="'+stream+'"><param name="ShowControls" value="true"><param name="autostart" value="true" /></object></object>';
}

// all objects with videos
var divs = document.getElementsByClassName('videoTeaser');
var div;
for (var i=0; div=divs[i]; i++) {
	// like element.onclick, but better (onclick doesn't work here)
	div.childNodes[3].childNodes[1].addEventListener("click", startVideo, false);
}

