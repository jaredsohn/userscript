// Svejo.NET script for redirecting svejo.net directly to source of the RSS feed
// version 0.1 BETA!
// 2010-03-15
// Copyright (c) 2010, Anton Penev
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Greasemonkey script automatically loads the source of the feed, so you don't have to click on the link by yourself
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SVEJO Auto Click
// @description   When opening the RSS feed you don't have click on the link. This will be done by the script ;)
// @include       http://svejo.net/story/*

// ==/UserScript==

	var classname = 'adds_story_view';
    node = document.getElementsByTagName("body")[0];
    
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))window.location = els[i].href;
    
