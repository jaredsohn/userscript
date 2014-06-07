// ==UserScript==
// @name beautiful_orkut
// @namespace http://www.orkut.com/Profile.aspx?uid=13540933268272576482
// @description make orkut beautiful wid ChiNX
// @include http://www.orkut.com/*
// @author ChinX[http://www.orkut.com/Profile.aspx?uid=13540933268272576482]
// ==/UserScript==

/*special thanks to prateek[http://www.orkut.com/Profile.aspx?uid=5328318125618648335] for helping me out (-:*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://chinksmod.googlepages.com/orkut.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/