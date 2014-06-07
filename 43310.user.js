// ==UserScript==
// @name           Google - SafeSearch
// @description    Google - SafeSearch: is a greasemonkey script allowing Google to automatically search safe without saving cookies (by default).
// @include        *images.google.*/images?*
// @include        *google.*/microsoft*&q=*
// @include        *google.*/linux*&q=*
// @include        *video.google.*/videosearch?*
// @include        *youtube.*/results?*
// @include        *video.google.*/videosearch?*
// @include        *google.*/microsoft
// @exclude        *google.*/*&safe=on
// @exclude        *youtube.*/*&safe=on
// @author      ScriptDeveloper | Function: JoeSimmons
// @copyright   ScriptDeveloper
// @version     1.4
// ==/UserScript==
// ==UserScript==
// @name           Google Safe Search Auto-Off
// @namespace      http://www.digivill.net/~joykillr
// @description    Auto-disable the google safe search (so as to display all results unfiltered)
// @include        http://*.google.com/*
// @include        http://google.com/*
// ==/UserScript==

var f, safeoff, homeTest;

homeTest = /(^http\:\/\/www\.google\.\w+\.?\w*\/webhp)|(^http\:\/\/www\.google\.\w+\.?\w*\/$)/i;
if(!homeTest.test(location.href)) {location.replace(location.href+'&safe=on');}
else {
f = document.evaluate("//form[@name='f']",document,null,9,null).singleNodeValue;
safeon = document.createElement('input');
with(safeon) {
type='hidden';
name='safe';
value='on';
}
f.appendChild(safeon);
}