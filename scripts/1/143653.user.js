// ==UserScript==
// @name		xkcd changes
// @namespace	http://files.randomresources.org/projects/gm_misc/
// @description	Displays alt text below the comic.
// @version		2
// @include		http://xkcd.com/*
// @include		https://xkcd.com/*
// @include		http://www.xkcd.com/*
// @include		https://www.xkcd.com/*
// ==/UserScript==
//=============================================================================

a = document.getElementById('comic');
b = a.getElementsByTagName('img')[0].title;
document.body.innerHTML+='<div style="border:1px solid gray;color:gray;font-size:90%;padding:12px;position:fixed;right:0px;bottom:0px;width:300px;background:white;">'+b+'</div>';