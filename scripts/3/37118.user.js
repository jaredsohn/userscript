// ==UserScript==
// @name		TWT Tools
// @version             81
// @namespace 	Gboz
// @author		Gboz
// @description	The TWT alliance Tools - ika-core
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

var version=75;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='The White Tower';
		alliancenm='TWT';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['TWT'		, Alliance	] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='';
		//forumurlnew='.';
		forumurlnew='';
		break;
case 's1.ikariam.gr':
		alliancefullnm='The White Tower';
		alliancenm='TWT';
		alliance=[		['Χωρίς Συμμαχία'	, NoAlliance ],
					[alliancenm, Alliance	],
					['ΑΙΓΙΣ', Alliance	],
					['ΑΙΓΣ2', Alliance 	],
					['ΑΙΓΣ3', Alliance	],
					['U-Ι-D'	, Allies	],
					['U-E-D'	, Allies 	],
					['U-Β-D'	, Allies 	],
					['LOG-1'	, Allies 	],
					['LOG-2'	, Allies 	],
					['LOG-3'	, Allies 	],
					['LOG-4'	, Allies 	],
					['LOG-5'	, Allies 	],
					['LOG-6'	, Allies 	],
					['LOG-7'	, Allies 	],
					['LOG-A'	, Allies 	],
					['HELL'	, Allies 	],
					['HELL2'	, Allies 	],
					['PAO'	, Allies 	],
					['MAC'	, Allies 	],
					['B-R-A'	, Allies 	],
					['LBR'	, Allies 	],
					['squad'	, Allies 	],
					['1488'	, Allies 	],
					['ARG2'	, Allies 	],
					['STR'	, Allies 	],
					['JTR'	, Allies 	],
					['Thess'	, Allies 	],
					['LBR2'	, Allies 	],
					['Weed'	, Allies 	],
					['SEA'	, Allies 	],
					['PHOS'	, Allies 	],
					['SAMAL'	, Allies 	]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://twt-ikariam.blogspot.com/2008/10/to-chat-twt.html';
		//forumurl='.';
		forumurl='http://ttwt.4forum.biz/';
		//forumurlnew='.';
		forumurlnew='';
		break;
	//for a friend
	case 's5.ikariam.gr':
		alliancefullnm='The White Tower';
		alliancenm='TWT';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ],
					['FOX' , Allies ],
					['KNG' , Allies ],
					['LOTR' , Allies ],
					['L_O_G' , Allies ],
					['PYR' , Allies ],
					['SRT' , Allies ],
					['VFV' , Allies ] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='http://twt-ikariam.blogspot.com/2008/10/to-chat-twt.html';
		forumurl='http://ttwt.4forum.biz/';
		forumurlnew='';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();