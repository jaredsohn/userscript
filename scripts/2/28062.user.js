// ==UserScript==
// @name BetterBigButtsTV
// @namespace      http://bigbutts.tv/view/

// @description Makes content bigger and removes logo
// @include http://bigbutts.tv/view/*

// ==/UserScript==

// CHANGELOG
// v0.2 make video bigger, remove video logo

function improveVideo()
{
	var vidtag = document.getElementsByTagName('embed')[0];
	if(!vidtag) return;
	var flashvars = vidtag.getAttribute('flashvars');
	flashvars = flashvars.replace('&logo=http://bigbutts.tv/templates/images/watermark.gif', '');
	flashvars = flashvars.replace('width=425&height=350&displayheight=330','height=500&width=640&displayheight=480');
	var newtag = document.createElement('embed');
	newtag.src = vidtag.src;
	newtag.setAttribute('width', '640');
	newtag.setAttribute('height', '500');
	newtag.setAttribute('allowscriptaccess', 'always');
	newtag.setAttribute('allowfullscreen', 'true');
	newtag.setAttribute('flashvars', flashvars);
	vidtag.parentNode.replaceChild(newtag, vidtag);
}

improveVideo();

