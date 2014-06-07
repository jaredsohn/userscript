// ==UserScript==
// @name           Ikariam: Mis caras
// @version        0.1.1
// @author         off-ptz (Based on "Ikariam Premiun Icones")
// @description    Ikariam: Mis caras
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ---- Version 0.1.1 ---- 

// 
var URL= "http://offptz.ucoz.ru/icariam_pic/";
var URL0= "http://i40.tinypic.com/";
var URL1= "http://i41.tinypic.com/";
var URL2= "http://i42.tinypic.com/";
var URL3= "http://i43.tinypic.com/";
var URL4= "http://i44.tinypic.com/";


// Иконка города
GM_addStyle("#advisors #advCities a.normal 		{background-image:url("+URL3+"2igfvdf.jpg);}");
GM_addStyle("#advisors #advCities a.normalactive 	{background-image:url("+URL1+"2j6a9tv.jpg);}");

// Иконка армии
GM_addStyle("#advisors #advMilitary a.normal 		{background-image:url("+URL3+"21cshdv.jpg);}");
GM_addStyle("#advisors #advMilitary a.normalactive 	{background-image:url("+URL4+"i3t08i.jpg);}");
GM_addStyle("#advisors #advMilitary a.normalalert 	{background-image:url("+URL2+"rlb8zk.jpg);}");

// иконка иследований
GM_addStyle("#advisors #advResearch a.normal 		{background-image:url("+URL0+"2h7dgkx.jpg);}");
GM_addStyle("#advisors #advResearch a.normalactive 	{background-image:url("+URL2+"6j34t4.jpg);}");

// Иконка дипломатии
GM_addStyle("#advisors #advDiplomacy a.normal 		{background-image:url("+URL+"d_gold.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive     {background-image:url("+URL+"d_gold_a.gif);}");
