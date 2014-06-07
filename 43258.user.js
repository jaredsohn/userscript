// ==UserScript==
// @name	Ika-core LCh
// @version 	3
// @namespace 	Dge
// @author	Dge
// @description	Ika-core.org utilities for Ikariam. Special version for LCh
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================
// Version
// 1. Initial
// 2. Ajout alliance Styx comme alliée
// 3. Ajout alliance FCL et QUEB comme alliée

var version=3;
var scriptlocation="http://userscripts.org/scripts/source/43258.user.js";

switch (location.host) {
	//case 's1.ikariam.com':
	default:
		alliancefullnm='Les Chrysopoles';
		alliancenm='LCh';		
		alliance=[	['Νo alliance'	, NoAlliance],
				[ alliancenm	, Alliance],
				['LCh 2'	, Alliance],
				['A-D'		, Allies],
				['A-D2'		, Allies],
				['GTA'		, Allies],
				['GTA 2'	, Allies],
				['R-R'		, Allies],
				['_LA_'		, Allies],
				['A_T'		, Allies],
				['Tribu'	, Allies],
				['FCR'		, Allies],
				['styx'		, Allies],
				['FLC'		, Allies],
				['QUEB'		, Allies],
				['BBB'          , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.yourforum.com/chat';
		forumurl='http://leschrysopoles.forumactif.net/';
		//forumurl='http://www.yourforum.com/forum/new';
		forumurlnew='http://leschrysopoles.forumactif.net/search.forum?search_id=newposts' ;
		//forumurlnew='http://www.yourforum.com/forum/';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	


