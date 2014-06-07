// ==UserScript==
// @name		-LT- Tools
// @version 		3
// @namespace 		Gboz
// @author		Gboz, modify by bpdc
// @description		The Corsairs alliance Tools - ika-core, modify for -LT-
// @include		http://s11.ikariam.*/*
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
		alliancefullnm='Los Templarios';
		alliancenm='-LT-';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['-CT-'		, Alliance	],
					['-AI-'		, Allies	],
					['-LIX-'	, Allies	],
					['-cri-'	, Allies	],
					['-DkS-'	, Enemies 	],
					['KBH'		, Enemies 	]  ];
		chaturl='http://lostemplarios.forosactivos.com/chatbox/chatbox.forum';
		forumurl='http://lostemplarios.forosactivos.com/forum.htm';
		forumurlnew='http://lostemplarios.forosactivos.com/forum.htm';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
//	showgames();