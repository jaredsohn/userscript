// ==UserScript==
// @name		PTN Tools
// @version 		3
// @namespace 		Gboz
// @author		Gboz, modify by bpdc
// @description		The Corsairs alliance Tools - ika-core, modify for PTN
// @include		http://s6.ikariam.*/*
// @require		http://boxstr.com/files/5420070_ibywr/ika-core.js
// ==/UserScript==
// ===========================================================================
var version=3;
var scriptlocation="http://boxstr.com/files/5420070_ibywr/ika-core.js";

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
		alliancefullnm='Panteras Negras';
		alliancenm='PTN';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['PPN'		, Alliance	],
					['ET-D'		, Allies	],
					['DHDS'	        , Allies	],
					['ALM'	        , Allies	],
					['LGY' 		, Allies	],
					['PNX'		, Allies	],
					['MsLvR'	, Allies	],
					['Bleed'	, Enemies 	],
					['C-BND'	, Enemies 	],
					['Arkan'	, Enemies 	],
					['EMcry'	, Enemies 	],
					['CNC'		, Enemies 	],
					['ODG'	, Enemies 	]  ];
		chaturl='http://ptnzeta.foroactivo.net/chatbox/chatbox.forum';
		forumurl='http://ptnzeta.foroes.net';
		forumurlnew='http://ikariamptn.foroes.net';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
//	showgames();