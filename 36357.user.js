// ==UserScript==
// @name		The Olympian Alliance Tool Script - Ika-Core
// @version 	74
// @namespace 	Gboz
// @author		Gboz
// @description	The Olympian Alliance Tools - ika-core
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


var version=74;
var scriptlocation="http://www.ika-core.org/scripts/the_olympians_tools.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Purple','Brown'];
Enemies		=	[	'Red'	,'Red'	];


// Settings for every server
switch (location.host) {
	case 's7.ikariam.com':
		alliancefullnm='The Olympians';
		alliancenm='OLY';		
		alliance=[	['Νo alliance'	, NoAlliance],
					['OLY'	, Alliance	],  
                                        ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='http://theolympians.roflforum.net';
		forumurl='http://theolympians.roflforum.net';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	case 's7.ikariam.com':
		alliancefullnm='The Olympians';
		alliancenm='OLY';
		alliance=[	['No alliance', NoAlliance	],
					['OLY'	, Alliance		],
			
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='http://theolympians.roflforum.net';
		forumurl='http://theolympians.roflforum.net';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	//for a friend
	       case 's7.ikariam.com':
          alliancefullnm='The Olympians';
          alliancenm='OLY';
          alliance=[
                ['No Alliance',      NoAlliance   ],
                ['OLY',      Alliance   ],
          ];
          chaturl='.';
          forumurl='http://theolympians.roflforum.net';
          forumurlnew='.';
       break;
       case 's7.ikariam.com':
          alliancefullnm='The Olympians';
          alliancenm='OLY';
          alliance=[
                ['No Alliance',      NoAlliance   ],
          ['OLY',      Alliance   ],
          ];
          chaturl='.';
          forumurl='http://theolympians.roflforum.net';
          forumurlnew='http://theolympians.roflforum.net';
       break;
}
	main();
	ToolsMenu();
	fixtreaties();
	

  

