// ==UserScript==
// @name		The Zeus Tools
// @version 	82
// @namespace 	Gboz
// @author		Gboz
// @description	        The ZEUS alliance Tools
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


var version=84;
var scriptlocation="http://userscripts.org/scripts/source/34057.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Purple','Brown'];
Enemies		=	[	'Red'	,'Red'	];
Brothers        =       [	'Green'	,'Green'];
Enemies1	=	[	'black'	,'black'];
// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='ZEUS';
		alliancenm='ZEUS';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['XUZ'		, Alliance	],
					['XUZ1'			, Allies	],
                                        ['_XUZ_'		, Brothers	],
					['-Φ-'	, Enemies 	]  ];
		chaturl='http://zeus.activebb.net/chatbox/chatbox.forum';
		forumurl='http://zeus.activebb.net/index.htm';
		forumurlnew='http://zeus.activebb.net/search.forum?search_id=newposts';
		break;

	case 's2.ikariam.gr':
		alliancefullnm='ZEUS';
		alliancenm='ZEUS';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm		, Alliance		],
					['ZEUS1'		, Alliance		],
					['ZEUS2'		, Alliance		],
					['STORΜ'		, Brothers 		],
					['SΤORΜ'		, Brothers 		],
					['STΟRM'		, Brothers  		],
					['SΤΟRΜ'		, Brothers  		],
				        ['STORM'		, Brothers  		],
					['SΤΟRM'		, Alliance 		],
					['BZ-NC'		, Allies  		],
					['PLATO'		, Allies   		],
					['Atl'			, Allies   		],
				        ['STORM'		, Allies  		],
					['XUZ-Λ'		, Brothers		],
					['IRM'			, Allies 		], 
					['IXV'			, Allies 		],
					['CSI'		        , Allies 		],
					['XxX-2'		, Allies 		],
					['XxXUZ'		, Allies 		],
					['- G -'		, Allies 		],
					['_G_'		        , Allies 		],
					['-Φ-'			, Enemies		],
                                        ['GHOST'		, Enemies		],
                                        ['NMS1'			, Enemies		],
                                        ['Px-Φ-'		, Enemies1		],
					['KNGS'			, Enemies1		],];
        chaturl='http://zeus.activebb.net/chatbox/chatbox.forum';
		forumurl='http://zeus.activebb.net/index.htm';
		forumurlnew='http://zeus.activebb.net/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
	showgames();
