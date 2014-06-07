// ==UserScript==
// @name		The ARGO Tools s1.gr
// @version 	65
// @namespace 	Gboz
// @author		Gboz
// @description	    The ARGO alliance Tools - ika-core - ON SERVER ALPHA.GR
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


var version=73;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'		];
Allies		=	[	'Cyan'	,'Green'	];
NoAlliance	=	[	'Purple','Brown'	];
Enemies		=	[	'Red'	,'Red'		];


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='ARGONAYTES';
		alliancenm='ARGO';		
		alliance=[		['Νo alliance'		, NoAlliance		],
					[ alliancenm		, Alliance		],
					['ARGO'			, Alliance		] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='ARGONAYTES';
		alliancenm='ARGO';
		alliance=[		['Χωρίς Συμμαχία'	, NoAlliance		],
					[alliancenm		, Alliance		],
					['ARG2'			, Alliance		],
					['ARG3'			, Alliance 		],
					['ARG4'			, Alliance		],
					['ARG5'			, Alliance		],
					['-UNI-'		, Allies 		],
					['-V-'			, Allies 		],
					['1453'			, Allies 		],
					['300'			, Allies 		],
					['Atl'			, Allies 		],
					['BWar'			, Allies 		],
					['CoR'			, Allies 		],
					['CoR 2'		, Allies 		],
					['GOI'			, Allies 		],
					['GrA'			, Allies 		],
					['GRF'			, Allies 		],
					['G_O_W'		, Allies 		],
					['KRVS'			, Allies 		],
					['LBR'			, Allies 		],
					['LoG-1'		, Allies 		],
					['LoG-4'		, Allies 		],
					['LoG-W'		, Allies 		],
					['mafia'		, Allies 		],
					['PAO'			, Allies 		],
					['__B__'		, Allies 		],
					['ΑΙΓΙΣ'		, Allies 		],
					['ΑΙΓΙΣ2'		, Allies 		],
					['ΗΠΟΛΗ'		, Allies 		],
					['ΠΑΟΚ'			, Allies 		],
					['җDeLe'		, Allies 		],	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://argonaytes.alianceforum.com/chatbox/chatbox.forum?';
		//forumurl='.';
		forumurl='http://argonaytes.alianceforum.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://argonaytes.alianceforum.com/search.forum?search_id=newposts';
		break;
	}
	main();
	ToolsMenu();
	fixtreaties();
	




