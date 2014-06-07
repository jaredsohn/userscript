// ==UserScript==
// @name           Ikariam: Gold Icons
// @namespace      http://offptz.ucoz.ru/
// @version        0.1.1
// @author         off-ptz (Based on "Ikariam Premiun Icones")
// @e-mail         off-ptz@mail.ru
// @description    Ikariam: New Gold Icons
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ---- Version 0.1.1 ---- 

// 
var URL= "http://offptz.ucoz.ru/icariam_pic/";

// Иконка города
GM_addStyle("#advisors #advCities a.normal 		{background-image:url("+URL+"m_gold.gif);}");
GM_addStyle("#advisors #advCities a.normalactive 	{background-image:url("+URL+"m_gold_a.gif);}");

// Иконка армии
GM_addStyle("#advisors #advMilitary a.normal 		{background-image:url("+URL+"g_gold.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive 	{background-image:url("+URL+"g_gold_a.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert 	{background-image:url("+URL+"g_gold_alert.gif);}");

// иконка иследований
GM_addStyle("#advisors #advResearch a.normal 		{background-image:url("+URL+"s_gold.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive 	{background-image:url("+URL+"s_gold_a.gif);}");

// Иконка дипломатии
GM_addStyle("#advisors #advDiplomacy a.normal 		{background-image:url("+URL+"d_gold.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive     {background-image:url("+URL+"d_gold_a.gif);}");
