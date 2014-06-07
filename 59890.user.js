// ==UserScript==
// @name	LDr 
// @version 	15
// @namespace 	biccius
// @author	biccius
// @description	Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// ==/UserScript==
// ===========================================================================
// Original code by Gboz

var version=15;
var scriptlocation="http://userscripts.org/scripts/source/59890.user.js";

Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Purple','Brown'];
Enemies		=	[	'Red'	,'Red'	];
switch (location.host) {
	//case 's8.ikariam.fr':
	default:
		alliancefullnm='Les Dragonniers';
		alliancenm='LDr';		
		alliance=[	['No alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['AKA'			, Allies	],
					['AKAw'			, Allies	],
					['SPQR'			, Allies	],
					['RCO'			, Allies	],
					['ARME'		, Enemies	],


 ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.xat.com/NWRRS';
		//forumurl='.';
		forumurl='http://lesdragonniers-theta.forumactif.net/forum.htm';
		forumurlnew='.';
		//forumurlnew='http://nwrrs.forumfree.net/?act=Search&CODE=getactive';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();

  var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { 
       addsbubble('diplomat',"Rendons Homage à notre reine.", 68);
       addsbubble('scientist',"A qui ?", 71);
       addsbubble('diplomat',"A notre reine", 72);
       addsbubble('scientist',"Gloire à Elphy !", 74);
       addsbubble('diplomat',"Il ne faut pas trop en faire non plus", 77);
       addsbubble('scientist',"Tu crois ?", 79);
       addsbubble('diplomat',"J'en suis certain !", 81);
       addsbubble('scientist',"Alors on fait quoi ?", 83);
       addsbubble('diplomat',"Vivent les Dragonniers !", 85);
       addsbubble('scientist',"Vive la reine des dragonniers !", 88);
       addsbubble('diplomat',"Et les autres aussi.", 90);
       addsbubble('scientist',"Qui ça ?", 93);
       addsbubble('diplomat',"Ben nous, les dragonniers", 95);
       addsbubble('scientist',"Ok, vive nous !", 100);
    } else {
       addsbubble('general',"Un peu de discipline s'il vous plait..", 110);
       addsbubble('general', "Grrrrrr !", 118);
       addsbubble('mayor', "Montez vos cachettes !", 121);
    }

