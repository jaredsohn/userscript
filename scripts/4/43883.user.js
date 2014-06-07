// ==UserScript==
// @name		Liga Delfos Script
// @version 	82
// @namespace 	Gboz
// @author		Giovacove
// @description	Herramienta de la Liga Delfos - ika-core
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
var scriptlocation="http://liga_delfos.oamm.info/descargas/Liga_Delfos_script.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Liga Delfos';
		alliancenm='L_D';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['L_D2'		, Alliance	],
 					['L_D3'		, Alliance	],
					['UNION'			, Allies	],
					['UEL'			, Allies	],
					['D-P'			, Allies	],
					['IGNIS'			, Allies	],
					['ColK'			, Allies	],
					['Dals'			, Enemies 	],
					['CDA'			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='http://ligadelfos.foroactivo.net/portal.htm';
		chaturl='http://ligadelfos.foroactivo.net/portal.htm';
		//forumurl='http://liga_delfos.oamm.info';
		forumurl='http://liga_delfos.oamm.info';
		//forumurlnew='http://ligadelfos.foroactivo.net/forum.htm';
		forumurlnew='http://ligadelfos.foroactivo.net/forum.htm';
		break;
	
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"La L_D", 68);
       addsbubble('scientist',"Uyy la mejor alianza", 71);
       addsbubble('diplomat',"Si, el oráculo lo profetizó", 72);
       addsbubble('scientist',"Zeus y Apolo les dieron el Don", 74);
       addsbubble('diplomat',"Si?", 77);
       addsbubble('scientist',"Si, el don para ser los mejores", 79);
       addsbubble('diplomat',"Los mejores jugadores", 81);
       addsbubble('scientist',"Y los mas Cheveres", 83);
       addsbubble('diplomat',"JaJA Que nota estar en esta alianza", 85);
       addsbubble('scientist',"Si, pero no olvides entrar al Foro", 88);
       addsbubble('diplomat',"Y al chat", 90);
       addsbubble('scientist',"Y no enviar mensajes globales", 93);
       addsbubble('diplomat',"Y, crecer y crecer", 95);
       addsbubble('scientist',"Para seguir subiendo", 100);
    } else {
       addsbubble('general',"Que Viva la L_D", 110);
       addsbubble('general', "Hip Hip Urra por la Liga Delfos", 118);
       addsbubble('mayor', "Uraaaa", 121);
    }

*/