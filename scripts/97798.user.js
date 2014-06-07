// ==UserScript==
// @name           BetterShack
// @namespace      Shack
// @include       http://shacknews.com/chatty*
// @include       https://shacknews.com/chatty*
// @include       http://*.shacknews.com/chatty*
// @include       https://*.shacknews.com/chatty*
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div#container {	background-color: #000;	} ' +
				'div#chatty_intro_wrap, div#footer { display: none; } ' + 
				'.oneline_user, .user a { color: #FFBA00 !important; }' +
				'.this_user { color: #66CCFF !important; } ' +
				'div.olauthor_3259 span.oneline_user, div.olauthor_10028 span.oneline_user, div.olauthor_168479 span.oneline_user, div.olauthor_5334 span.oneline_user, div.olauthor_169489 span.oneline_user, div.olauthor_8105 span.oneline_user, div.olauthor_5278 span.oneline_user, div.olauthor_6674 span.oneline_user, div.olauthor_32016 span.oneline_user, div.olauthor_1194 span.oneline_user, div.olauthor_171402 span.oneline_user, div.olauthor_6585 span.oneline_user, div.olauthor_168256 span.oneline_user, div.olauthor_169197 span.oneline_user, div.olauthor_3243 span.oneline_user, div.olauthor_169049 span.oneline_user, div.olauthor_9085 span.oneline_user, div.olauthor_6380 span.oneline_user, div.olauthor_12398 span.oneline_user, div.olauthor_7570 span.oneline_user, div.olauthor_8316 span.oneline_user, div.olauthor_9031 span.oneline_user, div.olauthor_9211 span.oneline_user, div.olauthor_7660 span.oneline_user, div.olauthor_169927 span.oneline_user, div.olauthor_15130 span.oneline_user, div.olauthor_169942 span.oneline_user, div.olauthor_185650 span.oneline_user { color: GreenYellow !important');



