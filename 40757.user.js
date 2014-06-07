// ==UserScript==
// @name		XXX BUITRES XXX Tools
// @version 		4
// @namespace 		Gboz
// @author		Gboz
// @description		Gboz & Modificated By BuNbUrYcRaFt For Alliance XXXBUITRESXXX
// @include		http://s1.ikariam.es/*
// @require		http://www.alianzafenix.byethost13.com/scripts/xxxbuitresxxx-tools.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=5;
var scriptlocation="http://www.alianzafenix.byethost13.com/scripts/xxxbuitresxxxtools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='XXX BUITRES XXX';
		alliancenm='XBTRX';
		alliance=[		['Îo alliance'	, NoAlliance		],
					[alliancenm	, Alliance		],
					['XBTR2'	, Alliance		],
					['-CAT-'	, Allies 		],
					['-GAD-'	, Allies 		],
					['-LA-'		, Allies 		],
					['AAF'		, Allies 		],
					['AGP'		, Allies 		],
					['Akat'		, Allies 		],					
					['aSOP'		, Allies 		],
					['BarA'		, Allies 		],
					['C-AGP'	, Allies 		],
					['CKL'		, Allies 		],
					['CONF'		, Allies 		],
					['CORP'		, Allies 		],
					['cSOP'		, Allies 		],
					['dbd'		, Allies 		],
					['FTWUN'	, Allies 		],
					['GNDR'		, Allies 		],
					['GNDR2'	, Allies 		],
					['GROMA'	, Allies 		],
					['H-TRY'	, Allies 		],
					['HdF'		, Allies 		],
					['KOA'		, Allies 		],
					['L a S'	, Allies 		],
					['MXCS'		, Allies 		],
					['RAZ'		, Allies 		],
					['Rbx'		, Allies 		],
					['S-S-F'	, Allies 		],
					['SNM'		, Allies 		],
					['SOP'		, Allies 		],
					['Star'		, Allies 		],
					['tauro'	, Allies 		],
					['TROM'		, Allies 		],
					['TVAD'		, Allies 		],
					['WUN'		, Allies 		],
					['KSPEA'	, Enemies 		],
					['MAMBI'	, Enemies 		],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://buitres.forospanish.com/chatbox/chatbox.forum';
		//forumurl='.';
		forumurl='http://buitres.forospanish.com/forum.htm';
		//forumurlnew='.';
		forumurlnew='http://buitres.forospanish.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Hoy es el día.", 98);
       addsbubble('scientist',"¿Que día?", 101);
       addsbubble('diplomat',"El dia en el que sere mas fuerte.", 102);
       addsbubble('scientist',"Fuerte.... y para que?", 104);
       addsbubble('diplomat',"Para hacerme respetar.", 107);
       addsbubble('scientist',"¿Con que fin?", 99);
       addsbubble('diplomat',"Con el fin de ser Poderoso.", 111);
       addsbubble('scientist',"¿Y la alianza?", 113);
       addsbubble('diplomat',"Tambien lo sera.", 115);
       addsbubble('scientist',"¿Estas seguro?", 118);
       addsbubble('diplomat',"Claro que si.", 120);
       addsbubble('scientist',"¿Y puedo seguirte?", 123);
       addsbubble('scientist',"¿Me ayudaras?", 125);
       addsbubble('diplomat',"Por supuesto... contad con migo.", 128);
       addsbubble('scientist',"¡Gracias!", 130);
    } else {
       addsbubble('general',"Todo tranquilo hoy...", 147);
       addsbubble('general',"mmmm", 149);
       addsbubble('general',"¡que raro!", 152);
       addsbubble('mayor',"Si, esta muy extraño.", 155);
       addsbubble('general', "Habra que estar atentos.", 158);
       addsbubble('mayor', "Alista las tropas por si acaso.", 161);
       addsbubble('general', "En seguida.", 165);
    }