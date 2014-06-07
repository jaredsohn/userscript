// ==UserScript==
// @name           איקרים יועצי זהב
// @namespace      http://offptz.ucoz.ru/
// @version        0.1
// @author         tiger
// @description    מחליף את היועצים ביועצי זהב
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ---- Version 0.1---- 

// 
var URL= "http://offptz.ucoz.ru/icariam_pic/";

// יועץ ערים
GM_addStyle("#advisors #advCities a.normal 		{background-image:url("+URL+"m_gold.gif);}");
GM_addStyle("#advisors #advCities a.normalactive 	{background-image:url("+URL+"m_gold_a.gif);}");

// יועץ צבא
GM_addStyle("#advisors #advMilitary a.normal 		{background-image:url("+URL+"g_gold.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive 	{background-image:url("+URL+"g_gold_a.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert 	{background-image:url("+URL+"g_gold_alert.gif);}");

// יועץ מחקר
GM_addStyle("#advisors #advResearch a.normal 		{background-image:url("+URL+"s_gold.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive 	{background-image:url("+URL+"s_gold_a.gif);}");

// יועץ דיפלומטיה
GM_addStyle("#advisors #advDiplomacy a.normal 		{background-image:url("+URL+"d_gold.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive     {background-image:url("+URL+"d_gold_a.gif);}");