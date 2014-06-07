// ==UserScript==
// @name		The Ika-core Tools EPXS
// @version 	85
// @namespace 	Gboz
// @author		Gboz
// @description	The Ika-core Tools for Alliance - EPXS
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

var version=85;
var scriptlocation="http://www.ika-core.org/scripts/ika-core-tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Elite Phalanxes';
		alliancenm='EPXS';		
		alliance=[	['�o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['EPXS'		, Alliance	],
					['EPXS2'		, Allies	],
					['-=+'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='http://imgroups.net/gid-600931';
		chaturl='http://imgroups.net/gid-600931';
		forumurl='http://epxs.foroactivo.com';
		//forumurl='http://epxs.foroactivo.com';
		forumurlnew='.';
		//forumurlnew='http://=newposts';
		break;
}
	
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Me Recuerdas a Alguien.", 68);
       addsbubble('scientist',"A Quien?", 71);
       addsbubble('diplomat',"Al Hombre Con Poderes.", 72);
       addsbubble('scientist',"Que Poderes?", 74);
       addsbubble('diplomat',"El poder del Que hacer.", 77);
       addsbubble('scientist',"Que Hacer?", 79);
       addsbubble('diplomat',"Tu Haces.", 81);
       addsbubble('scientist',"Hacer Que?", 83);
       addsbubble('diplomat',"Recordarme al Hombre.", 85);
       addsbubble('scientist',"Que Hombre?", 88);
       addsbubble('diplomat',"El Hombre Con el Poder.", 90);
       addsbubble('scientist',"Que poder?", 93);
       addsbubble('diplomat',"Te Rindes?", 95);
       addsbubble('scientist',"Rindete Anda.", 100);
    } else {
       addsbubble('general',"Te van a Hacer Voodoo..", 110);
       addsbubble('general', "yo lo tiro de la torre.", 118);
       addsbubble('mayor', "Te Ayudo.", 121);
    }

*/