// ==UserScript==
// @name		GyF Tools
// @version 	82
// @namespace 	Gboz
// @author		Gboz
// @description	GYf alliance Tools - ika-core
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
		alliancefullnm=' Gordos y Feos';
		alliancenm='GYF';		
		alliance=[	['?o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					[ 'LsT'		, Enemies	], 
					[ 'c_lst'	, Enemies	],
					[ '3 LsT'	, Enemies	],
					[ 'BOS'		, Enemies	],
					[ 'ATH'		, Enemies	], ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://thecorsairs.playogame.com/chatbox_mod/chatbox.forum';
		//forumurl='.';
		forumurl='http://gordosyfeos.co.cc/';
		forumurlnew='.';
		//forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	case 's8.ikariam.es':
		alliancefullnm=' Oddin';
		alliancenm='ODN';
		alliance=[	['?o alliance', NoAlliance	],
					[alliancenm	, Alliance		],
					['ODN2'		,Allies			],
					['-TW-'			, Enemies	],
					['WRC'			, Enemies	],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://thecorsairs.playogame.com/chatbox_mod/chatbox.forum';
		//forumurl='.';
		forumurl='http://senatuspqr.mundoforo.com/';
		forumurlnew='.';
		//forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Viva el dictador.", 68);
       addsbubble('scientist',"Quien es el dictador?", 71);
       addsbubble('diplomat',"Ni idea, con eso de la rotacion.", 72);
       addsbubble('scientist',"Balla dictador, que pasa el cargo.", 74);
       addsbubble('diplomat',"Todo sea por proteccion.", 77);
       addsbubble('scientist',"Por que proteccion.", 79);
       addsbubble('diplomat',"Pues para que, no le culpen de algun ataque...", 81);
       addsbubble('scientist',"Haaaa.... tremendo cobarde.", 83);
       addsbubble('diplomat',"Calla, que tu eres el primero que corres!!!.", 85);
       addsbubble('scientist',"Shhhhhhhh...", 88);
       addsbubble('diplomat',"Pues no critiques al dictador...", 90);
       addsbubble('scientist',"Por que?", 93);
       addsbubble('diplomat',"por que es mi turdo de dictar... hahaha.", 95);
       addsbubble('scientist',"Psss. gran cosa..", 100);
       addsbubble('mayor', "Carajo sieg no, no puedes atacar!!! grrrrr....", 111);
    } else {
       addsbubble('general',"Hey, quiero petar a alguien...", 110);
       addsbubble('general', "Quien me ayuda?.", 118);
       addsbubble('mayor', "Busca al sieg, el siempre quiere.", 121);
    }

*/