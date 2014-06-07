// ==UserScript==
// @name           Bypass YouTube Age Censor
// @description    Injects an iframe into pages with age restricted video to bypass the censor
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @author         ...
// @updateURL      https://userscripts.org/scripts/source/153770.meta.js
// @downloadURL    https://userscripts.org/scripts/source/153770.user.js
// @version        1.1
// ==/UserScript==

if(document.getElementById('watch7-player-age-gate-content')) {
	var iframe=document.createElement('iframe');
	iframe.style.width="100%";
	iframe.style.height="100%";
	iframe.src=window.location.href.split('/watch')[0] + '/v/' + window.location.href.split('v=')[1].split('&')[0];
	var toReplace=document.getElementById('watch7-player-unavailable');
	toReplace.parentNode.replaceChild(iframe, toReplace);
}