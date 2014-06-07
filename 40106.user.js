// ==UserScript==
// @name	-GT-
// @version 	6
// @namespace 	HeRmano
// @author	HeRmano e Canibal
// @description	Ika-core para a aliança -GT-.
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

var version=6;


switch (location.host) {
	//case 's4.ikariam.com':
	default:
		alliancefullnm='Guerreiros Templarios';
		alliancenm='-GT-';		
		alliance=[	['Νo alliance'	, NoAlliance],
				['-GT-'	, Alliance	],
				['-GF-'		, Allies	],
				['-TT-'		, Allies	],
				['-TTD-'		, Allies	],
				['STR'		, Allies	],
				['UFF'		, Enemies	],
				['UFFA'		, Enemies	],
				['VKG'		, Enemies	],
				['P7M'          , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.yourforum.com/chat';
		forumurlnew='.' ;
		//forumurlnew='http://www.yourforum.com/forum/';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	

