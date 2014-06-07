// ==UserScript==
// @name           Hide What.CD IRC+Staff Header Links
// @namespace      http://userscripts.org/users/100459
// @description    Hides the IRC and Staff links on the top of What.CD
// @include        http*://*.what.cd/*
// ==/UserScript==

(function () {
var tags = document.getElementsByTagName('li');
for (var key in tags)
with (tags[key])
if (getAttribute('id') == 'nav_irc' || getAttribute('id') == 'nav_staff') style.display = 'none';
})();