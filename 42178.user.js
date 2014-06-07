// ==UserScript==
// @name		TWT Tools
// @version             82
// @namespace 	Gboz
// @author		Gboz
// @description	The TWT alliance Tools - ika-core
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

var version=75;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='The White Tower';
		alliancenm='TWT';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['VFV'		, Alliance	] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='';
		//forumurlnew='.';
		forumurlnew='';
		break;
case 's5.ikariam.gr':
		alliancefullnm='V FOR VENTOUZA';
		alliancenm='VFV';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ],
					['A-G-S' , Allies ],
					['CHS' , Allies ],
					['D-K' , Allies ],
					['DARK' , Allies ],
					['END' , Allies ],
					['EVO' , Allies ],
					['FAI' , Allies ],
					['G - I' , Allies ],
					['INAL' , Allies ],
					['LEG' , Allies ],
					['MAC' , Allies ],
					['MORA' , Allies ],
					['SMS' , Allies ],
					['TRS' , Allies ], 
					['ΑΕΓ' , Allies ],
					['ΔΕΗ' , Allies ]];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		chaturl='';
		forumurl='http://v-f-v.niceboard.net';
		forumurlnew='';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();