// ==UserScript==
// @name           Ikariam: Icones L-O-A sur Alpha
// @namespace      loa-alpha.ikariam
// @version        0.0.1
// @author         djbrown (Basé sur les Icones d'Ikariam)
// @e-mail         offshoresboss@gmail.com
// @description    Icones humoristiques pour l'alliance L-O-A
// @include        http://s1.*.ikariam.*/*
// @exclude        http://s1.*.ikariam.*/skin/*
// @exclude        http://s1.*.ikariam.*/js/*
// @exclude        http://s1.*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ---- Version 0.0.1 ---- 

// 
var URL= "http://i46.servimg.com/u/f46/16/66/61/30/";

// Villes
GM_addStyle("#advisors #advCities a.normal 		{background-image:url("+URL+"town12.gif);}");
GM_addStyle("#advisors #advCities a.normalactive 	{background-image:url("+URL+"town-a10.gif);}");

// Armée
GM_addStyle("#advisors #advMilitary a.normal 		{background-image:url("+URL+"genera10.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive 	{background-image:url("+URL+"genera11.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert 	{background-image:url("+URL+"genera12.gif);}");

// Recherche
GM_addStyle("#advisors #advResearch a.normal 		{background-image:url("+URL+"search10.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive 	{background-image:url("+URL+"search11.gif);}");

// Diplomatie
GM_addStyle("#advisors #advDiplomacy a.normal 		{background-image:url("+URL+"diplo10.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive     {background-image:url("+URL+"diplo-10.gif);}");
