// ==UserScript==
// @name		The Arevacos Tools
// @version 	75
// @namespace 	Gboz
// @author		Gboz
// @description	The Arevacos alliance Tools - ika-core
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
var scriptlocation="http://userscripts.org/scripts/source/35877.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Purple','Brown'];
Enemies		=	[	'Red'	,'Red'	];


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Arevacos';
		alliancenm='Arvc';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['Arvc2'	, Allies	],
					['AFP'		, Allies 		],
					['AAF'		, Allies 		],
					['ARVCS'	, Allies 		],	
					['BNG'		, Allies 		],
					['CO1'		, Allies 		],
					['CORP'		, Allies 		],
					['emb'		, Allies 		],	
					['H-TRY'	, Allies 		],	
					['HDW'		, Allies 		],
					['KOS'		, Allies 		],	
					['L a S'	, Allies 		],	
					['mcrs2'	, Allies 		],
					['MVG'		, Allies 		],
					['PLGA1'	, Allies 		],
					['RDZ'		, Allies 		],	
					['SLPC'		, Allies 		],	
					['spark'	, Allies 		],
					['SPNCV'	, Allies 		],
					['TeT'		, Allies 		],
					['PUTAN'	, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://xat.com/web_gear/chat/go_large.php?id=34614968';
		//forumurl='.';
		forumurl='http://arevacos.foroactivo.net/forum.htm';
		//forumurlnew='.';
		forumurlnew='http://arevacos.foroactivo.net/search.forum?search_id=newposts';
		break;
	
}
	main();
	ToolsMenu();
	fixtreaties();
	
    var showbubble=Math.floor(Math.random()*10);
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

