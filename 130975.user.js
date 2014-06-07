// ==UserScript==
// @name           Ikariam pokémon style!
// @namespace      http://tbhproductions.com/
// @description    Bring Pokémon in Ikariam! 
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

var URL= "http://img213.imageshack.us/";
var URL2= "http://img100.imageshack.us/"
var URL3= "http://img37.imageshack.us/"
var URL4= "http://img3.imageshack.us/"
var URL5= "http://img201.imageshack.us/"
var URL6= "http://img443.imageshack.us/"
var URL7= "http://img33.imageshack.us/"
var URL8= "http://img534.imageshack.us/"
var URL9= "http://img221.imageshack.us/"
//normal accounts
GM_addStyle("#advisors #advCities a.normal                                	{background-image:url("+URL2+"img100/3079/95727901.png);}");
GM_addStyle("#advisors #advCities a.normalactive                           	{background-image:url("+URL+"img213/1263/77946256.png);}");
GM_addStyle("#advisors #advMilitary a.normal                               	{background-image:url("+URL3+"img37/8018/15351836.png);}");
GM_addStyle("#advisors #advMilitary a.normalactive                         	{background-image:url("+URL4+"img3/6048/57119495.png);}");
GM_addStyle("#advisors #advMilitary a.normalalert                          	{background-image:url("+URL5+"img201/7247/59092832.png);}");
GM_addStyle("#advisors #advResearch a.normal                               	{background-image:url("+URL6+"img443/2986/20180963.png);}");
GM_addStyle("#advisors #advResearch a.normalactive                         	{background-image:url("+URL7+"img33/7065/92086656.png);}");
GM_addStyle("#advisors #advDiplomacy a.normal                              	{background-image:url("+URL8+"img534/1117/79151154.png);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive                        	{background-image:url("+URL9+"img221/3497/26259814.png);}");
//premium accounts
GM_addStyle("#advisors #advCities a.premium                                 	{background-image:url("+URL2+"img100/3079/95727901.png);}");
GM_addStyle("#advisors #advCities a.premiumactive                           	{background-image:url("+URL+"img213/1263/77946256.png);}");
GM_addStyle("#advisors #advMilitary a.premium                               	{background-image:url("+URL3+"img37/8018/15351836.png);}");
GM_addStyle("#advisors #advMilitary a.premiumactive                         	{background-image:url("+URL4+"img3/6048/57119495.png);}");
GM_addStyle("#advisors #advMilitary a.premiumalert                          	{background-image:url("+URL5+"img201/7247/59092832.png);}");
GM_addStyle("#advisors #advResearch a.premium                               	{background-image:url("+URL6+"img443/2986/20180963.png);}");
GM_addStyle("#advisors #advResearch a.premiumactive                         	{background-image:url("+URL7+"img33/7065/92086656.png);}");
GM_addStyle("#advisors #advDiplomacy a.premium                              	{background-image:url("+URL8+"img534/1117/79151154.png);}");
GM_addStyle("#advisors #advDiplomacy a.premiumactive                        	{background-image:url("+URL9+"img221/3497/26259814.png);}");