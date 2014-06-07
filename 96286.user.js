// ==UserScript==
// @name           Shortnews Ads Jumper
// @namespace      shortnews
// @description    Überspringt die Werbung die bei Shortnewsnachrichten via RSS/Twitter kommen
// @include        http://da.feedsportal.com/*
// ==/UserScript==

document.body.onload = '';
for (i=0; i<document.getElementsByTagName('a').length; i++)
	if (document.getElementsByTagName('a')[i].href.match(/^http:\/\/www\.shortnews\.de\/id\//i))
		break;

var jumper = document.getElementsByTagName('a')[i].href;
window.location.href = jumper;