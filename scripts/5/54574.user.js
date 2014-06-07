// ==UserScript==
// @name           Hide x264-bb Poster Details
// @namespace      http://userscripts.org/users/100459
// @description    Hide x264-bb Poster Details
// @include        http://*x264-bb.*
// ==/UserScript==


(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)
with (tags[key])
if (getAttribute('class') == 'postbittop') style.display = 'none';
})();