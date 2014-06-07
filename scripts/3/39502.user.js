<!--
// Proboards - Change name color
//
// This script searches all
// text nodes on pages within Proboards and replaces any instances of the
// name  with whatever your heart desires.
//
// ==UserScript==
// @name              Proboards Change stuff
// @namespace     http://userscripts.org/users/76354
// @description     Replaces any instances of the words with whatever your heart desires.
// @include           *.proboards.com*
// ==/UserScript==
var pb_username == "austendale"
if (pb_username == "austendale" && (document.getElementsByTagName('textarea')[0] && (document.getElementsByTagName('textarea')[0].name == "message")))
document.getElementsByTagName('textarea')[0].value += "\n[b] [/b]";

var aLinks = document.getElementsByTagName('a');
function colorName(name,color) {
for (cn=0;cn<aLinks.length;cn++)
if (aLinks[cn].href.match(new RegExp('action=viewprofile&user='+name+'$'))) {
if (aLinks[cn].getElementsByTagName('font')[0]) {
aLinks[cn].getElementsByTagName('font')[0].style.cssText="color: #"+color+"!important;";
} else {
aLinks[cn].style.cssText="color: #"+color+"!important;";
}
}
}

colorName('bwoodruff','000080');
colorName('nhlmod','990000');
colorName('austendale','660000'); //3BB9FF
// -->
