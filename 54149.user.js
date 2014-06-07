// ==UserScript==
// @name           Hide What.CD Footer
// @namespace      http://userscripts.org/users/100459
// @description    Hides the What.cd footer
// @include        http*://*.what.cd/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('id') == 'footer') style.display = 'none';
})();