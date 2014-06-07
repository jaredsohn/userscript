// ==UserScript==
// @name		The BSG Tools
// @version 	82
// @namespace 	Gboz
// @author		Gboz
// @description	The BSG alliance Tools - ika-core
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

var version=82;
var scriptlocation="http://userscripts.org/scripts/source/39455.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Bashing';
		alliancenm='BSG';	
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                        ['BSG-R'	, Alliance	],
                                        ['BSG-T'	, Alliance	],
					['BSG-N'	, Alliance	],
					['BSG-2'	, Alliance	],
					['BSG-4'	, Alliance	],
					['BSGT2'	, Alliance	],
					['BSGT1'	, Alliance	],
					['Goe-s'	, Alliance	],
					['Kamik'	, Alliance	],
					['ONI'	, Alliance	],
					['Mecha'	, Alliance	],
					['-O-'	, Alliance	],
					['ccf'	, Alliance	],
					['APEX'	, Alliance	],
					['NO-FX'	, Enemies	],
					['-100-'	, Enemies	],
					['UVS'	, Enemies	],
					['UVS-F'	, Enemies	],
					['UVS-s'	, Enemies	],
					['BBB'	, Enemies	],
					['Ole'	, Enemies	],
					['H3K'	, Enemies	],
					['Brap'	, Enemies	]];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://bashing.forumeiros.com';
		//forumurlnew='.';
		forumurlnew='http://bashing.forumeiros.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();