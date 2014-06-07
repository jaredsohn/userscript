// ==UserScript==
// @name	Night Warrior Alliance 
// @version 	1
// @namespace 	biccius
// @author	biccius
// @description	Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================
// Original code by Gboz

var version=1;
var scriptlocation="http://userscripts.org/scripts/source/35976.user.js";

Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Purple','Brown'];
Enemies		=	[	'Red'	,'Red'	];
switch (location.host) {
	//case 's1.ikariam.com':
	default:
		alliancefullnm='Night Warriors';
		alliancenm='NWRRS';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['FoxH'			, Allies	],
					['-O-M-'			, Allies	],
					['a l a'			, Allies	],
					['A_BKG'			, Allies	],
					['Damn'			, Allies	],
					['FLAME'			, Allies	],
					['GGBF'			, Allies	],
					['HRUB'			, Allies	],
					['IUPES'			, Allies	],
					['OFF'			, Allies	],
					['OPRA'			, Allies	],
					['PrTn'			, Allies	],
					['SLK'			, Allies	],
					['TFX3'			, Allies	],
					['THS'			, Allies	],
					['OFF'			, Allies	],
					['SSST'			, Allies	],
					['รєгรє'			, Allies	],
					['calla'	                , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://www.xat.com/NWRRS';
		//forumurl='.';
		forumurl='http://nwrrs.forumfree.net';
		//forumurlnew='.';
		forumurlnew='http://nwrrs.forumfree.net/?act=Search&CODE=getactive';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	

