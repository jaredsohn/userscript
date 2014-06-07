// ==UserScript==
// @name		-DkS- Tools
// @version 		3
// @namespace 		Gboz
// @author		Gboz, modify by bpdc
// @description		The Corsairs alliance Tools - ika-core, modify for DkS
// @include		http://s11.ikariam.*/*
// @require		http://boxstr.com/files/3716565_rrepy/ika-core.js
// ==/UserScript==
// ===========================================================================
var version=3;
var scriptlocation="http://boxstr.com/files/3716565_rrepy/ika-core.js";

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
		alliancefullnm='-Dark Soldiers-';
		alliancenm='-DkS-';
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['PPN'		, Alliance	],
					['Whoop'	, Allies	],
					['GA'		, Allies	],
					['AEXT'		, Allies	],
					['ELIT2'	, Allies	],
					['ADD'		, Allies	],
					['I-A'		, Allies	],
					['L_R'		, Allies	],
					['OTAN'		, Allies	],
					['Arcan'	, Allies	],
					['DHDS'		, Allies	],
					['SPA'		, Allies	],
					['CONQS'	, Allies	],
					['VKGS'		, Allies	],
					['XTREM'	, Allies	],
					['acio'		, Allies	],
					['DTH'		, Allies	],
					['MMS'		, Allies	],
					['CenT'		, Allies	],
					['FRAT'		, Allies	],
					['HADES'	, Allies	],
					['LAOI'		, Allies	],
					['UTN'		, Allies	],
					['EMP'		, Allies	],
					['NBA'		, Allies	],
					['hrs'		, Allies	],
					['S-SKU'	, Allies	],
					['-KP-'		, Allies	],
					['-KP2-'	, Allies	],
					['VJF'		, Allies	],
					['NCS'		, Allies	],
					['SMR'		, Allies	],
					['PAZyG'	, Allies	],
					['TBT'		, Allies	],
					['NMD'		, Allies	],
					['Arkan'	, Allies	],
					['ALM'		, Allies	],
					['Darkn'	, Allies	],
					['IHPSO'	, Allies	],
					['JUDE'		, Allies	],
					['ATM'		, Allies	],
					['Jude2'	, Allies	],
					['MMS'		, Allies	],
					['ES-CM'	, Allies	],
					['KAD'		, Allies	],
					['I-H'		, Allies	],
					['L-S'		, Allies	],
					['GLDU'		, Allies	],
					['SEAE'		, Allies	],
					[''	, Enemies 	]  ];
		chaturl='http://ikariamptn.foroes.net/chatbox/chatbox.forum';
		forumurl='http://ikariamptn.foroes.net';
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

