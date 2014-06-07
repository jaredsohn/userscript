// ==UserScript==
// @name		The MdI Tools
// @version 	112
// @namespace 	Gboz
// @author		Gboz
// @author		Sacrifice für die MdI, UET-S, -Up-
// @description	Die MdI/UET Allianz Tools - ika-core
// @exclude        http://board.ikariam.*/*
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it provides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=112;
var scriptlocation="http://userscripts.org/scripts/source/86294.user.js";

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
		//forumurlnew='.';
		
		break;
		
	case 's20.de.ikariam.com':
		alliancefullnm='Meister der Inseln';
		alliancenm='MdI';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['_ _'		, Allies		],
					[		, Enemies 	],
					['---'	, Enemies 		],
					['----'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		//chaturl='.';
		//forumurl='.';
		
		//forumurlnew='.';
		
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

// for a cool friend
	case 's12.de.ikariam.com':
		alliancefullnm='Lords of War';
		alliancenm='LoW';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                        ['WBDHS'        , Allies    ],
                                        ['WHDHS'        , Allies    ],
                                        ['GSF'	        , Enemies   ],
					['-=+'			, Enemies 	],
					['-=+'   		, Enemies 	]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		//chaturl='.';
		//forumurl='.';
		//forumurlnew='.';
		break;

	// for a very big friend
	case 's16.de.ikariam.com':
		alliancefullnm='HeLL';
		alliancenm='HeLL';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                        ['-UP-'        , Allies    ],
                                        ['Dark'	, Enemies ],				  ['-G-'	, Enemies ],
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
		alliancefullnm='HeLL';
		alliancenm='HeLL';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['TTS'		, Allies	],
					['ZBV'		, Allies	],
					['PEST'		, Allies	],
					['Joker'	, Allies	],
					['NRR'		, Allies 	],
                                        ['-RR-'         , Allies        ],
					['NoM'		, Allies 	],
					['NoMW'		, Allies 	],
					['-Myk-'	, Enemies 	],
					['GOW'	        , Enemies 	],
					['SOL' 	        , Enemies       ],
					['GEZ'		, Enemies       ],
					['W-d-L'	, Enemies       ],
					['--S--'	, Enemies       ],
					['A-B'	        , Enemies       ],
					['S_Fi'	        , Enemies       ],
					['DKN'	        , Enemies 	]	];
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
		alliancefullnm='World of Gothic';
		alliancenm='WoG';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['LOD'		, Allies	],
					['CR'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		//chaturl='http://mdially.md.funpic.de/board/center_shout.php';
		//forumurl='.';
		forumurl='http://mdially.md.funpic.de/board/index.php';
		//forumurlnew='.';
		forumurlnew='http://mdially.md.funpic.de/board/search.php?search_id=newposts';
		break;

//for a little friend too
	case 's17.de.ikariam.com':
		alliancefullnm='HeLL';
		alliancenm='HeLL';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['--'		, Allies	],
					['--'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		//forumurl='.';
		//forumurlnew='.';
		break;
		
	//for a  big friend too
	case 's666.en.ikariam.com':
		alliancefullnm='BlueÖysterCult';
		alliancenm='BÖC';		
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


//for a  big sigma friend too
	case 's18.de.ikariam.com':
		alliancefullnm='Angels of Retribution';
		alliancenm='AoR';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['Scots'		, Allies	],
                                        ['HoF'		, Allies	],
                                        ['-CR-'	, Enemies 		],
                                        ['-CR-W-'	, Enemies 		],
                                        ['-Dra-'	, Enemies 		],
                                        ['-DO-'  , Enemies        ],
                                        ['-RB-'	, Enemies 		],
					['--'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='http://inselmeister.iphpbb3.com/forum/center_shout.php';
		forumurl='http://inselmeister.iphpbb3.com';
		//forumurlnew='.';
		
		break;	

//for a  big tau friend too
	case 's19.de.ikariam.com':
		alliancefullnm='Discounter';
		alliancenm='Disco';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['Irish'		, Allies	],
                                         ['LOVE'		, Allies	],
                                        ['-CR-'	, Enemies 		],
                                        [''	, Enemies 	],                     	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		forumurl='http://discounter.111mb.de/index.php';
		//forumurlnew='.';
		
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