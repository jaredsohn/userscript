// ==UserScript==
// @name           Dark Scorpions -ika-tools-
// @version        v4
// @namespace      http://lebedesign.ru
// @description    Dark Scorpions Alliance - Ika-core tools
// @author         Eureka
// @require	   http://www.ika-core.org/scripts/ika-core.js
// @include        http://s3.ru.ikariam.com/*
// @exclude        http://board.ru.ikariam.com/*
// ==/UserScript==


var version=4;
var scriptlocation="http://userscripts.org/scripts/source/41551.user.js";

// Set the highlight colors for every case
// can be red, green, blue etc
// also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
// or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
// if u still dont understand google for html style color

// Alliance	=	[	'Green'	,'Green' ];
// Allies		=	[	'Cyan'	,'Cyan'];
// NoAlliance	=	[	'Pink'	,'Pink'	];
// Enemies		=	[	'Red'	,'Red'	];

// Settings

switch (location.host) {


	case 'http://s3.ru.ikariam.com/':
		alliancefullnm='DARK SCORPIONS';
		alliancenm='DSS';		
		alliance=[	['NoAlliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['-Eld-'		, Allies	],
					['-KS-'	, Allies	],
					['-SU-'		, Allies	],
					['-XTR-' 	, Allies	],
					['NoVaA'	, Allies	],
					['402 У' 	, Allies	],
					['A-LD'		, Allies	],
					['ASSAR'	, Allies	],
					['cure'		, Allies	],
					['DKD' 	        , Allies	],
					['DLF' 	        , Allies	],
					['FVarn' 	, Allies	],
					['GAJ'		, Allies	],
					['Nova'	        , Allies	],
					['SIS'          , Allies        ],
					['SoG'	        , Allies	],
					['S_S_K'	        , Allies	],
					['TFFC'	        , Allies	],
					['WOH'	        , Allies	],
					['XIII'	        , Allies	],
					['XIII-'	        , Allies	],
					['_SE_'	        , Allies	],
					
					[''		, Enemies 	]  ];

// Use the DOT (.) to not include the chat, forum, forumnew in the menu.
	chaturl='.';
	forumurl='http://lebedesign.ru/';
	forumurlnew='http://lebedesign.ru/index.php?action=unread' ;
	break;

}

	main();
	ToolsMenu();
	

