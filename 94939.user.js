// ==UserScript==
// @id             Sharkify
// @name           Sharkify
// @namespace      Sharkify
// @description    Redirects any track or album spotify link to a GrooveShark search for that track/album and artist
// @include        http://open.spotify.com/track/*
// @include        http://open.spotify.com/album/*
// ==/UserScript==
var metas = document.getElementsByTagName('META');
var i;
for (i = 0; i < metas.length; i++)
	if (metas[i].getAttribute('NAME') == "title")
		break;
window.location.href = "http://listen.grooveshark.com/#/search/song?q=" + metas[i].getAttribute('CONTENT');
		