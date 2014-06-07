// ==UserScript==
// @name        TheOldReaderCleanup
// @description Remove unwanted elements and make The Older Reader more compact.
// @namespace   www.crewstopia.com
// @include     http://theoldreader.com/*
// @version     0.1
// ==/UserScript==

GM_log("TheOldReaderCleanup starting...");
//window.alert('TheOldReaderCleanup starting...');

var navList = document.getElementsByClassName("nav nav-list").wrappedJSObject[0];
//GM_log('navList = ' + navList);

// Remove "Trending" category.
if (navList.childNodes.length > 8)
{
	navList.removeChild(navList.childNodes[9]);
	GM_log('Removed Trending category.');
}
else
{
	GM_log('WARNING: no Trending category found to delete.');
}
// Remove "Shared" category.
if (navList.childNodes.length > 6)
{
	navList.removeChild(navList.childNodes[7]);
	GM_log('Removed Shared category.');
}
else
{
	GM_log('WARNING: no Shared category found to delete.');
}

// Make the list more compact.
GM_log('Compacting list format...');

GM_addStyle('body .post {margin-bottom:0px;font-size:10px}' + ' !important'); // "!important" overrides existing value

GM_addStyle('body .well {min-height:5px;padding:0px;margin-bottom:0px;' + ' !important'); // "!important" overrides existing value

GM_addStyle('body {line-height:12px}' + ' !important'); // "!important" overrides existing value

GM_log('TheOldReaderCleanup complete.');
//window.alert('TheOldReaderCleanup complete.');

