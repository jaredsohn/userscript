// ==UserScript==
// @name		The Illuminati Tools
// @version 	1
// @namespace 	Gboz
// @author		Gboz
// @description	The Illuminati alliance Tools
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================


var version=2;
var scriptlocation="http://userscripts.org/scripts/source/38525.user.js";

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