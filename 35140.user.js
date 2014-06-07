// ==UserScript==
// @name		The Argo Tools
// @version 	68
// @namespace 	Gboz
// @author		Gboz (modded by panoz)
// @description	The Argo alliance Tools - based on ika-core
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


var version=68;
var scriptlocation="http://userscripts.org/scripts/source/35140.user.js";

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
		alliancefullnm='Argonaytes';
		alliancenm='ARGO';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['ARGO2'		, Alliance	],
					['ARGO3'		, Alliance	],
					['ARGO4'		, Alliance	]];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://argonaftes.forum-motion.com/chatbox/chatbox.forum';
		//forumurl='.';
		forumurl='http://argonaftes.forum-motion.com/forum.htm';
		//forumurlnew='.';
		forumurlnew='http://argonaftes.forum-motion.com/search.forum?search_id=newposts';
		break;
	case 's2.ikariam.gr': // there is no ARGO alliance on beta server so i just entered my current alliance :P
		alliancefullnm='Appolloneans';
		alliancenm='ApN';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['ELR'	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	//for a friend
	case 's4.ikariam.gr':
		alliancefullnm='Argonaytes';
		alliancenm='ARGO';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm	, Alliance	],
					['ARGO2'	, Alliance	],
					['ARGO3'	, Alliance	],
					['ARGO4'	, Alliance	],
					['ELLD'	, Alliance	],
					['1234'	, Alliance	],
					['1234B'	, Alliance	],
					['KkA'	, Alliance	],
					['CROWN'	, Alliance	],
					['GrA'	, Alliance	],
					['EMA'	, Allies	],
					['IΛI'	, Enemies	],
					['IΛI'	, Enemies	],
					['IΛI 2'	, Enemies	],
					['ILL'	, Allies	],
					['AFO'	, Allies	],
					['SPR'	, Allies	],
					['KGB'	, Allies	],
					['KILL'	, Allies	],
					['TLOI'	, Allies	],
					['PCM'	, Allies	],
					['EVO'	, Allies	],
					['C_M_A'	, Allies	],
					['kaz'	, Allies	],
					['T_W_U'	, Allies	],
					['TGP'	, Allies	],
					['_Λ_'	, Enemies	],
					['-EL-'	, Allies	],
					['vrsll'	, Allies	],
					['GRH'	, Allies	],
					['GOLD'	, Allies	],
					['nik'	, Allies	],
					['DEZ'	, Allies	],
					['Go-dS'	, Allies	],
					['TSL'	, Allies	],
					['-RK-'	, Allies	],
					['BrH'	, Allies	],
					['-RI-'	, Allies	],
					['hom'	, Allies	],
					['aegin'	, Allies	],
					['DSLgr'	, Allies	],
					['NPL'	, Allies	],
					['ΜΥΝΩΝ'	, Allies	],
					['DRG2'	, Allies	],
					['P-c'	, Allies	],
					['LoC'	, Allies	],
					['EGE'	, Allies	],
					['ocX'	, Allies	],
					['CYB'	, Allies	],
					['TND'	, Allies	],
					['GGC'	, Allies	],
					['NOC'	, Allies	],
					['AOLY'	, Allies	],
					['IER2'	, Allies	],
					['ApN'	, Allies	],
					['KoO'	, Alliance	],
					['CGK'	, Allies	],
					['AGD'	, Allies	],
					['I - W'	, Allies	],
					['ILL2'	, Allies	],
					['CY_GR'	, Allies	],
					['VFV'	, Allies	],
					['SMS'	, Allies	],
					['CoR'	, Allies	],
					['REICH'	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://argonaftes.forum-motion.com/chatbox/chatbox.forum';
		//forumurl='.';
		forumurl='http://argonaftes.forum-motion.com/forum.htm';
		//forumurlnew='.';
		forumurlnew='http://argonaftes.forum-motion.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
	//showgames();


 