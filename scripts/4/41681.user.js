// ==UserScript==
// @name		PeaceMakers Tools
// @version 	3.2
// @namespace 	DocOctavius
// @author		Gboz
// @description PeaceMakers Alliance Tools - ika-core
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

var version=3.2;
var scriptlocation="http://userscripts.org/scripts/source/41681.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='PeaceMakers';
		alliancenm='MAS';		
		alliance=[	['Fara Alianta'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['MAS1'		, Allies	],
					['MASw'		, Allies	],
					['LOrD'		, Enemies 	],
					['PNst'		, Enemies 	]   ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		forumurl='.';
		forumurlnew='.';
		break;
	case 's7.ikariam.ro':
		alliancefullnm='PeaceMakers';
		alliancenm='MAS';
		alliance=[	['Fara Alianta', NoAlliance	],
				[alliancenm	, Alliance	],
				['MAS1'		, Allies	],
				['MASw'		, Allies	],
				['ANM'		, Allies	],					
				['ARM'		, Allies 	],
				['ARM-A'	, Allies 	],
				['PSSP'		, Allies 	],
				['LOrD'		, Enemies	],
				['PNst'		, Enemies	]
				];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='http://xat.com/LaTaclale';
		forumurl='http://peacemakers.bbster.net/';
		forumurlnew='.';
		break;
	//for a friend
	
}
	main();
	ToolsMenu();
	fixtreaties();
	
/*
var showbubble=Math.floor(Math.random()*3)+1;
    switch (showbubble) { 
      case 1: addsbubble('diplomat',"A venit!", 5); break;
      case 2: addsbubble('scientist',"A venit!", 5); break;
      case 3: addsbubble('general',"A venit!", 5); break;
      case 4: addsbubble('mayor',"A venit!", 5); break;
      default: addsbubble('diplomat',"A venit!", 5);
}
var showbubbleB=Math.floor(Math.random()*3)+1;
    switch (showbubbleB) {
      case 1: addsbubble('diplomat',"Cine? Ce?", 9); break;
      case 2: addsbubble('scientist',"Cine? Ce?", 8); break;
      case 3: addsbubble('general',"Cine? Ce?", 9); break;
      case 4: addsbubble('mayor',"Cine? Ce?", 9); break;
      default: addsbubble('scientist',"Cine? Ce?", 8);
}
var showbubbleC=Math.floor(Math.random()*3)+1;
    switch (showbubbleC) {
      case 1: addsbubble('diplomat',"Versiunea 0.3", 15); break;
      case 2: addsbubble('scientist',"Versiunea 0.3", 15); break;
      case 3: addsbubble('general',"Versiunea 0.3", 15); break;
      case 4: addsbubble('mayor',"Versiunea 0.3", 15); break;
      default: addsbubble('general',"Versiunea 0.3", 15);
}
var showbubbleD=Math.floor(Math.random()*3)+1;
    switch (showbubbleD) {
      case 1: addsbubble('diplomat',"Aur intangibil!", 20); break;
      case 2: addsbubble('scientist',"Cercetari noi!", 18); break;
      case 3: addsbubble('general',"Armata ieftina!", 19); break;
      case 4: addsbubble('mayor',"Cladiri noi!", 20); break;
      default: addsbubble('Mayor',"PeaceMakers!", 20);
}
*/