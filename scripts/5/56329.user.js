// ==UserScript==
// @name		L-D Tools
// @version 		3
// @namespace 		Gboz
// @author		Gboz, modify by bpdc
// @description		The Corsairs alliance Tools - ika-core, modify for L-D
// @include		http://s6.ikariam.*/*
// @require		http://www.opendrive.com/files/5704266_Hx6YE/ika-core.js
// ==/UserScript==
// ===========================================================================
var version=3;
var scriptlocation="http://www.opendrive.com/files/5704266_Hx6YE/ika-core.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Black'	,'Pink'];
Enemies		=	[	'Red'	,'Red'	];

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm=' Liga de Delos';
		alliancenm='L-D';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					[''		, Alliance	],
					[''		, Allies	],
                                        ['SPA'		, Enemies 	],
					['SPA2'	, Enemies 	],
                                        ['SEOS'		, Enemies 	],
					['Arkan'	, Enemies 	],
					['Arka'	, Enemies 	]  ];
		chaturl='http://ligadedeloszeta.activoforo.com/chatbox/chatbox.forum';
		forumurl='http://ligadedeloszeta.activoforo.com/forum.htm';
		forumurlnew='http://ligadedeloszeta.activoforo.com/forum.htm';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
//	showgames();