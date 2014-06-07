// ==UserScript==
// @name		DMG Tools
// @version 		3
// @namespace 		Gboz
// @author		Gboz, modify by bpdc
// @description		The Corsairs alliance Tools - ika-core, modify for DMG
// @include		http://s6.ikariam.*/*
// @require		http://boxstr.com/files/4221289_vxnkt/ika-core.js
// ==/UserScript==
// ===========================================================================
var version=3;
var scriptlocation="http://boxstr.com/files/3722392_j5al1/ika-core.js";

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
		alliancefullnm='El Circulo';
		alliancenm='DMG';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					[''		, Alliance	],
					[''		, Allies	],
					[''		, Enemies 	]  ];
		chaturl='http://elcirculo.foroes.net/chatbox/chatbox.forum';
		forumurl='http://elcirculo.foroes.net/';
		forumurlnew='http://elcirculo.foroes.net/';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
//	showgames();