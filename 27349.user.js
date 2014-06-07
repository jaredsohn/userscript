// ==UserScript==
// @name orkut theme of John Abraham for Riya :P
// @namespace http://www.orkut.com/Profile.aspx?uid=8086585426266322848
// @description make orkut awesome with john ;)
// @include http://www.orkut.com/*
// @author Supriya[http://www.orkut.com/Profile.aspx?uid=8086585426266322848]
// ==/UserScript==

/*made for Riya[http://www.orkut.com/Profile.aspx?uid=13460102910737941550] John being her favouite actor (-:*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://tyagi.supriya.tyagi.googlepages.com/orkut.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/