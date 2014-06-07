// ==UserScript==
// @name           dark
// @namespace      http://www.orkut.com/Community.aspx?cmm=43558952
// @description    orkut dark version by black panther (-;
// @include        http://www.orkut.com/*
// @author         panther[http://www.orkut.com/Profile.aspx?uid=10481463303105852858]
// ==/UserScript==

/*special thanks to prateek[http://www.orkut.com/Profile.aspx?uid=5328318125618648335] for helping me out (-:*/

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://internet.geek.2007.googlepages.com/gm_myorkut_v2.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/