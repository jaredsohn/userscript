// Reddit Secure Pro
// version 1.0
// 2010-09-23
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script based on Facebook Secure Pro,
// which was based on GMail Secure Pro version 1.1
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Reddit Secure Pro", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Reddit Secure Pro
// @description   Forces Reddit to use secure connection, except for photos and videos.
// @include       http://www.reddit.com/*
// @include       http://www.redditmedia.com/*
// @include       https://www.reddit.com/*

// ==/UserScript==
//

function beginsWithStr(s1,s2)
{
return s1.slice(0,s2.length) == s2;
}


if (beginsWithStr(location.href,'http://www.reddit.com/') || beginsWithStr(location.href,'http://www.redditmedia.com/')){
	document.body.innerHTML = ''
	location.href = location.href.replace(/http:/, 'https:');
}

document.body.innerHTML =  document.body.innerHTML.replace(/href=\"http:\/\/www.reddit.com//g, 'href=\"https://www.reddit.com/').replace(/href=\"http:\/\/www.redditmedia.com/g, 'href=\"https://www.redditmedia.com.com');;

//
// ChangeLog
// 