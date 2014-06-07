// ==UserScript==
// @name		Tools for "Les Templiers"
// @version 		12
// @namespace 		madmin
// @author		Gboz modified by madmin
// @description		Les Templiers Alliance tools - ika-core
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

var version=12;
var scriptlocation="http://userscripts.org/scripts/source/38513.user.js";

// Settings for every server
switch (location.host) {
default:
		alliancefullnm='Les Templiers';
		alliancenm='--Ŧ--';		
		alliance=[	['Sans alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                        ['-Ŧ W-'			, Allies	],
					['ΩMEGA'		, Allies        ],
					['l7N'			, Allies	],
					['F-H'			, Allies	],
                                        ['EMF'			, Allies	],
                                        ['W_EMF'		, Allies	],
                                        ['HbD 2'		, Enemies	],
					['HbD'	, Enemies         ]  ];
		chaturl='http://templiers-d-ikariam.xooit.com/chat2.php';
		forumurl='http://templiers-d-ikariam.xooit.com';
		forumurlnew='http://templiers-d-ikariam.xooit.com/search.php?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Dans la vie on partage toujours les emmerdes.", 68);
       addsbubble('scientist'," jamais le pognon", 68);
       addsbubble('diplomat',"Le butin, ca se divise.", 68);
       addsbubble('scientist',"Le pillage, ca s additionne", 68);
       addsbubble('diplomat',"Je vous previens", 68);
       addsbubble('scientist',"qu on a la puissance de feu d un GV", 68);
       addsbubble('diplomat',"et des flingues de concours.", 68);
       addsbubble('scientist',"Ecoute, on te connait pas", 68);
       addsbubble('diplomat',"mais laisse nous te dire", 68);
       addsbubble('scientist',"que tu te prepares des nuits blanches", 68);
       addsbubble('diplomat',"des migraines... des "nervous breakdown", 68);
       addsbubble('scientist',"comme on dit de nos jours.", 68);
       addsbubble('diplomat',"C est curieux chez les marins", 68);
       addsbubble('scientist',"ce besoin de faire des phrases !", 68);
    } else {
       addsbubble('diplomat',"Vous croyez qu ils oseraient venir ici ?", 68);
       addsbubble('general', "Les cons, ca ose tout !!!.", 68);
       addsbubble('mayor', "C est meme a ca qu on les reconnait.", 68);
    }

*/