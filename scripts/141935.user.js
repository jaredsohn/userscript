// ==UserScript==
// @name			reddit RES Dark mode Bar Remover
// @namespace		reddit_res_dark_mode_bar_remover
// @description		On reddit subreddits, makes the backgrounds of all submissions links/vote arrows transparent, so that the sub background can actually be seen. This will only really have any affect if you're using RES dark mode.
// @author			Korthion
// @version			1.0
// @include			http://www.reddit.com/r/*
// @exclude			http://www.reddit.com/r/*/submit*
// @exclude			http://www.reddit.com/r/*/comments/*
// @run-at			document-end
// ==/UserScript==

// Released into the public domain because the BSD-3 clause license would be bigger than the actual code.
// Tested on Opera 12, Firefox 14, Chrome 21.

{

function genStyleSheet(id)
{
	var style_sheet = document.createElement('style');
	style_sheet.id = id;
	document.getElementsByTagName('head')[0].appendChild(style_sheet);
	return style_sheet;
}

genStyleSheet("reddit_res_dark_mode_bar_remover").innerHTML = "div#siteTable div.thing { background-color: transparent !important; } .link .midcol .arrow.up, .link .midcol .arrow.up:hover, .link .midcol .arrow.upmod, .link .midcol .arrow.down, .link .midcol .arrow.down:hover, .link .midcol .arrow.downmod { background-color: transparent !important; }";

}