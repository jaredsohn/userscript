// ==UserScript==
// @name		SIA - Skype Ikariam & Alchool
// @version 	82
// @namespace 	Gboz, The_keyboard_drinker
// @author		Gboz , 
// @description	The AGD  - ika-core
// @include		http://s4.gr.ikariam.com/*
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
var scriptlocation="http://userscripts.org/scripts/source/40846.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='The Corsairs';
		alliancenm='AGD';		
		alliance=[	['Χωρίς Συμμαχία'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['CoR' , Alliance ],
                                        ['ΑGD' , Alliance ],
					['cccp' , Enemies ],
					['njoy' , Enemies ] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='http://xat.com/ikariamagd';
		forumurl='.';
		forumurlnew='.';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Prosoxh sta apothemata sas.", 68);
       addsbubble('scientist',"Ligotera asxeta kyklika", 78);
       addsbubble('mayor',"Kratate Apothemata Theio kai krasioy", 90);
       addsbubble('scientist',"Kathimerines Epitheseis se anenergoys", 100);
       addsbubble('diplomat',"Prosektikh anagnosh kanonismon", 110);
       addsbubble('mayor',"Oxi Asxeta kyklika", 120);
       addsbubble('diplomat',"Oxi Epitheseis Se symmaxoys", 130);
       addsbubble('scientist',"To GM Script ayto einai mono gia thn symaxia mas", 140);
       addsbubble('mayor',"Aekara Leme", 150);
       addsbubble('scientist',"Mhn ksexnas kai tis anabathmiseis", 160);
       addsbubble('diplomat',"Boithame symmaxoys", 170);
       addsbubble('mayor',"Mporei Na xreiastoyme Symmaxoys", 180);
       addsbubble('diplomat',"I Rule !", 190);
       addsbubble('scientist',"Na exoyme kai mia kabatza", 200);
    } else {
       addsbubble('general',"Strato etoimopolemo", 210);
       addsbubble('general', "Stolo Etoimopolemo", 220);
       addsbubble('mayor', "H Makedonia Einai Ellhnikh", 230);
    }