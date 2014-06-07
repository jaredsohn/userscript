// ==UserScript==
// @name	Ika-LiKi-Tools
// @version 	13
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

var version=12;
var scriptlocation="http://userscripts.org/scripts/source/42900.user.js";

switch (location.host) {
	//case 's1.ikariam.com':
	default:
		alliancefullnm='LionKing';
		alliancenm='LiKi';		
		alliance=[	['Νo alliance'	, NoAlliance    ],
				[ alliancenm	, Alliance	],
                                ['THULE'	, Allies	],
				['GREEK'	, Allies	],
				['DHLOS'	, Allies	],
				['GREEK'	, Allies	],
				['Liki2'	, Allies	],
				['MAST'		, Allies	],
				['GENES'	, Allies	],
				['PEACE'	, Allies	],
				['ESY'		, Allies	],
				['NMS'		, Allies	],
				['ELM'		, Allies	],
				['ELM2'		, Allies	],
				['SOD'  	, Allies	],
				['TBK'		, Allies	],
				['җDeLe'	, Allies	],
				['NoNe'         , Enemies 	]
  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='.';
		forumurl='http://alliancelionking.forumup.gr ';
		//forumurl= 'http://alliancelionking.forumup.gr ';
		forumurlnew='.' ;
		//forumurlnew='.';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	


