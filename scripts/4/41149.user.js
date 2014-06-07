// ==UserScript==
// @name	Ika-core-SearchTools  DLM
// @version 	6
// @namespace 	Gboz
// @author	Gboz
// @description	Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched. Your not allowed to edit or copy ika-core.js, read license inside the file.
// You can create a copy of Ika-core-SearchTools.user.js and host it anywhere, when a new version of ika-core.js comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=7;
var scriptlocation="http://userscripts.org/scripts/source/41149.user.js";

switch (location.host) {
	//case 's3.ikariam.com':
	default:
		alliancefullnm='TheEaglesEmpire';
		alliancenm='DLM';		
		alliance=[	['Νo alliance'	, NoAlliance],
				[ alliancenm	, Alliance	],
				['DLM2'		, Allies	],
				['FIGHT'	, Allies	],
	                        ['Figh1'	, Allies	],
				['Figh2'	, Allies	],
				['Figh3'	, Allies	],
				['Figh4'	, Allies	],
				['THA'		, Allies	],
				['BKG'		, Allies	],
				['BKG2'		, Allies	],
				['UNUM'		, Allies	],
				['SIRIO'          , Allies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='.';
		forumurl='.';
		//forumurl='http://polisunite.forumfree.net/';
		forumurlnew='.' ;
		//forumurlnew='http://polisunite.forumfree.net';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	


