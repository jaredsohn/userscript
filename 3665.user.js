/*
Makes Google search on Blingo.

If you haven't joined up yet, here's my invite link:
http://www.blingo.com/friends?ref=IA5nW3bNv1isiVgXsDQKW2-CvhE
*/

// ==UserScript==
// @name          Google to Blingo
// @namespace     http://NTICompass.tk
// @description	Forces a Blingo Search instead of a Google search
// @include       http://*.google.com/search*
// @include       http://*.google.com/images*
// ==/UserScript==

(function() 
{
	window.location="http://www.blingo.com"+window.location.href.substring(window.location.href.indexOf("/",8));
})();