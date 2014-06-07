// ==UserScript==
// @name          Twitter ReadMode
// @namespace     http://blog.arpitnext.com
// @description   Twitter in "Read Mode", write mode disabled. 
// @author        ArpitNext
// @version       0.1
// @include       http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)with (tags[key])if (getAttribute('class') == 'stats') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'status_update_box') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('class') == 'bar') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'profile') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('class') == 'retweet-feedback') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'following') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'rssfeed') style.display = 'none';


var tags2 = document.getElementsByTagName('p');
for (var key in tags2)with (tags2[key])if (getAttribute('class') == 'promotion round') style.display = 'none';

})();