// ==UserScript==
// @name		The Spartans 300
// @version 	79
// @namespace 	Gboz
// @author		Gboz
// @description	The Spartans 300 alliance Tools - ika-core
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

var version=80;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Spartans 300';
		alliancenm='300';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['300'			, Alliance		],
					['ARGO'		        , Allies 		],
					['ARK'			, Allies 		],
					['Atl'			, Allies 		],
					['Atl 3'		, Allies 		],
					['Atl 4'		, Allies 		],
					['CoR'			, Allies 		],
					['DeLe2'		, Allies 		],
					['dikas'		, Allies 		],
					['G_O_W'		, Allies 		],
					['LBR'			, Allies 		],
					['LgS'			, Allies 		],
					['G_O_W'		, Allies 		],
					['LoG-5'		, Allies 		],
					['Mak'			, Allies 		],
					['Peac2'		, Allies 		],
					['Peace'		, Allies 		],
					['THK'		        , Allies 		],
					['UED'		        , Allies 		],
					['DeLe'			, Allies 		],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://Spartans-300.great-forum.com';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='Spartans 300';
		alliancenm='300';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[ alliancenm	        , Alliance	],
					['300Jr'			, Alliance		],
					['ARGO'		        , Allies 		],
					['ARK'			, Allies 		],
					['Atl'			, Allies 		],
					['Atl 3'		, Allies 		],
					['Atl 4'		, Allies 		],
					['CoR'			, Allies 		],
					['DeLe2'		, Allies 		],
					['dikas'		, Allies 		],
					['G_O_W'		, Allies 		],
					['LBR'			, Allies 		],
					['LgS'			, Allies 		],
					['G_O_W'		, Allies 		],
					['LoG-5'		, Allies 		],
					['Mak'			, Allies 		],
					['Peac2'		, Allies 		],
					['Peace'		, Allies 		],
					['THK'		        , Allies 		],
					['UED'		        , Allies 		],
					['DeLe'			, Allies 		],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://Spartans-300.great-forum.com';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	
}
	main();
	ToolsMenu();
	fixtreaties();
	
var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Προσοχή στα αποθέματα υλικών", 68);
       addsbubble('scientist',"Δεν στέλνουμε άσχετα κυκλικά", 78);
       addsbubble('scientist',"Καθημερινές επιθέσεις σε ανενεργούς", 100);
       addsbubble('diplomat',"Να ακολουθήται τους κανόνες της συμμαχίας", 110);
       addsbubble('diplomat',"Όχι επιθέσεις σε Συμμάχους", 130);
       addsbubble('scientist',"Υπάρχει και το Forum εκτός από τα Κυκλικά", 140);
       addsbubble('mayor',"Μολών Λαβέ", 150);
       addsbubble('scientist',"Μην ξεχνάτε τις αναβαθμήσεις", 160);
       addsbubble('diplomat',"Προσφέρετε βοήθεια στους συμμάχους σας", 170);
       addsbubble('mayor',"Να έχετε μπόλικα πολεμικά καράβια σε κάθε πόλη", 180);
       
    } else {
       addsbubble('general',"Στρατό ετοιμοπόλεμο", 210);
       addsbubble('general', "Στόλο ετοιμοπόλεμο", 220);
       addsbubble('mayor', "Μολών Λαβέ", 230);
    }