// ==UserScript==
// @name Test
// @namespace Xenite
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource header https://dl.getdropbox.com/u/1901586/theme2.png
// @resource title https://dl.getdropbox.com/u/1901586/2.jpg
// @resource footer https://dl.getdropbox.com/u/1901586/7.png
// @resource tab https://dl.getdropbox.com/u/1901586/6.jpg
// @resource twitter https://dl.getdropbox.com/u/1901586/5.jpg
// @resource tick https://dl.getdropbox.com/u/1901586/5.jpg
// @resource storeitem https://dl.getdropbox.com/u/1901586/3.png
// ==/UserScript==

GM_addStyle('#header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .groupblock h1, .grouphead h3, .h-forumpulse h1, .boxhead, .boxheading, #widget-shoutbox .ws-input {background-image: url(\''+GM_getResourceURL('title')+'\');} #footer {background-image: url(\''+GM_getResourceURL('footer')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter {background-image: url(\''+GM_getResourceURL('twitter')+'\');} .cba-on, .cba-off {background-image: url(\''+GM_getResourceURL('tick')+'\');} .popstorePop {background-image: url(\''+GM_getResourceURL('storeitem')+'\');} ');