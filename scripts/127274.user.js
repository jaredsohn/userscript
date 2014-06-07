// ==UserScript==
// @name	   maga_437 google search replace url for co.jp
// @namespace	   Google
// @description    Redirects from mobile Google to the PC.co.jp site
// @include        http://www.google.com/m?q=*client=ms-opera-mobile&channel=new 
// ==/UserScript==

var newurl = window.location.href.replace('http://www.google.com/m?' , 'http://www.google.co.jp/search?hl=ja&newwindow=1&safe=off&site=webhp&');

newurl = newurl.replace('client=ms-opera-mobile&channel=new' ,  '');
window.location.href = newurl;
