// ==UserScript==
// @name		The Corsairs Tools
// @version 	82
// @namespace 	Gboz
// @author		Gboz
// @description	The Corsairs alliance Tools - ika-core
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

var version=82;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='BAYABAS';
		alliancenm='BYBS';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['WoW'			, Enemies 	],
					['Mac'			, Enemies 	], ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='Corsairs';
		alliancenm='C-A';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['COR 2'	, Alliance		],
					['Atl 2'	, Alliance		],
					['Atl 3'	, Alliance		],					
					['ARGO'		, Allies 		],
					['ARG2'		, Allies 		],
					['ARG3'		, Allies 		],
					['-V-'		, Allies 		],
					['300'		, Allies 		],
					['ARGO'		, Allies 		],
					['ATHAL'	, Allies 		],
					['BWar'		, Allies 		],
					['GOI'		, Allies 		],
					['GRF'		, Allies 		],
					['G_O_W'	, Allies 		],
					['H T A'	, Allies 		],
					['HELL'		, Allies 		],
					['JASON'	, Allies 		],
					['L0G-1'	, Allies 		],
					['QuEn'		, Allies 		],
					['SIL'		, Allies 		],
					['WIN'		, Allies 		],
					['__B__'	, Allies 		],
					['ΗΠΟΛΗ'	, Allies 		],
					['ΠΑΟΚ'		, Allies 		],
					['ΧΧΧ'		, Allies 		],
					['җDeLe'	, Allies 		],
					['۞ SOC'		, Allies 		],
					['jssrt'	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	//for a friend
	case 's4.ikariam.gr':
		alliancefullnm='Corsairs';
		alliancenm='CoR';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ],
					['CoR-A' , Alliance ],
					['1234' , Allies ],
					['ARGO' , Allies ],
					['ARGO2' , Allies ],
					['CGK' , Allies ],
					['CY_GR' , Allies ],
					['DRGNS' , Allies ],
					['FM1' , Allies ],
					['I-W' , Allies ],
					['IONES' , Allies ],
					['KAQ' , Allies ],
					['N_L' , Allies ],
					['O_Y_K' , Allies ],
					['PCM' , Allies ],
					['SJS' , Allies ],
					['ULh' , Allies ]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='http://corsairs.phpbb9.com/chatbox_mod/chatbox.forum';
		forumurl='http://corsairs.phpbb9.com';
		forumurlnew='http://corsairs.phpbb9.com/search.forum?search_id=newposts';
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