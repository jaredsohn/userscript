// ==UserScript==
// @name		ExFal
// @version 	05
// @namespace 	Ikariam
// @author		Danger
// @description	ExFal Alliance Tools - ika-core
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

var version=05;

var scriptlocation="http://userscripts.org/scripts/source/38161.user.js";

// Settings for every server

switch (location.host) {
	default:
		alliancefullnm='ExFal';
		alliancenm='ExFal';			
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['NTC'			, Allies	],
					['INCA'			, Allies	],
                                        ['NTCa'			, Allies	],
                                        ['STR'			, Allies	],
                                        ['TMP'			, Allies	],
                                        ['AHU'			, Allies	],
                                        ['VKG'		        , Enemies 	],
					[''			, Enemies 	]  ];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
//		chaturl='http://EXFAL.freeshoutbox.net/';
		forumurl='.';
//		forumurl='http://EXFALally.muux.org/index.php?sid=a3825847b0ac235e1d6ddb115911ebee';
		forumurlnew='.';
//		forumurlnew='http://EXFALally.muux.org/search.php?search_id=newposts';
		break;

	case 's4.ikariam.com.br':
		alliancefullnm='ExFal';
		alliancenm='ExFal';			
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['NTC'			, Allies	],
					['INCA'			, Allies	],
                                        ['NTCa'			, Allies	],
                                        ['STR'			, Allies	],
                                        ['TMP'			, Allies	],
                                        ['AHU'			, Allies	],
                                        ['VKG'		        , Enemies 	],
					[''			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
//		chaturl='http://EXFAL.freeshoutbox.net/';
		forumurl='.';
//		forumurl='http://EXFALally.muux.org/index.php?sid=a3825847b0ac235e1d6ddb115911ebee';
		forumurlnew='.';
//		forumurlnew='http://EXFALally.muux.org/search.php?search_id=newposts';
		break;

}
	main();
	ToolsMenu();
	fixtreaties();

/*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Você é o cara!", 68);
       addsbubble('scientist',"Que cara?", 71);
       addsbubble('diplomat',"Um dos membros da ExFal.", 72);
       addsbubble('scientist',"Que ExFal?", 74);
       addsbubble('diplomat',"A Aliança ExFal.", 77);
       addsbubble('scientist',"Quem é?", 79);
       addsbubble('diplomat',"Você é.", 81);
       addsbubble('scientist',"Legal.", 83);
       addsbubble('diplomat',"Você é o cara!", 85);
       addsbubble('scientist',"Que cara?", 88);
       addsbubble('diplomat',"Um dos membros da ExFal.", 90);
       addsbubble('scientist',"Que ExFal?", 93);
       addsbubble('diplomat',"N 1 é a melhor!", 95);
       addsbubble('scientist',"Levante-se. Vamos nessa!", 100);

    } else {
       addsbubble('general',"Ferro nos INIMIGOS.", 110);
       addsbubble('general', "Vamos forçar em cima deles.", 118);
       addsbubble('mayor', "Eu vou te ajudar!", 121);
    }
*/