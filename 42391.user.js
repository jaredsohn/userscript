// ==UserScript==
// @name		        DSTOP
// @version 	        01
// @namespace 	        INVALID
// @author		        INVALD
// @description	        The DSTOP alliance Tools
// @include		        http://s1.ikariam.*/*
// @require		        http://lior066.110mb.com/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.
// @require		        http://lior066.110mb.com/ika-core.js
var version=1;
var scriptlocation="http://userscripts.org/scripts/source/42391.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='DsToP';
		alliancenm='DsToP';		
		alliance=[	['Dst Old PEOPLE alliance'	, NoAlliance],
					[ alliancenm		, Alliance	],
					                    ['DST'			, Allies	],
					                    ['DST-A'			, Allies	],
					                    ['BOS'			, Allies	],
					                    ['WTW'			, Allies	],
                                        ['GOW'  	    , Enemies	],
                                        ['  '   		, Enemies 	] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://lior066.110mb.com/chat.html';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
		


}
    country = 'he';
	main();
	ToolsMenu();
	fixtreaties();
