// ==UserScript==
// @name	Independente - -InD-
// @version 	1.0
// @namespace 	Desconhecido
// @author	Desconhecido
// @description	Independete Tools - ika-core
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=1.0;

var scriptlocation="http://userscripts.org/scripts/source/40412.user.js";

// Settings for every server

switch (location.host) {
	default:
		alliancefullnm='Independentes';
		alliancenm='-InD-';			
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['-T-'			, Allies	],
					['-TK-'			, Allies	],
					['EMT'			, Allies	],
					['FEAR2'		                , Allies      ],
					['MEGA'			, Allies 	],
					['SKB'			, Allies 	],
					['_A_V_'    		, Allies 	],
					['IMP2'	                	, Enemies],
				                ];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
//		chaturl='.';
		forumurl='.';
//		forumurl='.';
		forumurlnew='.';
//		forumurlnew='.';
		break;

	case 's9.ikariam.com.br':
		alliancefullnm='Independentes';
		alliancenm='-InD-';			
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['-T-'			, Allies	],
					['-TK-'			, Allies	],
					['EMT'			, Allies	],
					['FEAR2'		                , Allies      ],
					['MEGA'			, Allies 	],
					['SKB'			, Allies 	],
					['_A_V_'    		, Allies 	],
					['IMP2'	                	, Enemies],
				                ];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
//		chaturl='.';
		forumurl='.';
//		forumurl='.';
		forumurlnew='.';
//		forumurlnew='.';
		break;

}
	main();
	ToolsMenu();
	fixtreaties();