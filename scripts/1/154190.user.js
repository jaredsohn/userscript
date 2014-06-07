// ==UserScript==
// @name          Remove Youtube Guide
// @author        Noend11
// @description   Removes the YouTube guide. (only from watch pages)
// @include       http://*.youtube.com/watch*
// @include       https://*.youtube.com/watch*
// @version       1.01
// @grant         none
// ==/UserScript==

function stopGuide()
{
	var z = document.getElementById("guide-container");
		z.parentNode.removeChild(z);
}

var x=setInterval(function(){stopGuide()},100);
		setTimeout(function(){clearInterval(x)},6000);
