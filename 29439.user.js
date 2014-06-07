// ==UserScript==
// @name           Remember the Milk: Fat Free
// @namespace      rtm
// @description    Removes the Application header and footer from Remember the Milk
// @include        http://www.rememberthemilk.com/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('id') == 'appheader') style.display = 'none';
else if (getAttribute('class') == 'appfooter') style.display = 'none';
else if (getAttribute('id') == 'tools') style.display = 'none';
})();