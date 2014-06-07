// ==UserScript==
// @name MY FIRST THEME
// @namespace http://www.orkut.co.in/Profile.aspx?uid=13784730424132597958
// @description LETS C IF THIS WORKS...!
// @include http://www.orkut.com/*
// @author RUDE[http://www.orkut.co.in/Profile.aspx?uid=13784730424132597958]
// ==/UserScript==

/*made for my personal use*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://rudeduderocks.googlepages.com/rude.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/