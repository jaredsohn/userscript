// Facebook Secure Pro
// version 1.3
// 2010-11-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script based on GMail Secure Pro version 1.1
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Facebook Secure Pro", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Secure Pro
// @description   Forces Facebook to use secure connection, except for photos and videos.
// @include       http://www.facebook.com/*
// @include       http://apps.facebook.com/*
// @include       https://www.facebook.com/*

// ==/UserScript==
//

function beginsWithStr(s1,s2)
{
return s1.slice(0,s2.length) == s2;
}


https://sphotos.ak.fbcdn.net

if (beginsWithStr(location.href,'http://www.facebook.com/') || beginsWithStr(location.href,'http://login.facebook.com/') || beginsWithStr(location.href,'http://apps.facebook.com/') || beginsWithStr(location.href,'http://sphotos.ak.fbcdn.net/')){
	document.body.innerHTML = ''
	location.href = location.href.replace(/http:/, 'https:');
}

document.body.innerHTML =  document.body.innerHTML.replace(/href=\"http:\/\/www.facebook.com/g, 'href=\"https://www.facebook.com').replace(/href=\"http:\/\/apps.facebook.com/g, 'href=\"https://apps.facebook.com');;

//
// ChangeLog
// 1.0 - 2009-05-13 - Only for http://www.facebook.com/*
// 1.1 - 2009-07-03 - Now for https://www.facebook.com/*
// 1.2 - 2009-12-30 - Now for http://apps.facebook.com/*
// 1.3 - 2010-11-08 - Now for full-size photos at http://sphotos.ak.fbcdn.net/*
