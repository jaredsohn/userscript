// ==UserScript==
// @name Kate Winslet Theme
// @namespace http://www.orkut.com/Profile.aspx?uid=8086585426266322848
// @description Every night in my dreams...
// @include http://www.orkut.com/*
// @author Supriya[http://www.orkut.com/Profile.aspx?uid=8086585426266322848]
// ==/UserScript==

/*made for my personal use*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://tyagi.supriya.tyagi.googlepages.com/lol.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/