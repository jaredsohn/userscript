// ==UserScript==
// @name           Hide PBN Feedback
// @namespace      http://userscripts.org/users/100459
// @description    Hides PBN Feedback Crap
// @include        http://www.pbnation.com/showthread.php?*
// ==/UserScript==


(function () {
var tags = document.getElementsByTagName('a');
for (var key in tags)
with (tags[key])
if (getAttribute('style') == 'color: rgb(255, 255, 255); text-decoration: none; cursor: pointer;') style.display = 'none';
})();