// ==UserScript==
// @name           Champ_oskin
// @namespace      http://www.orkut.com/Community.aspx?cmm=43558952
// @description    New orkut skin (-;
// @include        http://www.orkut.co.in/*
// @author         Champ[http://www.orkut.com/Profile.aspx?uid=2314352962118314615]
// ==/UserScript==

/*script start*/
var doc=document;
var head=doc.getElementsByTagName('head').item(0);
var link=doc.createElement('link');
link.href='http://xtremekido.googlepages.com/champ.css';
link.type='text/css';
link.rel='stylesheet';
head.appendChild(link);
/*script end*/
