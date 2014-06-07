// ==UserScript==
// @name		The Conquers Tools
// @version 	82
// @namespace 	Gboz
// @author		Gboz (modified by DTvenom)
// @description	The Conquers alliance Tools
// @include		http://s*.ikariam.gr*/*
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

var version=84;
var scriptlocation="http://userscripts.org/scripts/source/45774.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Corsairs';
		alliancenm='CoR';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['COR 2'		, Alliance	],
					['ΒΑΝΚ'			, Allies	],
					['-=+'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='.';
		//forumurl='http://cor-atle.highbb.com/';
		forumurlnew='.';
		//forumurlnew='http://cor-atle.highbb.com/search.forum?search_id=newposts';
		break;
	case 's2.ikariam.gr':
		alliancefullnm='Conquers';
		alliancenm='con';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm , Alliance ],
					['-SP-', Allies],
					['-ST-', Allies],
					['ANF', Allies],
					['AoD2', Allies],
					['AOM', Allies],
					['BlacA', Allies],
					['DDR', Allies],
					['DKT', Allies],
					['EmPs', Allies],
					['EmPs2', Allies],
					['FOS 2', Allies],
					['GLT', Allies],
					['Goth', Allies],
					['HELL', Allies],
					['IkarS', Allies],
					['kriti', Allies],
					['Life', Allies],
					['LoG-A', Allies],
					['LoGA2', Allies],
					['LogAI', Allies],
					['Log_S', Allies],
					['LοG-A', Allies],
					['MAK', Allies],
					['MAK A', Allies],
					['P-T', Allies],
					['PAC', Allies],
					['plapo', Allies],
					['plt', Allies],
					['PNDBX', Allies],
					['Poke', Allies],
					['PORT2', Allies],
					['PORTO', Allies],
					['PrrS', Allies],
					['SATYR', Allies],
					['T_smd', Allies],
					['wcs', Allies],
					['YNG', Allies],
					['ΑΤΙ', Allies],
					['Ε-Η', Allies],
					['ΤRΗ', Allies]
					];
		
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='.';
		forumurlnew='.';
		break;
	//for a friend
	case 's8.ikariam.gr':
		alliancefullnm='Kings Of Chaos';
		alliancenm='KOC';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ],
					['-INS-', Allies],
					['FOS', Allies],
					['STORM', Allies]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='.';
		forumurl='.';
		forumurlnew='.';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Ti Ginete?.", 68);
       addsbubble('scientist',"kala esi?", 71);
       addsbubble('diplomat',"kala. tipote nea?", 72);
       addsbubble('scientist',"tipote esi?", 74);
       addsbubble('diplomat',"tipote.", 77);
       addsbubble('scientist',"Varkoume.", 79);
       addsbubble('diplomat',"Me2.", 81);
       addsbubble('scientist',"Giati en pezi toutos?", 83);
       addsbubble('diplomat',"En ksero. Prepi na efie.", 85);
       addsbubble('scientist',"Pou epie?", 88);
       addsbubble('diplomat',"Pou ena ton dis rota ton.", 90);
       addsbubble('scientist',"Lalis na eparetise?", 93);
       addsbubble('diplomat',"En nomizo...", 95);
       addsbubble('general',"Fkarte faousa!! EPELLANE MAS!", 100);
    } else {
       addsbubble('general',"AEL?", 110);
       addsbubble('general', "Mpravo", 118);
       addsbubble('mayor', "AEL LAOS PROTATHLIMA REE!!!.", 121);
    }

*/