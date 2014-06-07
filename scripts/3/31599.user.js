// Copyright (c) 2008, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// v0.1
// - first script, adds ?num=100 to friends tab
//
// v0.2
// - support for beta.friendfeed.com
//
// Contact: detect [at] hotmail [dot] com
//
// ==UserScript==
// @name           Friendfeed 100++
// @namespace      http://userscripts.org/users/44035
// @description    Changes friends tab URL to friendfeed.com/?num=100 to maximize entries per page 
// @include        http://friendfeed.com/*
// @include        http://beta.friendfeed.com/*
// @version	0.2
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
	$('#tabhead,.mainlink,#logo').find('a[href="http://'+window.location.hostname+'/"]').attr('href','/?num=100');
	$('#tabhead,.mainlink,#logo').find('a[href="/"]').attr('href','/?num=100');
}