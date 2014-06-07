// ==UserScript==
// @name		The Berserker tools
// @version 	0.0.1
// @namespace 	Gboz
// @author		Gboz
// @description	The Berserker Tools - ika-core
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

var version=83;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='the berserker';
		alliancenm='-BSK-';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['_BSK'		, Alliance	],
					['M B'			, Allies	],
					['-UE-'	,Allies	],
					[''			, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='.';
		//forumurl='http://cor-atle.highbb.com/';
		forumurlnew='.';
		//forumurlnew='http://cor-atle.highbb.com/search.forum?search_id=newposts';
		break;
	case 's10.ikariam.fr':
		alliancefullnm='the berserker';
		alliancenm='-BSK-';
		alliance=[	['No alliance', NoAlliance	],
					[alliancenm	, Alliance		],
					['_BSK'	, Alliance		],
					['-BSK-'	, Alliance		],
					[''	, Alliance		],					
					['M B'		, Allies 		],
					['-UE-'		, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''	, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''	, Allies 		],
					[''	, Allies 		],
					[''		, Allies 		],
					[''	, Allies 		],
					[''	, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''	, Allies 		],
					[''	, Allies 		],
					[''		, Allies 		],
					[''		, Allies 		],
					[''	, Allies 		],
					[''		, Allies 		],
					[''	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='';
		forumurlnew='';
		break;
	}

*/