// ==UserScript==
// @name           ImageReverb Full Image
// @namespace      imagereverb.tools
// @description    Open the full image from image reverb
// @include        http://www.imagereverb.com*
// ==/UserScript==

if (document.getElementById('picture'))
{
	document.location = document.getElementById('picture').src;
}