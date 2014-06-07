// ==UserScript==
// @name           ptr_darkut version 2
// @namespace      http://www.orkut.com/Community.aspx?cmm=39756670
// @description    orkut dark version by мαiπ Åišα κŷμππ нΘΘπ (-;
// @include        http://www.orkut.com/*
// @author         мαiπ Åišα κŷμππ нΘΘπ[http://www.orkut.com/Profile.aspx?uid=16095185957008117508]
// ==/UserScript==

/*special thanks to мαiπ Åišα κŷμππ нΘΘπ[http://www.orkut.com/Profile.aspx?uid=16095185957008117508] for helping me out (-:*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://internet.geek.2007.googlepages.com/gm_myorkut_v2.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/