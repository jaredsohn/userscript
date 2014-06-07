// ==UserScript==
// @name          Hide Recommended Users
// @namespace     http://blog.arpitnext.com
// @description   Remove recommended users section on twitter.com
// @author        ArpitNext
// @version       1.0
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');

for (var key in tags)with (tags[key])if (getAttribute('id') == 'recommended_users') style.display = 'none';



})();