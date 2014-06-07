// ==UserScript==
// @name          CleanSidebar
// @namespace     http://blog.arpitnext.com
// @description   Get a clean Twitter sidebar 
// @author        ArpitNext
// @version       1.1
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)with (tags[key])if (getAttribute('class') == 'bulletin yellow-box') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('class') == 'stats') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'profile') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'trends') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'following') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'rssfeed') style.display = 'none';

var tags2 = document.getElementsByTagName('p');
for (var key in tags2)with (tags2[key])if (getAttribute('class') == 'promotion round') style.display = 'none';
var tags3 = document.getElementsByTagName('li');
for (var key in tags3)with (tags3[key])if (getAttribute('id') == 'direct_messages_tab') style.display = 'none';
for (var key in tags3)with (tags3[key])if (getAttribute('id') == 'favorites_tab') style.display = 'none';


})();