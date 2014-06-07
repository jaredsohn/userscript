// Reddit Imgur Links
// Copyright (c) 2011, Michael Kaufman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name		Reddit Imgur Links
// @namespace	http://twitter.com/mikeontv
// @description Removes all content except for links on the reddit imgur feed..
// @version		0.0.1
// @date		2011-09-06
// @creator		Michael Kaufman
// @include 	*reddit.com/domain/imgur.com/*


// ==/UserScript==
// Shouldn't be bugs because it's so simple. Please let me know if you need changes
GM_addStyle(
	"a:visited {display:none;visibility:hidden;height:0px;}\
	.thumbnail {display:none;visibility:hidden;height:0px;}\
	.rank {display:none;visibility:hidden;height:0px;}\
	.midcol {display:none;visibility:hidden;height:0px;}\
	.domain {display:none;visibility:hidden;height:0px;}\
	.tagline {display:none;visibility:hidden;height:0px;}\
	.link {font-size:3px!important;padding:0!important; margin:0!important}\
	.flat-list {display:none;visibility:hidden;height:0px;}"
);