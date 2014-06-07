// ==UserScript==
// @name		The Transformation Tools
// @version 		78
// @namespace 		Bun Bun
// @author		Bun Bun
// @description		The Transformation alliance Tools - ika-core
// @include		http://s*.ikariam.nl/*
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

var version=79;
var scriptlocation="http://userscripts.org/scripts/source/37003.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Transformation';
		alliancenm='TRAFO';		
		alliance=[	['Νo alliance'		, NoAlliance	],
				[ alliancenm		, Alliance	],
				['love'			, Allies	],
				['- P -'		, Allies	],
				['LOD'			, Allies	],
				['LEC'			, Allies	],
				['MENS'			, Allies	],
				['-EA-'			, Allies	],
				['NoEnem'		, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://ikariam.bunbun.be/forum/chat/';
		forumurl='http://ikariam.bunbun.be/forum';
		forumurlnew='http://ikariam.bunbun.be/forum/search.php?search_id=newposts';
		break;
}

main();
ToolsMenu();
fixtreaties();