// ==UserScript==
// @name           Ikariam meets the simpsons
// @namespace      http://blackstonepiru.webs.com/
// @description    Verandert de adviseurs in de personages van the simpsons 
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

var URL= "http://hulp-bij-fotos.webs.com/photos/scriptsimpsons/";
var URL2= "http://img198.imageshack.us/"
var URL3= "http://img651.imageshack.us/"
GM_addStyle("#advisors #advCities a.normal                                	{background-image:url("+URL+"1-1.JPG);}");
GM_addStyle("#advisors #advCities a.normalactive                           	{background-image:url("+URL+"1a-1.JPG);}");
GM_addStyle("#advisors #advMilitary a.normal                               	{background-image:url("+URL+"2-1.JPG);}");
GM_addStyle("#advisors #advMilitary a.normalactive                         	{background-image:url("+URL+"2a-1.JPG);}");
GM_addStyle("#advisors #advMilitary a.normalalert                          	{background-image:url("+URL3+"i/ogaaaic7fhxohemevk2yl0g.jpg/);}");
GM_addStyle("#advisors #advResearch a.normal                               	{background-image:url("+URL+"3-1.JPG);}");
GM_addStyle("#advisors #advResearch a.normalactive                         	{background-image:url("+URL+"3a-1.JPG);}");
GM_addStyle("#advisors #advDiplomacy a.normal                              	{background-image:url("+URL+"4-1.JPG);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive                        	{background-image:url("+URL+"4a-1.JPG);}");