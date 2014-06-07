// ==UserScript==
// @name           LSF DejaVu Helper
// @namespace      http://userscripts.org/users/100459
// @description    k
// @include        http://littleshitfuck.com/forum/*
// ==/UserScript==


(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('id') == 'searcharea' || getAttribute('id') == 'smf-avatar' || getAttribute('id') == 'news') style.display = 'none';
})();