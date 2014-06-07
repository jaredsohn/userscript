// ==UserScript==
// @name		Konachan: Multicolored Image Borders
// @namespace	Zolxys
// @description	Shows multicolored borders on thumbnails when more than one color is applicable.
// @include	http://konachan.com/post
// @include	http://konachan.com/post?*
// @include	http://konachan.com/user/show/*
// @include	http://konachan.com/post/similar*
// @include	http://konachan.com/wiki/show*
// @include	http://konachan.com/pool/show/*
// @include	http://konachan.net/post
// @include	http://konachan.net/post?*
// @include	http://konachan.net/user/show/*
// @include	http://konachan.net/post/similar*
// @include	http://konachan.net/wiki/show*
// @include	http://konachan.net/pool/show/*
// @version	1.2
// ==/UserScript==
var ss = document.styleSheets[document.styleSheets.length - 1];
ss.insertRule('img.has-children {border-top: 3px solid #00FF00;}', ss.cssRules.length);
ss.insertRule('img.has-parent {border-top: 3px solid #CCCC00; border-right: 3px solid #CCCC00; border-left: 3px solid #CCCC00;}', ss.cssRules.length);
ss.insertRule('img.has-children {border-left: 3px solid #00FF00; border-bottom: 3px solid #00FF00;}', ss.cssRules.length);
ss.insertRule('img.flagged {border-right: 3px solid #FF0000; border-bottom: 3px solid #FF0000;}', ss.cssRules.length);
ss.insertRule('img.pending {border-right: 3px solid #0000FF; border-bottom: 3px solid #0000FF;}', ss.cssRules.length);
