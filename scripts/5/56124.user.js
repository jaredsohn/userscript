// ==UserScript==
// @name        The Gods and Heroes tools
// @version 	82
// @namespace 	ΚΟΡΙΝΘΟΣ
// @author	ΚΟΡΙΝΘΟΣ
// @description	Μετατροπή του ika-core για all serverss ikariam.gr 
// @include	http://s*.ikariam.*/*
// @require	http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=85;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance		=	[	'Blue' ,'Blue'	];
Allies		=	[	'Aqua'	,'Aqua'	];
NoAlliance	=	[	'Purple'      ,'Purple'	];
Enemies		=	[	'Red'	,'Red'	];

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Gods and Heroes';
		alliancenm='G_H';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance  ],
					[alliancenm , Alliance ],
					[alliancenm	, Alliance		],
					//['ΟΥΓΚ'	, Alliance		],
					//['ESI'		, Allies 		],
					//['G_H2'		, Allies 		],
					//['G-C-E'		, Allies 		],
					//['ΙΛΙ Κ'		, Allies 		],
					//['F L'	, Enemies 		],
					[''	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';		
		//chaturl='http://corsairs.phpbb9.com/chatbox_mod/chatbox.forum';
		//forumurl='http://corsairs.phpbb9.com';
		//forumurlnew='http://corsairs.phpbb9.com/search.forum?search_id=newposts';
		break;

case 's8.ikariam.gr':
		alliancefullnm='Gods and Heroes';
		alliancenm='G_H';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					//['COR 2'	, Alliance		],
					['ESI'		, Allies 		],
					['G_H2'		, Allies 		],
					['G-C-E'		, Allies 		],
					['ΙΛΙ Κ'		, Allies 		],
					//['div'	, Enemies 		],
					//['div2'	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
   var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Ωρα για συνθήκη...", 70);
       addsbubble('diplomat',"ή μήπως για πόλεμο!?!", 73);
       addsbubble('scientist',"Εύρηκα!!!", 77);
       addsbubble('scientist',"Εεεε, λάθος δεν δουλεύει....", 80);
       addsbubble('general',"Μακάκας!!!", 83);
       addsbubble('general',"Ρε ντουυυυ σας λέω!!!", 86);
       addsbubble('mayor', "Ώπα Στρατηγέ... κράτει όλα.", 89);
       addsbubble('mayor', "Εγώ διατάζω εδώ!!!", 92);
       addsbubble('diplomat',"Έμπαινε Δημαρχέ μου.", 95);
       addsbubble('scientist',"Που να μπω;", 98);
       addsbubble('diplomat',"Μα μακάκας είσαι;", 101);
       addsbubble('scientist',"Μα γιατί; Τι κάνω;", 104);
       addsbubble('diplomat',"Κάποιον μου θυμίζεις.", 107);
       addsbubble('scientist',"Ποιος;", 110);
       addsbubble('diplomat',"Εσύ.", 113);
       addsbubble('scientist',"Ποιον;", 116);
       addsbubble('diplomat',"Μα τον Αη Βασίλη.", 119);
       addsbubble('diplomat',"Μόνο το σκουφί σου λείπει.", 122);
       addsbubble('scientist',"Ε είσαι ΜΑΚΑΚΑΣ !!!", 125);
       addsbubble('mayor', "Gods and Heroes, for ever!!!", 130);
       addsbubble('mayor', "Κ Ο Ρ Ι Ν Θ Ο Σ !!!", 133);
    } else {
       addsbubble('general',"Πάμε για λεηλασία.", 80);
       addsbubble('general', "Ή μήπως για κατάληψη?", 83);
       addsbubble('mayor', "Να βοηθήσω;", 86);
       addsbubble('mayor', "Θέλω κι 'γω να βοηθήσω.", 89);
       addsbubble('general', "Άσε ρε Δήμαρχε!", 92);
       addsbubble('general', "Κάτσε στην καρεκλίτσα σου!!!", 95);
       addsbubble('mayor', "Μα να βοηθήσω θέλω!", 98);
       addsbubble('general', "Ρε κάνε στη πάντα σου λέω...", 101);
       addsbubble('general', "Περνάνε τα κομάντα!!!", 104);
       addsbubble('general', "Gods and Heroes, the best!!!", 107);
       addsbubble('mayor', "Κ Ο Ρ Ι Ν Θ Ο Σ !!!", 110);
    }