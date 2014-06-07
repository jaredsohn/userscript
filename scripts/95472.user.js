// ==UserScript==
// @name           Slashdot; Just the News Please
// @namespace      userscripts.org
// @description    Removes all the crap from Slashdot and expands the news section.
// @include        http://slashdot.org/*
// @include        http://*.slashdot.org/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
if (!head)
{
	return;
}

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.col_1, #slashboxes, #firehose-message-tray { display: none; } \n #firehose { margin-left: 10px;\n margin-right: 10px;}';
head.appendChild(style);
