// ==UserScript==
// @name           Usable Online Friends
// @namespace      http://www.mcslee.com/greasemonkey/
// @description    Makes online friends usable
// @include        http://www.facebook.com/
// @include        http://www.facebook.com/*
// ==/UserScript==

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://www.mcslee.com/greasemonkey/UsableOnlineFriends.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
