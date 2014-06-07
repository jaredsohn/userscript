// ==UserScript==
// @name	LoG-1 alliance tool based on ika-core
// @version 	4
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

var version=4;
var scriptlocation="http://userscripts.org/scripts/source/35976.user.js";

Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Purple','Brown'];
Enemies		=	[	'Red'	,'Red'	];
switch (location.host) {
	//case 's1.ikariam.com':
	default:
		alliancefullnm='LoG-1';
		alliancenm='LoG-1';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['LoG-2'	, Alliance		],
					['LoG-3'		, Allies 		],
					['Log-4'		, Allies 		],
					['LoG-5'		, Allies 		],
					['LoG-6'	, Allies 		],
					['LoG-7'		, Allies 		],
                              ['LoG1A'		, Allies 		],
                              ['LoG1B'		, Allies 		],
                              ['LBR2'		, Allies 		],
					['Atl'		, Allies 		],
                              ['Atl 2'		, Allies 		],
                              ['Atl3'		, Allies 		],
					['ARGO'	, Allies 		],
                              ['ARG2'	, Allies 		],
                              ['ARG3'	, Allies 		],
					['DIAS'	, Allies 		],
					['QuEn'		, Allies 		],
					['җDeLe'	, Allies 		],
					['CoR'		, Allies 		],
					['ΗΠΟΛΗ'		, Allies 		],
					['LBR'		, Allies 		],
					['-V-'	, Allies 		],
					['G_O_W'	, Allies 		],
                              ['GrA'	, Allies 		],
                              ['P_R'	, Allies 		],
                              ['GRF'	, Allies 		],
                              ['T_P'	, Allies 		],
                              ['HER'	, Allies 		],
                              ['HELL'	, Allies 		],
					['ATLAS'	, Allies 		],
                              ['ELNAS'	, Allies 		],
					['AtLe'	, Allies 		],];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.yourforum.com/chat';
		forumurl='.';
		//forumurl='http://www.yourforum.com/forum/new';
		forumurlnew='.' ;
		//forumurlnew='http://www.yourforum.com/forum/';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	


