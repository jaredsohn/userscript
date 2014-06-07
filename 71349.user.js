// ==UserScript==
// @name	Ika-core (Φασουλάδα)
// @version 	9
// @namespace 	Gboz
// @author	Gboz
// @description	Φασουλάδα
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================

var version=10;
var scriptlocation="http://userscripts.org/scripts/source/35976.user.js";

switch (location.host) {	
	default:
		alliancefullnm='The Templars';
		alliancenm='TmpL';		
		alliance=[	['Χωρίς Συμμαχία' , NoAlliance],
				[ alliancenm	  , Alliance	],
				['AAA'		  , Allies	],
                                ['ΙΛΙ'            , Enemies 	],
                                ['FIRE1'          , Enemies 	],
				['Β-Φ'            , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.yourforum.com/chat';
		forumurl='.';
		//forumurl='http://www.yourforum.com/forum/new';
		forumurlnew='.' ;
		//forumurlnew='http://www.yourforum.com/forum/';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();