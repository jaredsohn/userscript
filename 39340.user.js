// ==UserScript==
// @name		TW & TW2 Tools
// @version 		3
// @namespace 		Gboz
// @author		Gboz, modify by Vachan
// @description		Total War alliance Tools - ika-core, modify for TW
// @include		http://s8.ikariam.*/*
// @require		http://boxstr.com/files/3933982_qfavv/ika-core.js
// ==/UserScript==
// ===========================================================================
var version=3;
var scriptlocation="http://boxstr.com/files/3785480_nqlml/ika-core.js";

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
		alliancefullnm='Total War';
		alliancenm='-TW-';		
		alliance=[	['?o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['TW2'		, Alliance	],
					['THX'		, Allies	],
					['MGMP'		, Allies	],
					['ALARS'	, Allies	],
					['13T'		, Enemies 	],
					['SOMHA'	, Enemies 	],
					['OdS'		, Enemies 	],
					['OdDiN'	, Enemies 	],
					['WRC'		, Enemies 	]  ];
		chaturl='http://totalwar.forospanish.com/chatbox/chatbox.forum';
		forumurl='http://totalwar.forospanish.com/forum.htm';
		forumurlnew='http://totalwar.forospanish.com/forum.htm';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
//	showgames();