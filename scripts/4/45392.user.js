// ==UserScript==
// @name		Legion Reborn Tools
// @version 	82
// @autor          Rfavel
// @email          rfavel@gmail.com
// @namespace 	Gboz
// @description	Legion Reborn Tools - ika-core
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
var scriptlocation="http://userscripts.org/scripts/show/45392.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Legion Reborn';
		alliancenm='RLEG';		
		alliance=[		['Νo alliance'		, NoAlliance		],
					['LRR'	                , Alliance	        ],	
				        ['LRA'	                , Alliance	        ],	
                                        ['LUSO1'	        , Alliance	     ],	
                                        ['LUSO3'	        , Alliance	     ],
                                        ['LUSO5'	        , Alliance	     ],	
                                        ['DTemp'	        , Alliance	     ],
                                        ['Gr-Ro'	        , Alliance     	     ],			
                                        ['JIL'	        , Alliance	     ],

                                        ['Sample Allie'		, Allies 		],
					['Sample Enemy'		, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='http://lastlegion.forump.biz/portal.htm';
		//forumurl='.';
		forumurlnew='.';
		//forumurlnew='.';
		break;
	case 's6.ikariam.com':
		alliancefullnm='Intocáveis';
		alliancenm='INTC';		
		alliance=[		['Νo alliance'		, NoAlliance		],
					[alliancenm		, Alliance		],
					['Sample Feeder'	, Alliance		],					
					['TWMN'			, Allies 		],
					['501st'		, Allies 		],
					['XDX'			, Allies 		],
					['Sample Enemy'		, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='http://www.chatzy.com/876921639075';
		chaturl='http://www.chatzy.com/876921639075';
		forumurl='http://tshadowl.freeforums.org/index.php';
		//forumurl='http://tshadowl.freeforums.org/index.phpu';
		forumurlnew='.';
		//forumurlnew='.';
		break;
	//for a friend
	
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"You remind me of a man.", 8);
       addsbubble('scientist',"What man?", 7);
       addsbubble('diplomat',"The man with the power.", 12);
       addsbubble('scientist',"What power?", 74);
       addsbubble('diplomat',"The power of Hoodoo.", 17);
       addsbubble('scientist',"Who do?", 19);
       addsbubble('diplomat',"You do.", 21);
       addsbubble('scientist',"Do what?", 23);
       addsbubble('diplomat',"Remind me of a man.", 25);
       addsbubble('scientist',"What man?", 28);
       addsbubble('diplomat',"The man with the power.", 30);
       addsbubble('scientist',"What power?", 33);
       addsbubble('diplomat',"Give up?", 35);
       addsbubble('scientist',"Give up. Let's go.", 40);
    } else {
       addsbubble('general',"If they go on about Voodoo, who-do ..", 50);
       addsbubble('general', "I'm pushing them off the tower.", 58);
       addsbubble('mayor', "I'll help you.", 61);
    }

*/

