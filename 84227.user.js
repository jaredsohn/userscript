// ==UserScript==
// @name           Newgrounds Pixel Dance
// @namespace      http://liljim.newgrounds.com/
// @description    Turns that thing at the bottom to a dancing thing (liljim made this i just am uploading it)
// @include        http://*newgrounds.com/bbs/*

// ==/UserScript==

(function (arr) {
var total = arr.length;

for (var i=0; i<total; i++) {
if (arr[i].innerHTML.indexOf('thingy') !== -1) {
arr[i].innerHTML = '<img src="http://i.imagehost.org/0373/Untitled-2_6.gif" />';
break;
}
}
})(document.getElementsByClassName('notice'));