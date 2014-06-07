// ==UserScript==
// @name          Hide NewTwitter Banner
// @namespace     http://blog.arpitnext.com
// @description   Removes newtwitter banner
// @author        ArpitNext
// @version       1.0
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @run-at         document-start
// ==/UserScript==


(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('class') == 'fixed-banners') style.display = 'none';
})();