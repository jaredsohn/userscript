// ==UserScript==
// @name           Hide x264-bb Right Pane
// @namespace      http://userscripts.org/users/100459
// @description    Hide x264-bb Right Pane
// @include        http://*x264-bb.*
// ==/UserScript==


(function () {
var tags = document.getElementsByTagName('td');
for (var key in tags)
with (tags[key])
if (getAttribute('width') == '180') style.display = 'none';
})();