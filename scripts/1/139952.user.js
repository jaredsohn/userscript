// ==UserScript==
// @name        Block Audio
// @namespace   sviesta.ciba
// @include     http://klab.lv/*
// @version     2
// @runat-at	document-start
// ==/UserScript==

var audioTags = document.getElementsByTagName('audio');
for (var i =0; i < audioTags.length; i++)
{
	audioTags[i].autoplay = "";
	audioTags[i].src = "";
	audioTags[i].parentNode.removeChild(audioTags[i]);
}

