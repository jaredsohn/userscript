// ==UserScript==
// @name		Dioses del Mal Tools
// @version 	03
// @namespace 	Deimont
// @author		Gboz
// @Modificado  Deimont
// @description		Dioses del Mal Tools alianza Tools - ika-core
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

var version=03;
var scriptlocation="http://ontare.ean.edu.co/~hardy/ikariam/Dioses_del_Mal_Tools.user.js";


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Dioses del Mal';
		alliancenm='DDMS';		
		alliance=[	['Îo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['DDMS'		, Alliance	],
					['DDMS2'			, Allies	],
					['DDMS3'			, Allies	],
 			                ['DDMS4'			, Allies	],
					['-=+'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://diosesdelmal.phpbb3.es';
		//forumurlnew='.';
		forumurlnew='http://diosesdelmal.phpbb3.es';
                country='es';
		break;
	case 's1.co.ikariam.com':
		alliancefullnm='Dioses del Mal';
		alliancenm='Ddms';
		alliance=[	['Î§Ï‰ÏÎ¯Ï‚ Î£Ï…Î¼Î¼Î±Ï‡Î¯Î±', NoAlliance	],
					[alliancenm	, Alliance		],
					['DDMS2'	, Alliance		],
					['DDMS3'	, Alliance		],					
                    			['DDMS3'			, Allies	],
					['L_P'	, Enemies		],
                                        ['L-T'	, Enemies		],
					['IGNIS', Enemies		],
					['FLOW'	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
                country='es';
		chaturl='.';
		//forumurl='.';
		forumurl='http://diosesdelmal.phpbb3.es';
		//forumurlnew='.';
		forumurlnew='http://diosesdelmal.phpbb3.es';
		text1='http://diosesdelmal.phpbb3.es';

		break;
	//for a friend
}


        text1='http://diosesdelmal.phpbb3.es';
	main();
	ToolsMenu();
	fixtreaties();


	
