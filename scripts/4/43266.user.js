// ==UserScript==
// @name		ProMay
// @version 	01
// @namespace 	Nemonicus
// @author		nemonicus@hotmail.it
// @description	The Corsairs alliance Tools - ika-core
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it provides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=01;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Progetto Mayhem';
		alliancenm='Fight';		
		alliance=[	['No alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					['Figh1'		, Alliance	],
					['Figh2'		, Alliance	],
					['Figh3'		, Alliance	],
					['Figh4'		, Alliance	],
					['DLM'			, Allies 	],
					['DLM2'			, Allies 	],
					['DLM3'			, Allies 	],
					['THA'			, Allies 	],
					['TREX'			, Enemies 	],
					['-=+'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://allianzclub.forumfree.net/';
		//forumurlnew='.';
		forumurlnew='http://allianzclub.forumfree.net/?act=Search&CODE=getactive';
		break;
 }
    main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Ricordati di me", 68);
       addsbubble('scientist',"Che cosa ?", 71);
       addsbubble('diplomat',"L'uomo con il potere .", 72);
       addsbubble('scientist',"Quale potere ?", 74);
       addsbubble('diplomat',"Il potere dell'intelligenza e dell'astuzia .", 77);
       addsbubble('scientist',"E la scienza allora ?", 79);
       addsbubble('diplomat',"Se fusi saranno inarrestabili .", 81);
       addsbubble('scientist',"mmmmh", 83);
       addsbubble('diplomat',"Ricordatelo ...", 85);
       addsbubble('scientist',"Che aspettiamo ?", 88);
       addsbubble('diplomat',"Il momento propizio .", 90);
       addsbubble('scientist',"E sai quando sara'?", 93);
       addsbubble('diplomat',"Presto verra'", 95);
       addsbubble('scientist',"Allora prepariamoci !", 100);
    } else {
       addsbubble('general',"Nessuno puo' sfidare i Fight e rimanere impunito .", 110);
       addsbubble('general', "Al mio segnale scatenate l'inferno .", 118);
       addsbubble('mayor', "Ricordiamoci di dare un occhiata al forum Fight !", 121);
    }

*/