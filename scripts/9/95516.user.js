// ==UserScript==
// @name           Telegraph top banner removal
// @namespace      http://userscripts.org/users/lorriman
// @description    Removes the annoying top banner from www.telegraph.co.uk
// @include        *.telegraph.co.uk/*
// @include        http://www.telegraph.co.uk*
// @match          http://www.telegraph.co.uk/*
// @include        http://blogs.telegraph.co.uk*
// @match          http://blogs.telegraph.co.uk/*
// @grant          none
// @version        1.2
// ==/UserScript==

if(item=document.getElementById('tmglBannerAd')){
	item.parentNode.removeChild(item)
}

if(item=document.getElementById('header-leaderboard')){
	item.parentNode.removeChild(item)
}

if(item=document.getElementById('tmgMenu-z1')){
	item.parentNode.removeChild(item)
}
