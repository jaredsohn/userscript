// ==UserScript==
// @name		CdO Tools - ika-core based
// @version 	10
// @namespace 	Gboz
// @author		Gboz (Modded By Twister)
// @description	Alianza Caballeros de Orion
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest and the search functionality it prvides.
// script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=10;
var scriptlocation="http://userscripts.org/scripts/source/37061.user.js";


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Caballeros de Orion ';
		alliancenm='CdO';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['MNV'			, Allies	],
                                        
                                        ['SFH'			, Allies	],
                                       ['C-SFH'			, Allies	],
                                        ['IMAT'			, Allies	],
                                       ['Astur'			, Allies	],
                                       ['C-Ast'			, Allies	],
                                       ['L1ºL'			, Allies	],
                                       ['LCJ'			, Allies	],
                                       ['Rokrs'			, Allies	],  ];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://cdorion.foroactivo.com.es/chatbox/chatbox.forum?';
		//forumurl='.';
		forumurl='http://cdorion.foroactivo.com.es/';
                //forumurlnew='.';
		forumurlnew='http://cdorion.foroactivo.com.es/search.forum?search_id=newposts';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='Caballeros de Orion ';
		alliancenm='CdO';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['MNV'			, Allies	],
                                        
                                        ['SFH'			, Allies	],
                                       ['C-SFH'			, Allies	],
                                        ['IMAT'			, Allies	],
                                       ['Astur'			, Allies	],
                                       ['C-Ast'			, Allies	],
                                       ['L1ºL'			, Allies	],
                                       ['LCJ'			, Allies	],
                                       ['Rokrs'			, Allies	],  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//forumurl='.';
		forumurl='http://cdorion.foroactivo.com.es/';
		break;
	//for a friend
	case 's4.ikariam.gr':
		alliancefullnm='Caballeros de Orion ';
		alliancenm='CdO';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://cdorion.foroactivo.com.es/chatbox/chatbox.forum?';
		//forumurl='.';
		forumurl='http://cdorion.foroactivo.com.es/';
                //forumurlnew='.';
		forumurlnew='http://cdorion.foroactivo.com.es/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Recuerdas es este tipo?", 68);
       addsbubble('scientist',"Que tipo?", 71);
       addsbubble('diplomat',"El hombre del poder", 72);
       addsbubble('scientist',"Que poder?", 74);
       addsbubble('diplomat',"El poder del Hoodoo.", 77);
       addsbubble('scientist',"Quien?", 79);
       addsbubble('diplomat',"Tu.", 81);
       addsbubble('scientist',"Yo que?", 83);
       addsbubble('diplomat',"Recuerdas es este tipo", 85);
       addsbubble('scientist',"Que tipo?", 88);
       addsbubble('diplomat',"El hombre del poder", 90);
       addsbubble('scientist',"Que poder?", 93);
       addsbubble('diplomat',"No Molestes", 95);
       addsbubble('scientist',"No molestes y vete", 100);
    } else {
       addsbubble('general',"Yo ire por el poder Voodoo, quien que? ..", 110);
       addsbubble('general', "yo destruire esa torre.", 118);
       addsbubble('mayor', "Yo te ayudare.", 121);
    }

*/