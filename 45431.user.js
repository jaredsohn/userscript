// ==UserScript==
// @name		annibal
// @version 	70
// @namespace 	annibal
// @author		annibal
// @description	        
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


var version=70;
var scriptlocation="http://userscripts.org/scripts/source/45422.user.js";


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='';
		alliancenm='FC';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                        ['F C'			, Allies	],
                                        ['-ISA-'		, Allies	],
					['FBS'			, Enemies 	],
					['-LTS-'			, Enemies 	] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://xat.com/chat/room/55309090/';
		//forumurl='.';
		forumurl='http://;
		//forumurlnew='.';
		forumurlnew='http://';
break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Hééé!man t'es là?", 68);
       addsbubble('scientist',"Quoi Hakkai?", 71);
       addsbubble('diplomat',"J'ai une bonne blague!", 72);
       addsbubble('scientist',"T'es lourd!", 74);
       addsbubble('diplomat',"Que dit la fesse droite à la gauche?", 77);
       addsbubble('scientist',"Huuuumm...", 79);
       addsbubble('scientist',"Je vois pas...", 83);
       addsbubble('diplomat',"ça va chier entre nous!", 85);
       addsbubble('scientist',"...", 88);
       addsbubble('diplomat',"Elle est bonne non?", 90);
       addsbubble('scientist',"ça doit etre ça...", 93);
       addsbubble('diplomat',"...", 95);
       addsbubble('diplomat',"Hééé, Z'ètes là?", 100);
       addsbubble('general',"...", 110);
       addsbubble('mayor', "Dégage avec tes blagues de merde!", 118);
       addsbubble('general', "Pas mieux!", 121);
       addsbubble('diplomat', "... bon ok!", 124);
       addsbubble('diplomat', "Pourtant elle est cool ma blague!", 127);
       addsbubble('scientist', "Il ne se taiera donc jamais...", 127);
}

*/