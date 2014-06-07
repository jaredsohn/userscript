// ==UserScript==
// @name	Ika-core-SearchTools
// @version 	9
// @namespace 	Gboz
// @author	Gboz
// @description	Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched. Your not allowed to edit or copy ika-core.js, read license inside the file.
// You can create a copy of Ika-core-SearchTools.user.js and host it anywhere, when a new version of ika-core.js comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=9;
var scriptlocation="http://userscripts.org/scripts/version/60304/135248.user.js";

switch (location.host) {	
	default:
		alliancefullnm='Fuerzas Elite de Invasión y Saqueo';
		alliancenm='FEIS';		
		alliance=[	['Без альянсу'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['ANTI2'	, Alliance		],
					['DяIĂ'			, Allies	],
					['EXCOR'			, Allies	],
					['FFEIS'			, Allies	],
					['LAST2'			, Allies	],
					['TEM'			, Allies	],
					['UML'			, Allies	],
					['WP-1'			, Allies	],
					['WrSpi'			, Allies	],
					['OS-AS'			, Allies 	],
					['_0_ '			, Enemies 	],
					['Z-DRA'			, Enemies 	]  ];

		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.yourforum.com/chat';
		forumurl='http://cuartelfeis.foroactivo.info/';
		//forumurl='http://www.yourforum.com/forum/new';
		forumurlnew='.' ;
		//forumurlnew='http://www.yourforum.com/forum/';
		break;
}
	

