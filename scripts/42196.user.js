// Copyright (c) 2009, Micah Wittman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1.1 : 2009-02-10
//   Link text replaced with "... " for cleaner display
//
// Version 0.1   : 2009-02-10
// - Adds images (inserts an img element in DOM) into comments next to link text of URIs with an image 
//   extension.
//
//
// Description:
// - Adds images (inserts an img element in DOM) into FriendFeed comments next to link text of URIs with an
//   image extension (and replaces text with '... ').
//
//   Example:
//
//   <a href="cool.gif">cool graphic!<a>
//
//   becomes
//
//   <a href="cool.gif">... <img src="cool.gif" height="100px" style="vertical-align:middle" /><a>
//
// Contact: web:   http://wittman.org/about/
//          email: userscript.m [a][t] wittman.org
//
// ==UserScript==
// @name           friendfeedCommentImg
// @namespace      http://userscripts.org/users/80395
// @description    Adds images into FF comments next to link text of URIs with an image extension.
// @include        http://friendfeed.com/*
// @version        0.1.1
// ==/UserScript==

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}

GM_wait();

function letsJQuery() 
{
	var a = $('.comment .content > a');
	a.each(function(){
		var imgUrls = new RegExp(/[^\(]+\.(gif|jpg|jpeg|png)/g);
		var href = this.href.toLowerCase();
		if( href.match(imgUrls) ){
			$(this).empty().prepend('...').append(' <img src="' + this.href + '" height="100px" style="vertical-align:middle" />');
		}
	});
}