// ==UserScript==
// @name	   maga_437 google search replace url for JPLNG site
// @namespace	   Google
// @description    Redirects from mobile Google to the PC(JP) site
// @include        http://www.google.com/m?q=*client=ms-opera-mobile&channel=new 
// ==/UserScript==

var searchurl = window.location.href.replace('http://www.google.com/m?q=' , '');

searchurl  = searchurl.replace('client=ms-opera-mobile&channel=new' ,  '');

var newurl = window.location.href.replace('http://www.google.com/m?' , 'http://www.google.co.jp/search?hl=ja&newwindow=1&safe=off&site=webhp&');

newurl = newurl.replace('client=ms-opera-mobile&channel=new' ,  '#q=' + searchurl + 'hl=ja&newwindow=1&safe=off&site=&prmd=imvns&source=lnt&tbs=lr:lang_1ja&lr=lang_ja&sa=X&ei=PcxQT7XmCuWpiAeNvaTyCw&ved=0CAkQpwUoAQ&bav=on.2,or.r_gc.r_pw.,cf.osb&fp=95a4817c0439f001&biw=224&bih=356');
window.location.href = newurl;
