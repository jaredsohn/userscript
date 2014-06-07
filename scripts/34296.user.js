// ==UserScript==
// @name		The X-treme Tool
// @version 	65
// @namespace 	Gboz
// @author		Gboz
// @description	        The X-treme-ZEUS alliance Tools.
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


var version=65;
var scriptlocation="http://userscripts.org/scripts/show/34296";

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
		alliancefullnm='X-treme-ZEUS';
		alliancenm='_XUZ_';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['XUZ'		, Alliance	],
					['XUZ1'			, Allies	],
					['wiz'	, Enemies 	]  ];
		chaturl='http://xuz.forums-free.com/chat/';
		forumurl='http://xuz.forums-free.com/';
		forumurlnew='http://xuz.forums-free.com/search.php?search_id=newposts';
		break;

	case 's2.ikariam.gr':
		alliancefullnm='X-treme-ZEUS';
		alliancenm='_XUZ_';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm		, Alliance		],
					['F XUZ'		, Alliance 		],
['IRM'		, Alliance 		],
['IRΜ'		, Alliance 		],
['XUZ'		, Alliance 		],
['XxXUZ'		, Alliance 		],
['XUZ1'		, Alliance 		],
['XUZ2'		, Alliance 		],
['ΧUΖ'		, Alliance 		],
['ExP'		, Alliance 		],

['XUZ-Λ'		, Allies 		],
['CY_GR'		, Allies 		],
['CRETA'		, Allies 		],
['BZA'		, Allies 		],
['BRS'		, Allies 		],
['black'		, Allies 		],
['AVG'		, Allies 		],
['ApN'		, Allies 		],
['ants2'		, Allies 		],
['aNts'		, Allies 		],
['ALO'		, Allies 		],
['1234'		, Allies 		],
['Log_T'		, Allies 		],
['IΛI'		, Allies 		],
['IPI-P'		, Allies 		],
['IMIA'		, Allies 		],
['IKA'		, Allies 		],
['htt'		, Allies 		],
['G_7'		, Allies 		],
['GRG'		, Allies 		],
['GRE'		, Allies 		],
['GATE4'		, Allies 		],
['Free'		, Allies 		],
['FiGHT'		, Allies 		],
['FAD'		, Allies 		],
['ELR'		, Allies 		],
['ELP'		, Allies 		],
['DoH'		, Allies 		],
['TNT'		, Allies 		],
['THNOS'		, Allies 		],
['SMTS'		, Allies 		],
['SBE'		, Allies 		],
['PCM'		, Allies 		],
['OYK1'		, Allies 		],
['Opad'		, Allies 		],
['NWh'		, Allies 		],
['MYTH'		, Allies 		],
['MNM'		, Allies 		],
['MinP'		, Allies 		],
['LoI'		, Allies 		],
['trade'		, Allies 		],
['ULa'		, Allies 		],
['ULh'		, Allies 		],
['ULMIH'		, Allies 		],
['Un-PX'		, Allies 		],
['V-K-F'		, Allies 		],
['VETO'		, Allies 		],
['vip'		, Allies 		],
['V_L'		, Allies 		],
['ΟΛΥ'		, Allies 		],
['۞NOC۞'		, Allies 		],
					
					['wiz'			, Enemies		],];
        chaturl='http://xuz.forums-free.com/chat/';
		forumurl='http://xuz.forums-free.com/';
		forumurlnew='http://xuz.forums-free.com/search.php?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
	showgames();

