// ==UserScript==
// @name		Antonios IV tools (based on The Corsairs Tools)
// @version 	79
// @namespace 	Gboz
// @author		TonyK_X
// @description	Antonios IV alliance Tools - ika-core
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

var version=80;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Corsairs';
		alliancenm='CoR';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='Ros-Akrites';
		alliancenm='almop';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['Lions' 		, Alliance		],
					['PAO'		, Allies 		],
					['PKeep'		, Allies 		],
					['RoyAL'		, Allies 		],
					['S-F'		, Allies 		],
					['SAMAL'		, Allies 		],
					['SFI'	, Allies 		],					
					['U-I-D'		, Allies 		],
					['U-Β-D'		, Allies 		],
					['U-Μ-D'		, Allies 		],
					['VBD'	, Allies 		],
					['XR-GE'		, Allies 		],
					['XXX'		, Allies 		],
					['aeun'	, Allies 		],
					['-300-'		, Allies 		],
					['dikas'		, Allies 		],
					['HERO'		, Allies 		],
					['atle'		, Allies 		],
					['JTR'		, Allies 		],
					['North'		, Allies 		],
					['atle2'	, Allies 		],
					['LgS'		, Allies 		],
					['LgS2'	, Allies 		],
					['LoL'	, Allies 		],
					['LoL 2'		, Allies 		],
					['GRF'	, Allies 		],
					['CRS'	, Allies 		],
										];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://titans-akrites.forumotion.net/forum';
		//forumurlnew='.';
		forumurlnew='http://titans-akrites.forumotion.net/forum';
		break;
	//for a friend

case 's1.ikariam.rs':
		alliancefullnm='Greek Fire 2';
		alliancenm='FIRE2';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['S A' 		, Alliance		],
					['-VLA-'	, Allies 		],
					['FIRE'		, Allies 		],
					['IER'		, Allies 		],
					['ELS'		, Allies 		],
					['GRC'		, Allies 		],
					['mkd'		, Allies 		],					
					['GR EL'	, Allies 		],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://greekfire.forumotion.net/login.forum?connexion';
		//forumurlnew='.';
		forumurlnew='http://greekfire.forumotion.net/login.forum?connexion';
		break;
	//for a friend
	case 's5.ikariam.gr':
		alliancefullnm='Angels';
		alliancenm='A-G-S';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ],
					['-E-' 		, Alliance ],
					['-RK-' 	, Allies ],
					['-V-' 		, Allies ],
					['-V-AC' 	, Allies ],
					['angel' 	, Allies ],
					['ANT' 		, Allies ],
					['ARGO' 	, Allies ],
					['ARGO2' 	, Allies ],
					['ATG' 		, Allies ],
					['Black' 	, Allies ],
					['CYB' 		, Allies ],
					['CHS' 		, Allies ],
					['D-K' 		, Allies ],
					['DLT' 		, Allies ],
					['Ed II' 	, Allies ],
					['Eddie' 	, Allies ],
					['ELS' 		, Allies ],
					['EVO' 		, Allies ],
					['E_Rev' 	, Allies ],
					['fwkis' 	, Allies ],
					['Gate4' 	, Allies ],
					['Greek' 	, Allies ],
					['HE-AL' 	, Allies ],
					['ILL-A' 	, Allies ],
					['ELL-W' 	, Allies ],
					['izas' 	, Allies ],
					['KoO2' 	, Allies ],
					['LIFA' 	, Allies ],
					['LOK' 		, Allies ],
					['MYRB' 	, Allies ],
					['OEK' 		, Allies ],
					['PCM' 		, Allies ],
					['PRS' 		, Allies ],
					['R E V' 	, Allies ],
					['SJS' 		, Allies ],
					['SMR' 		, Allies ],
					['SMS' 		, Allies ],
					['SNT' 		, Allies ],
					['TOTEN' 	, Allies ],
					['Un-PX' 	, Allies ],
					['veto' 	, Allies ],
					['O_Y_K' 	, Allies ],
					['VFV' 		, Allies ],
					['ΔΕΛΤΑ' 	, Allies ],
					['ΙΛΙ 2' 	, Allies ],
					['ΚΡΗΤΗ' 	, Allies ],
					['ΜΟ_ΛΑ' 	, Allies ],
					['ΠΑΟ' 		, Allies ],
					['ΠΑΟΚ' 	, Allies ],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='http://a-g-s.forumotion.net/forum.htm';
		forumurl='http://a-g-s.forumotion.net/forum.htm';
		forumurlnew='http://a-g-s.forumotion.net/forum-f14/';
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