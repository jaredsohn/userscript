// ==UserScript==
// @name	LCn 
// @version 	3
// @namespace 	biccius
// @author	biccius
// @description	Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================
// Original code by Gboz

var version=3;
var scriptlocation="http://userscripts.org/scripts/source/81423.user.js";

Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Purple','Brown'];
Enemies		=	[	'Red'	,'Red'	];
switch (location.host) {
	//case 's8.ikariam.fr':
	default:
		alliancefullnm='Le Clan';
		alliancenm='LCn';		
		alliance=[	['No alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['RCO'			, Allies	],
					['VIRUS'			, Allies	],
					['HFO'			, Allies	],
					['LDr'			, Allies	],
 ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.xat.com/NWRRS';
		//forumurl='.';
		forumurl='http://leclandesdragons.xoo.it/index.php';
		forumurlnew='.';
		//forumurlnew='.';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();

