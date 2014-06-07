// ==UserScript==
// @name	Rota - R-T
// @version 	1.0
// @namespace 	Desconhecido
// @author	Desconhecido
// @description	Rota Tools - ika-core
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
		alliancefullnm='Rota';
		alliancenm='R-T';			
		alliance=[	['Îo alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['-CN-'			, Allies	],
					['-PT-'			, Allies	],
					['300'			, Allies	],
					['A-R-T'		                , Allies      ],
					['ALCAM'			, Allies 	],
					['DEM'			, Allies 	],
					['ODF'    		, Allies 	],
					['P-NEG'    		, Allies 	],
					['TORG1'    		, Allies 	],
					['TORGS'    		, Allies 	],					
					['AFXX'	                	, Enemies],
					['FXX'	                	, Enemies],					
				                ];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
//		chaturl='.';
		forumurl='.';
//		forumurl='.';
		forumurlnew='.';
//		forumurlnew='.';
		break;

	case 's*.ikariam.com.br':
		alliancefullnm='Rota';
		alliancenm='R-T';			
		alliance=[	['Îo alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['-CN-'			, Allies	],
					['-PT-'			, Allies	],
					['300'			, Allies	],
					['A-R-T'		                , Allies      ],
					['ALCAM'			, Allies 	],
					['DEM'			, Allies 	],
					['ODF'    		, Allies 	],
					['P-NEG'    		, Allies 	],
					['TORG1'    		, Allies 	],
					['TORGS'    		, Allies 	],					
					['AFXX'	                	, Enemies],
					['FXX'	                	, Enemies],		
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