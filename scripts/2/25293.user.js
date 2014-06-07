// ==UserScript==
// @name           MotiFake Motivator
// @version        0.2
// @author         Wil Langford, userscripts@trustissues.net
// @namespace      http://fanglord.net/wiki/index.php?title=MotiFake_Motivator
// @include        http://www.motifake.com/*
// @include        http://motifake.com/*
// @include        http://www.nsfwmotifake.com/*
// @include        http://nsfwmotifake.com/*
// @description    Automatically refreshes when it encounters a SKIP SPONSOR link.  Version 0.1 included automatic NSFW viewing, but motifake split off into motifake.com and nsfwmotifake.com, so this is no longer necessary.
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
    if (links[i].text == 'SKIP SPONSOR') {
	window.location.reload();
    }
}

