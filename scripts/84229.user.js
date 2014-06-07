// ==UserScript==
// @name           Newgrounds Pixel Dance
// @namespace      I dunno
// @description    Turns that thing at the bottom to a dancing thing (liljim made this i just am uploading it)
// @include        http://*newgrounds.com/bbs/topic/*

// ==/UserScript==

(function (arr) {
var total = arr.length;

for (var i=0; i<total; i++) {
if (arr[i].innerHTML.indexOf('thingy') !== -1) {
arr[i].innerHTML = '<img src="http://i.imgur.com/KhPXY.gif" alt="blah what" />';
break;
}
}
})(document.getElementsByClassName('noti ce'));