// ==UserScript==
// @name		The MoK Tools
// @version 	        v1
// @namespace 	        Lord1982
// @author		Lord1982
// @description	        The MoK Tools - ika-core
// @include		http://s*.ikariam.*/*
// @require		http://userscripts.org/scripts/source/42625.user.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=v1;
var scriptlocation="http://userscripts.org/scripts/source/42627.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Monkeys of Kaos';
		alliancenm='MoK';		
		alliance=[		['Νo alliance'		, NoAlliance],
					[ alliancenm		, Alliance	],
					['MoK2'			, Alliance	],
					['MoK3'			, Alliance	],
					['MOK4'			, Alliance	],
					['-=+'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://alianzamok.freeforums.org/';
		//forumurlnew='.';
		forumurlnew='http://alianzamok.freeforums.org/search.php?search_id=newposts';
		break;
	case 's1.ikariam.es':
		alliancefullnm='Monkeys of Kaos';
		alliancenm='MoK';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['Mok2'	, Alliance		],
					['Mok3'	, Alliance		],
					['Mok4'	, Alliance		],					
					['TROY'		, Allies 		],
					['TROY2'		, Allies 		],
					['TROY3'		, Allies 		],
					['MEDIT'		, Allies 		],
					['H-TRY'		, Allies 		],
					['AZTEC'		, Allies 		],
					['LMM'	, Allies 		],
					['MXCS'		, Allies 		],
					['MXCS2'		, Allies 		],
					['MXCS3'		, Allies 		],
					['CONF'	, Allies 		],
					['CONF1'	, Allies 		],
					['CONF2'		, Allies 		],
					['CONF4'	, Allies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://alianzamok.freeforums.org/';
		//forumurlnew='.';
		forumurlnew='http://alianzamok.freeforums.org/search.php?search_id=newposts';
		break;
	//for a friend
	case 's12.ikariam.es':
		alliancefullnm='Soul Society';
		alliancenm='SSM';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='http://corsairs.phpbb9.com/chatbox_mod/chatbox.forum';
		//forumurl='.';
		forumurl='http://soulsocietymy.foroactivo.com.es';
		//forumurlnew='.';
		forumurlnew='http://soulsocietymy.foroactivo.com.es/forum.htm';
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