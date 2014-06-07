// ==UserScript==
// @name		The TDSOU Tools
// @version 	97
// @namespace 	Gboz
// @author		Gboz
// @author		Sacrifice für die MdI und TDSOU
// @description	Die MdI Allianz Tools - ika-core
// @exclude        http://board.ikariam.*/*
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

var version=97;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='United Empires';
		alliancenm='UET';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['-SP-'		, Alliance		],
					['-WR-'		, Allies 		],
					['1212'		, Allies 		],
					['Bdt'		, Allies 		],
					['BRD'		, Allies 		],
					['DGE'		, Allies 		],
					['DÖSF'		, Allies 		],					
					['EoE'		, Allies 		],
					['EoE-R'	, Allies 		],
					['K_R'		, Allies 		],
					['N-G'		, Allies 		],
					['S A'		, Allies 		],
					['GII'		, Allies 		],
					['Gecko'	, Allies 		],
					['HDK'		, Allies 		],
					['HDK2'		, Allies 		],
					['HDR'		, Allies 		],
					['-UF-'     , Allies        ],
					['-=+'			, Enemies 	],
					['FTP'	, Enemies 		],
					['Zens'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		//chaturl='.';
		//forumurl='.';
		forumurl='http://2url.org/?180707';
		//forumurlnew='.';
		forumurlnew='http://www.versicherungsmakler-stucke.de/uet/search.php?search_id=newposts';
		break;
		
	case 's7.de.ikariam.com':
		alliancefullnm='United Empires';
		alliancenm='UET';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['-SP-'		, Alliance		],
					['-WR-'		, Allies 		],
					['1212'		, Allies 		],
					['Bdt'		, Allies 		],
					['BRD'		, Allies 		],
					['DGE'		, Allies 		],
					['DÖSF'		, Allies 		],					
					['EoE'		, Allies 		],
					['EoE-R'	, Allies 		],
					['K_R'		, Allies 		],
					['N-G'		, Allies 		],
					['S A'		, Allies 		],
					['GII'		, Allies 		],
					['Gecko'	, Allies 		],
					['HDK'		, Allies 		],
					['HDK2'		, Allies 		],
					['HDR'		, Allies 		],
					['-UF-'     , Allies        ],
					['HuK'		, Allies	],
					['-=+'			, Enemies 	],
					['FTP'	, Enemies 		],
					['Zens'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		//chaturl='.';
		//forumurl='.';
		forumurl='http://2url.org/?180707';
		//forumurlnew='.';
		forumurlnew='http://www.versicherungsmakler-stucke.de/uet/search.php?search_id=newposts';
		break;
		
	// For another server
	case 's1.de.ikariam.com':
		alliancefullnm='Thors Hammer';
		alliancenm='T-H';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['DG2'		, Allies	],
					['DG'		, Allies	],
					['-=+'			, Enemies 	] ];
					
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		//chaturl='.';
		//forumurl='.';
		//forumurl='.';
		forumurl='http://anvil.cwsurf.de/index.php';
		//forumurlnew='.';
		forumurlnew='http://anvil.cwsurf.de/search.php?search_id=newposts';
		break;

	// for a big friend
	case 's15.de.ikariam.com':
		alliancefullnm='Meister der Inseln';
		alliancenm='MdI';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['-=+'			, Enemies 	] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='http://server4.webkicks.de/mdichat/';
		//forumurl='.';
		forumurl='http://www.mdi.webuda.com/index.php';
		//forumurlnew='.';
		forumurlnew='http://www.mdi.webuda.com/search.php?search_id=newposts';
		break;
			
	//for a friend
	case 's13.de.ikariam.com':
		alliancefullnm='Meister der Inseln';
		alliancenm='MdI';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['TTS'		, Allies	],
					['-UP-'		, Allies	],
					['PEST'		, Allies	],
					['Joker'	, Allies	],
					['MdI3'		, Allies 		],
					['NoM'		, Allies 		],
					['P-F'		, Enemies 		],
					['GOW'	, Enemies 		],
					['SOL' 	, Enemies       ],
					['GEZ'		, Enemies       ],
					['Cha0s'	, Enemies       ],
					['FRUIT'	, Enemies       ],
					['ELA'		, Enemies      ],
					['muh'		, Enemies         ],
					['GHOST'	, Enemies         ],
					['real2'	, Enemies       ],
					['Cha0s'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='http://server4.webkicks.de/mdichat/';
		//forumurl='.';
		forumurl='http://www.mdi.webuda.com/index.php';
		//forumurlnew='.';
		forumurlnew='http://www.mdi.webuda.com/search.php?search_id=newposts';
		break;

	//for a friend too
	case 's14.de.ikariam.com':
		alliancefullnm='TheDarkSideOfUs';
		alliancenm='TDSOU';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['EoDds'		, Allies	],
					['H1N1'		, Allies	],
					['--'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		//chaturl='http://mdially.md.funpic.de/board/center_shout.php';
		//forumurl='.';
		//forumurl='http://mdially.md.funpic.de/board/index.php';
		//forumurlnew='.';
		//forumurlnew='http://mdially.md.funpic.de/board/search.php?search_id=newposts';
		break;
		
	//for a  big friend too
	case 's666.ikariam.org':
		alliancefullnm='Meister der Inseln';
		alliancenm='MdI';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['PEST'		, Allies	],
					['--'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		//chaturl='http://mdially.md.funpic.de/board/center_shout.php';
		//forumurl='.';
		forumurl='http://mdially.md.funpic.de/board/index.php';
		//forumurlnew='.';
		forumurlnew='http://mdially.md.funpic.de/board/search.php?search_id=newposts';
		break;	
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"You remind me of a man.", 68);
       addsbubble('scientist',"What man?", 71);
       addsbubble('diplomat',"The man with the power.", 72);
       addsbubble('scientist',"What power?", 74);
       addsbubble('diplomat',"The power of Hoodoo.", 77);
       addsbubble('scientist',"Who do?", 79);
       addsbubble('diplomat',"You do.", 81);
       addsbubble('scientist',"Do what?", 83);
       addsbubble('diplomat',"Remind me of a man.", 85);
       addsbubble('scientist',"What man?", 88);
       addsbubble('diplomat',"The man with the power.", 90);
       addsbubble('scientist',"What power?", 93);
       addsbubble('diplomat',"Give up?", 95);
       addsbubble('scientist',"Give up. Let's go.", 100);
    } else {
       addsbubble('general',"If they go on about Voodoo, who-do ..", 110);
       addsbubble('general', "I'm pushing them off the tower.", 118);
       addsbubble('mayor', "I'll help you.", 121);
    }

*/