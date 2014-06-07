// ==UserScript==
// @name           4chan undo
// @namespace      Aaron
// @description    undo the trollin
// @include        http://boards.4chan.org/*/*
// ==/UserScript==
if(document.location.href.indexOf('org/v/')>0){
document.evaluate( '//link[contains(@title, "Yotsuba")]' , document, null, 0, null ).iterateNext().href='http://static.4chan.org/css/yotsublue.7.css';
document.title='/v/ - The Vidya';
document.getElementsByTagName('span')[4].innerHTML='/v/ - The Vidya';
var b=document.getElementsByTagName('embed')[0];
b.parentNode.removeChild(b);}
var a = document.getElementById('fb_tr');
a.parentNode.removeChild(a);