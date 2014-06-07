// ==UserScript==
// @name		Les Perses
// @version 	5
// @namespace 	Bloody Angel
// @author		Bloody Angel
// @description	Les Perses
// @include		http://s17.fr.ikariam.*/*
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

var version=5;
var scriptlocation="http://userscripts.org/scripts/source/121997.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Les perses';
		alliancenm='-LPS-';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['-LPS-'		, Alliance	],
					['LFO'		        , Allies	],
					['AFR'			, Enemies       ];
                                        
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='.';
		//forumurl='http://lesanges-ikariam.forumgratuit.be/';
		forumurlnew='.';
		//forumurlnew='.';
		break;
}
	
	
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