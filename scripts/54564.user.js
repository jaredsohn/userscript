// ==UserScript==
// @name           Pinkify ALL Links
// @namespace      http://userscripts.org/users/100459
// @description    hurrrrr
// @include        http*://*.what.cd/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('a');
for (var key in tags)
with (tags[key])
style.color = '#FF00CC';
})();