// ==UserScript==
// @name           4chan !dem numbers
// @namespace      datass
// @description    Brings back 4chan's post numbers
// @include        http://boards.4chan.org/*
// ==/UserScript==
/*global document */
/*members innerHTML, className, getAttribute, match, split, getElementsByTagName, length*/
'use strict';
var links = document.getElementsByTagName('a');
var html = '';
var href = '';
for (var a = 0; a < links.length; a += 1)
{
	
	if (links[a].className === 'quotejs' && (href = links[a].getAttribute('href')) && (links[a].innerHTML.match(/\d+XXX$/)))
	{
		links[a].innerHTML = (href.match(/#q\d+/) ? href.split(/(#q)(\d+)/)[2] : ((href.match(/javascript:quote\('(\d+)'\)/)) ? href.split(/javascript:quote\('(\d+)'\)/)[1]:''));
	}
}