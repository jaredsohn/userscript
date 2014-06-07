// ==UserScript==
// @name		LADDK
// @version 	82
// @namespace 	Gboz
// @author		Gboz
// @description	LADDK - LADDK-core
// @include		http://s*.ikariam.*/*
// @require		http://farm.olympe-network.com/LADDK/LADDK-core.js
// ==/UserScript==
// ===========================================================================

var version=1;
var scriptlocation="http://farm.olympe-network.com/LADDK/LADDK.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Ange Dechus';
		alliancenm='LADDK';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['ALLY'			, Allies	],
					['ENNEMY'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://laddk.chatango.com/';
		//forumurl='.';
		forumurl='http://angesdechus.abcnouvellesduweb.com';
		//forumurlnew='.';
		forumurlnew='http://angesdechus.abcnouvellesduweb.com/search.php?search_id=newposts&sid=5c8d474f0c0f39097b9a239ace31925e';
		break;
	case 's10.ikariam.fr':
		alliancefullnm='Ange Dechus';
		alliancenm='LADDK';
		alliance=[	['No alliance', NoAlliance	],
					[alliancenm	, Alliance		],				
					['ARGO'		, Allies 		],
					['ENNEMY'	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://laddk.chatango.com/';
		//forumurl='.';
		forumurl='http://angesdechus.abcnouvellesduweb.com/viewforum.php?f=54&sid=5c8d474f0c0f39097b9a239ace31925e';
		//forumurlnew='.';
		forumurlnew='http://angesdechus.abcnouvellesduweb.com/search.php?search_id=newposts&sid=5c8d474f0c0f39097b9a239ace31925e';
		break;
			case 's7.ikariam.fr':
		alliancefullnm='Ange Dechus';
		alliancenm='LAD';
		alliance=[	['No alliance', NoAlliance	],
					[alliancenm	, Alliance		],				
					['FUSI'		, Allies 		],
					['-FCL-'		, Allies 		],
					['KOH'		, Allies 		],
					['ENNEMY'	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://laddk.chatango.com/';
		//forumurl='.';
		forumurl='http://angesdechus.abcnouvellesduweb.com/viewforum.php?f=53&sid=2c4e1210f0defd0d1ea7643f6d8548e0';
		//forumurlnew='.';
		forumurlnew='http://angesdechus.abcnouvellesduweb.com/search.php?search_id=newposts&sid=5c8d474f0c0f39097b9a239ace31925e';
		break;
					case 's8.ikariam.fr':
		alliancefullnm='Terror Angel';
		alliancenm='-TA-';
		alliance=[	['No alliance', NoAlliance	],
					[alliancenm	, Alliance		],				
					['UDT'		, Allies 		],
					['ENNEMY'	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://terrorangel.chatango.com';
		//forumurl='.';
		forumurl='http://terror-angel.abcnouvellesduweb.com/';
		//forumurlnew='.';
		forumurlnew='.';
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