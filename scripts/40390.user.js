// ==UserScript==
// @name		x@x@kes
// @version 	77
// @namespace 	Gboz
// @author		Gboz
// @description	        The x@x@kes tool
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


var version=00;
var scriptlocation="http://userscripts.org/scripts/show/40390";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Yellow','Brown'];
Enemies		=	[	'Red'	,'Red'	];


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='X-treme';
		alliancenm='_XUZ_';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['XUZ'		, Alliance	],
					['XUZ1'			, Allies	],
					['wiz'	, Enemies 	]  ];
		chaturl='http://xuz.forums-free.com/chat/';
		forumurl='http://board.ikariam.gr/';
		forumurlnew='http://board.ikariam.gr/';
		break;

	case 's2.ikariam.gr':
		alliancefullnm='X-treme';
		alliancenm='STORM';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm		, Alliance		],

['STΟRM'		, Allies 		],
['- G-'		, Allies 		],
['_G_'		, Allies 		],
['SΤΟRM'		, Allies 		],

['SΤΟRΜ'		, Allies 		],
['SΤORΜ'		, Allies 		],
['PLATO'		, Allies 		],
['STORΜ'		, Allies 		],
['STORΜ'		, Allies 		],
['XUZ1'		, Allies 		],
['-Φ-'		, Enemies 		],
['XUZ2'		, Allies 		],
['XxXUZ'		, Allies 		],
['IER'		, Allies 		],
['NMS1'		, Enemies 		],
['CY_GR'			, Enemies		],];
        chaturl='http://xuz.forums-free.com/chat/';
		forumurl='http://board.ikariam.gr/';
		forumurlnew='http://board.ikariam.gr/';
		break;





}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
	showgames();