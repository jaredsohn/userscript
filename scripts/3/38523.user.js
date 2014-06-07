// ==UserScript==
// @name		The Illuminati Tools
// @version 	        1
// @namespace 	        Gboz
// @author		Gboz
// @description         The Illuminati alliance Tools - ika-core
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

var version=2;
var scriptlocation="http://userscripts.org/scripts/source/38523.user.js";

// Settings for every server
switch (location.host) {
       default:
          alliancefullnm='The Illuminati';
          alliancenm='Lumi';
          alliance=[
                ['No Alliance',      NoAlliance   ],
                [alliancenm,      Alliance   ],
                ['LAL',         Allies      ],
                ['T-A',         Allies    ],
		['-MAC-',       NoAlliance    ],
          ];
          chaturl='.';
          forumurl='.';
          forumurlnew='.';
       break;
       case 's10.ikariam.org':
          alliancefullnm='The Illuminati';
          alliancenm='Lumi';
          alliance=[
                ['No Alliance',      NoAlliance   ],
                [alliancenm,      Alliance   ],
                ['LAL',         Allies      ],
                ['T-A',         Allies    ],
		['-MAC-',       NoAlliance    ],
          ];
          chaturl='.';
          forumurl='.';
          forumurlnew='.';
       break;
}
	main();
	ToolsMenu();
	fixtreaties();