// ==UserScript==
// @name	KENTA search Tools
// @version 	1.1
// @namespace 	Panagoman
// @author	Panagoman
// @description	Based on Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================
// I did not create this script! I just edited some of the coding!
// All credits to the creators of Ika-core!
var version=1;
var scriptlocation="http://userscripts.org/scripts/show/48739.user.js";

switch (location.host) {	
	default:
		alliancefullnm='Tools';
		alliancenm='Tools';		
		alliance=[	['Νo alliance'	, NoAlliance],
				['A-H'		, Allies	],
				['A-H2'		, Allies	],
				['ATL1'		, Allies	],
				['ATL2'		, Allies	],
				['cus'		, Allies	],
				['eleos'	, Allies	],
				['EPIC'		, Allies	],
				['FBS'		, Allies	],
				['GARO'		, Allies	],
				['GLi_Z'	, Allies	],
				['GRE'		, Allies	],
				['G_Z_A'	, Allies	],
				['HTGT'		, Allies	],
				['I-LG'		, Allies	],
				['K_K'		, Allies	],
				['LEG'		, Allies	],
				['LOTR'		, Allies	],
				['Lux2'		, Allies	],
				['NGXVM'	, Allies	],
				['ONAR2'	, Allies	],
				['PGS'		, Allies	],
				['PLDNS'	, Allies	],
				['P_G'		, Allies	],
				['R_D'		, Allies	],
				['SMS'		, Allies	],
				['TTS'		, Allies	],
				['ΟΛ_ΘΕ'	, Allies	],
				['ΟΛΥ'		, Enemies	]
				['BBB'          , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		forumurl='.';
		//forumurl='http://kentaypoi.forummotion.com/ 
		break;
}
	