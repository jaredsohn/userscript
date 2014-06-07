// ==UserScript==
// @name		Nova Ordem Tools
// @version 	2
// @namespace 	Guitshu
// @author		Guitshu
// @description	Nova Ordem Tools - ika-core
// @include		http://s7.ikariam.com.pt/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================

//var version=79;
//var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Nova Ordem';
		alliancenm='-NO-';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['-NOr-'	, Alliance		],
					['-NOs-'	, Allies 		],
					['RatuZ'	, Allies 		],
					['RaTuS'	, Allies 		],
					['RAT_R'	, Allies 		],
					['Fenix'	, Enemies 		],
					['Fx_2'		, Enemies 		],
					['Fx_3'		, Enemies 		],
					['eXcFx'	, Enemies 		],
					['eXcW'		, Enemies 		],
					['FX_'		, Enemies 		],
					['FX-M-'	, Enemies 		],
					['FNX'		, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
 /*   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Fazes me lembrar um tipo.", 68);
       addsbubble('scientist',"Quem?", 71);
       addsbubble('diplomat',"O coisa Furyosa.", 72);
       addsbubble('scientist',"Que coisa Furyosa?", 74);
       addsbubble('diplomat',"O Furyus pahh.", 77);
       addsbubble('scientist',"Que faz ele?", 79);
       addsbubble('diplomat',"Além de ser n00b?!", 81);
       addsbubble('scientist',"n00b?", 83);
       addsbubble('diplomat',"Pareces ele.", 85);
       addsbubble('scientist',"Ele quem?", 88);
       addsbubble('diplomat',"E dizes tu que és cientista.", 90);
       addsbubble('scientist',"Não comprendi?!?!?!", 93);
       addsbubble('diplomat',"Tás mais burro que o Furyus?", 95);
       addsbubble('scientist',"Esquece hoje não vou lá da tola.", 100);
    } else {
       addsbubble('general',"Epahhh... apetece-me dar uma tareia na Fenix ...", 110);
       addsbubble('general', "Acho que vou atacar o Furyus.", 118);
       addsbubble('mayor', "Eu ajudo-te.", 121);
    }

*/