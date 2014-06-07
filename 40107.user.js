// ==UserScript==
// @name	Ika-core-SearchTools -TW-
// @version 	6
// @namespace 	jtX
// @author	jtX
// @description	Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================

var version=6;
var scriptlocation="http://userscripts.org/scripts/source/35976.user.js";

switch (location.host) {
	//case 's1.ikariam.com':
	default:
		alliancefullnm='Total War ';
		alliancenm='-TW-';		
		alliance=[	['Νo alliance'	, NoAlliance],
				[ alliancenm	, Alliance	],
				['-TW2-'	, Allies	],
                                ['Cry'		, Allies	],
				['Hass'        , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='Indefinido';
		forumurl='http://totalwar.foroactivo.net/forum.htm';
		//forumurl='http://www.orkut.com.br/Main#Community.aspx?cmm=52165272';
		forumurlnew='http://totalwar.foroactivo.net/msg.forum?folder=inbox' ;
		//forumurlnew='http://s3.ikariam.com.br/index.php?view=embassy&id=66809&position=3';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
