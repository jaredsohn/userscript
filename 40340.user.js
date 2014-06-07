// ==UserScript==
// @name		FERRAMENTA IKA
// @version 	79
// @namespace 	MestreWar
// @author		MestreWar
// @description	The Corsairs alliance Tools - ika-core
// @include		http://s9.ikariam.*/*
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

var version=81;
var scriptlocation="http://userscripts.org/scripts/show/40340.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='N 1';
		alliancenm='N 1';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['N 2'			, Allies	],
					['N 3'			, Allies	],
                                        ['-TK-'			, Allies	],
                                        ['-SUN-'		, Allies	],
                                        ['EMT'			, Allies	],
                                        ['GARRA'		, Enemies	],
                                        ['FEAR2'		, Enemies 	],
	                                ['FENIX'		, Enemies	],
					['HELL'			, Enemies 	],
					['HIC'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	
	//for a friend
	case 's9.ikariam.*/*':
		alliancefullnm='N 1';
		alliancenm='N 1';
		alliance=[	[ alliancenm		, Alliance	],
					['N 2'			, Allies	],
					['N 3'			, Allies	],
                                        ['-TK-'			, Allies	],
                                        ['-SUN-'		, Allies	],
                                        ['EMT'			, Allies	],
                                        ['GARRA'		, Enemies	],
                                        ['FEAR2'		, Enemies 	],
	                                ['FENIX'		, Enemies	],
					['HELL'			, Enemies 	],
					['HIC'			, Enemies 	]  ];
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
	
 /*    var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Você é o cara!", 68);
       addsbubble('scientist',"Que cara?", 71);
       addsbubble('diplomat',"Um dos membros da N 1.", 72);
       addsbubble('scientist',"Que N 1?", 74);
       addsbubble('diplomat',"A Aliança N 1.", 77);
       addsbubble('scientist',"Quem é?", 79);
       addsbubble('diplomat',"Você é.", 81);
       addsbubble('scientist',"Legal.", 83);
       addsbubble('diplomat',"Você é o cara!", 85);
       addsbubble('scientist',"Que cara?", 88);
       addsbubble('diplomat',"Um dos membros da N 1.", 90);
       addsbubble('scientist',"Quem é N 1?", 93);
       addsbubble('diplomat',"N 1 é a melhor!", 95);
       addsbubble('scientist',"Levante-se. Vamos nessa!", 100);
    } else {
       addsbubble('general',"Ferro nos INIMIGOS.", 110);
       addsbubble('general', "Vamos forçar em cima deles.", 118);
       addsbubble('mayor', "Eu vou te ajudar!", 121);
    }

*/