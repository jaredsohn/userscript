// ==UserScript==
// @name		The Gummi Bears Tools
// @version 	82
// @namespace 	B2rS
// @author		B2rS
// @description	The Gummi Bears alliance Tools
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

var version=83;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Мишки ГАММИ';
		alliancenm='Gummi';
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['Gummi'		, Alliance      ],
					['-33-'			, Allies	],
					['-=+'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='.';
		//forumurl='http://cor-atle.highbb.com/';
		forumurlnew='.';
		//forumurlnew='http://cor-atle.highbb.com/search.forum?search_id=newposts';
		break;
	case 's5.ikariam.ru':
		alliancefullnm='Gummi';
		alliancenm='Gummi';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['-33-'		, Allies 		],
					['-ZOO-'	, Allies 		],
					['Bears'	, Allies 		],
					['Ogame'	, Allies 		],
					['Agame'	, Allies 		],

					['EMPR'	, Enemies 		],
					['EMPS'	, Enemies 		],
					['R_EMP' , Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='http://bears.at.ua/forum';
		forumurlnew='http://bears.at.ua/forum/0-0-1-34';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();

    var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Красиво играешь! ;-).", 68);
       addsbubble('scientist',"А мы все исследуем!", 71);
       addsbubble('diplomat',"В тебе есть сила!", 72);
       addsbubble('scientist',"А мы все исследуем", 74);
       addsbubble('diplomat',"Поговори с соаловцами =)", 77);
       addsbubble('scientist',"Ась?", 79);
       addsbubble('diplomat',"Мы Мишки ГАММИ ^_^", 81);
       addsbubble('scientist',"Мишки крутые =)", 83);
       addsbubble('diplomat',"Мы Мишки ГАММИ ^_^", 85);
       addsbubble('scientist',"Мы Мишки ГАММИ ^_^", 88);
       addsbubble('diplomat',"В мишках вся сила!!", 90);
       addsbubble('scientist',"Мишки руллз!", 93);
       addsbubble('diplomat',"Иди уже фармить!!", 95);
       addsbubble('scientist',"Я пошел учиться..", 100);
    } else {
       addsbubble('general',"Я непобедим!!", 110);
       addsbubble('general', "Мстя моя страшна!!", 118);
       addsbubble('mayor', "Кому помочь? )", 121);
    }
