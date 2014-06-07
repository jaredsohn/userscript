// ==UserScript==
// @name           Ikariam: Icons HE V
// @namespace      http://offptz.ucoz.ru/
// @version        0.2
// @author         off-ptz (Based on "Ikariam Premiun Icones")
// @e-mail         off-ptz@mail.ru
// @description    Ikariam: New Icons
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ------ Version 0.2 ------ 

// 
var URL= "http://s2.il.ikariam.com/skin/rtl/specials/winter/layout/advisors/";

// העיר
GM_addStyle("#advisors #advCities a.normal 		{background-image:url("+URL+"mayor.gif);}");
GM_addStyle("#advisors #advCities a.normalactive 	{background-image:url("+URL+"mayor_active.gif);}");

// הצבא
GM_addStyle("#advisors #advMilitary a.normal 		{background-image:url("+URL+"general.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive 	{background-image:url("+URL+"general_active.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert 	{background-image:url("+URL+"general_alert.gif);}");

// המחקר
GM_addStyle("#advisors #advResearch a.normal 		{background-image:url("+URL+"scientist.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive 	{background-image:url("+URL+"scientist_active.gif);}");

// הדיפלומטיה
GM_addStyle("#advisors #advDiplomacy a.normal 		{background-image:url("+URL+"diploma.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive     {background-image:url("+URL+"diplomat_active.gif);}");
// ***************** End *******************