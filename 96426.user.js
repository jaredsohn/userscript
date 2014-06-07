// ==UserScript==
// @name           Ikariam: Gold Icons HE V
// @namespace      http://offptz.ucoz.ru/
// @version        2.0
// @author         off-ptz (Based on "Ikariam Premiun Icones")
// @e-mail         off-ptz@mail.ru
// @description    Ikariam: New Gold Icons
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ------ Version 2.0 ------ 

// 
var URL= "http://s1.il.ikariam.com/skin/rtl/layout/advisors/";

// העיר
GM_addStyle("#advisors #advCities a.normal 		{background-image:url("+URL+"mayor_premium.gif);}");
GM_addStyle("#advisors #advCities a.normalactive 	{background-image:url("+URL+"mayor_premium_active.gif);}");

// הצבא
GM_addStyle("#advisors #advMilitary a.normal 		{background-image:url("+URL+"general_premium.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive 	{background-image:url("+URL+"general_premium_active.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert 	{background-image:url("+URL+"general_premium_alert.gif.gif);}");

// המחקר
GM_addStyle("#advisors #advResearch a.normal 		{background-image:url("+URL+"scientist_premium.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive 	{background-image:url("+URL+"scientist_premium_active.gif);}");

// הדיפלומטיה
GM_addStyle("#advisors #advDiplomacy a.normal 		{background-image:url("+URL+"diplomat_premium.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive     {background-image:url("+URL+"diplomat_premium_active.gif);}");