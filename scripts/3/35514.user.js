// ==UserScript==
// @name		The Ninc Tools
// @version 	9999
// @namespace 	Deadly
// @author		Deadly
// @description	The Ninc alliance Tools - ika-core
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

var version=9999;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Yellow','Brown'];
Enemies		=	[	'Red'	,'Red'	];


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Nasty Inc';
alliancenm='Ninc';
alliance=[ ['Νo alliance' , NoAlliance],
[ alliancenm , Alliance ],
['ninc2' , Alliance ],
['-KoG-' , Allies ],
['-TZ-' , Allies ],
['KOO' , Allies ],
['Mafia' , Allies ],
['YenA' , Allies ],
['B_B' , Enemies ] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://www.gamesurge.net/chat/.forum';
		//forumurl='.';
		forumurl='http://www.nastyinc.webs.com';
		//forumurlnew='.';
		forumurlnew='http://www.freewebs.com/nastyinc/apps/forums/?view_type=1';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='Nasty Inc';
		alliancenm='Ninc';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['COR 2'	, Alliance		],
					['ΒΑΝΚ'		, Allies 		],
					['ATHAL'	, Allies 		],
					['HTA'		, Allies 		],
					['G_O_W'	, Allies 		],
					['TSM'		, Allies 		],
					['LoG-T'	, Allies 		],
					['ΠΑΟΚ'		, Allies 		],
					['HELL'		, Allies 		],
					['V'		, Allies 		],
					['GRC'		, Allies 		],
					['UNI'		, Allies 		],
					['Byz'		, Allies 		],
					['QuEn'		, Allies 		],
					['HPOLH'	, Allies 		],
					['300'		, Allies 		],
					['Dom'		, Allies 		],
					['FTW'		, Allies 		],
					['BWar'		, Allies 		],
					['۞ SOC'	, Allies 		],
					['JASON'	, Allies 		],
					['җDeLe'	, Allies 		],
					['RAMPAGE'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://www.gamesurge.net/chat/.forum';
		//forumurl='.';
		forumurl='http://www.nastyinc.webs.com';
		//forumurlnew='.';
		forumurlnew='http://www.freewebs.com/nastyinc/apps/forums/?view_type=1';
		break;
	//for a friend
	case 's4.ikariam.gr':
		alliancefullnm='Nasty Inc';
		alliancenm='Ninc';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm	, Alliance	],
					['TLOI' 	, Allies ],
					['vrsII' 	, Allies ],
					['NLD' 		, Allies ],
					['IMR' 		, Allies ],
					['HERO' 	, Allies ],
					['C_M_A' 	, Allies ],
					['ΔΕΛΤΑ' 	, Allies ]];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://www.gamesurge.net/chat/.forum';
		//forumurl='.';
		forumurl='http://www.nastyinc.webs.com';
		//forumurlnew='.';
		forumurlnew='http://www.freewebs.com/nastyinc/apps/forums/?view_type=1';
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