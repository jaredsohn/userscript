// ==UserScript==
// @name		A Berdadeira (TRU)
// @version 	01
// @namespace 	A Berdadeira
// @author		Gboz (modded by avense)
// @description	The BERDADEIRA alliance Tools - based on ika-core
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


var version=01;
var scriptlocation="http://userscripts.org/scripts/edit_src/39748";
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
		alliancefullnm='A Berdadeira';
		alliancenm='TRU';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                        [	'TRU-2'	, Alliance	],
                                        [	, Alliance	],
					[		, Alliance	],
					[		, Alliance	],
					[		, Alliance	],
					[		, Alliance	],
					[		, Alliance	],
                                        [	, Enemies 	],
                                        [	        , HASH 	],
					[		, Alliance	]];
	//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://argonaftes.forum-motion.com/chatbox/chatbox.forum';
		//forumurl='.';
		forumurl='http://aberdadeira.forum-livre.com';
		//forumurlnew='.';
		forumurlnew='http://aberdadeira.forum-livre.com/search.forum?search_id=newposts';
		break;

	case 's4.ikariam.com':
		alliancefullnm='Zounnaos';
		alliancenm='-ZU-';
		alliance=[	['Νo alliance', NoAlliance  ],
					[alliancenm	, Alliance	],];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://argonaftes.forum-motion.com/chatbox/chatbox.forum';
		forumurl='.';
		//forumurl='http://argonaftes.forum-motion.com/forum.htm';
		forumurlnew='.';
		//forumurlnew='http://argonaftes.forum-motion.com/search.forum?search_id=newposts';
		break;
}

	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	//showchat();
	//showgames();