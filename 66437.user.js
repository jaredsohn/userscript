// ==UserScript==
// @name		Atithasos Tools
// @version 	05
// @namespace 	Atithasos
// @author		Atithasos
// @description	The Atithasos alliance Tools - ika-core
// @include		http://s*.ikariam.*/*
// @exclude   http://board.ikariam.*/*
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

var version=05;
var scriptlocation="http://userscripts.org/scripts/source/66437.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Corsairs';
		alliancenm='CoR';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['COR 2'		, Alliance	],
					['ΒΑΝΚ'			, Allies	],
					['RAMPAGE-=+'	, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='-ΕΛΛΑΔΑ-';
		alliancenm='ΠΟΛΗ1';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['ΠΟΛΗ2'	, Alliance		],
					['ΠΟΛΗ3'		, Allies 		],
					['ΠΟΛΗ4'		, Allies 		],
					['ΠΟΛΗ5'		, Allies 		],
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	//BETA
		case 's2.ikariam.gr':
		alliancefullnm='L o IMMORTALS';
		alliancenm='LoI';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['IΛI'	  	, Allies 		],
					['CRETA'		, Allies 		],
					['CSI'  		, Allies 		],
					['EmP'    	, Allies 		],
					['ExP'  		, Allies 		],
					['F L'  		, Allies 		],
					['FOS'  		, Allies 		],
					['FOS 2'  	, Allies 		],
					['I-4'    	, Allies 		],
					['Log_T'		, Allies 		],
					['PCM'    	, Allies 		],
					['SBE'    	, Allies 		],
					['SBE2' 		, Allies 		],
					['VETO'  		, Allies 		],
					['V_L'  		, Allies 		],
					['WЯL'    	, Allies 		],
					['XUZ'    	, Allies 		],
					['XUZ-Λ'		, Allies 		],
					['_XUZ_'		, Allies 		],
					['Θ 13'   	, Allies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	//GAMA
		case 's3.ikariam.gr':
		alliancefullnm='PARTA';
		alliancenm='PAR';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['ApN'    	, Allies		],
					['ARM'  		, Allies 		],
					['Atl'	  	, Allies 		],
					['DEFEN'		, Allies 		],
					['G-K'    	, Allies 		],
					['KkA'  		, Allies 		],
					['SJS'  		, Allies 		],
					['_Λ_'  		, Allies 		],
					['ΙΛΙ'    	, Allies 		]					
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	//DELTA
		case 's4.ikariam.gr':
		alliancefullnm='Ati8asoi';
		alliancenm='Ati';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	//EPSILON
		case 's5.ikariam.gr':
		alliancefullnm='Friends';
		alliancenm=' Frds';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['Β-Φ'    	, Allies 		],
					['Β-Φ-Α'   	, Allies 		],
					['Β-Φ-Β'   	, Allies 		],
					['OYK'    	, Allies 		],
					['GIAFK'   	, Allies 		],
					['LIFA'   	, Allies 		],
					['MYR'    	, Allies 		],
					['MYRB'   	, Allies 		],
					['SNT'    	, Allies 		],
					['XxX'    	, Allies 		],
					['ΔΕΛΤΑ'   	, Allies 		],
					['ΙΛΙ'    	, Allies 		],
					['ELE'    	, Enemies 	]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://vikings.4umer.com/index.forum';
		//forumurlnew='.';
		forumurlnew='http://vikings.4umer.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	
  var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Odin Ο Σπεσιαλίσας.", 68);
       addsbubble('scientist',"Και που ανείκεις εσύ ρε?", 71);
       addsbubble('diplomat',"Στους ΟΥΚ, την καλήτερη συμμαχία.", 72);
       addsbubble('scientist',"Εμμ Ποια άλλη Θα ήταν καλύτερη από την δική μας?", 74);
       addsbubble('diplomat',"Εσύ ποιος είσαι ρε μάστωρα?.", 77);
       addsbubble('scientist',"Ποιος εγώ?", 79);
       addsbubble('diplomat',"Ναι εσύ ρε αλλήθορος είμαι?", 81);
       addsbubble('scientist',"Δεν το ξέρω αυτό", 83);
       addsbubble('diplomat',"Λέγε ρε ποιος είσαι μην σε φάω ζωντανό", 85);
       addsbubble('scientist',"Ο Μέγας ΛΟΚΙ", 88);
       addsbubble('diplomat',"Ρε συ ο Αρχηγός είσαι?", 90);
       addsbubble('scientist',"Εμ ποιον άλλον περίμενες?", 93);
       addsbubble('diplomat',"Πάλι λαδώνεσαι?", 95);
       addsbubble('scientist',"Ποιος εγώ? Άντε πνίξου ρε.", 100);
    } else {
       addsbubble('general',"Μήπως μοιάζω στον Μέγα Αλέξανδρο? ...", 110);
       addsbubble('general', "Μπα είμαι ο Μέγας Ατίθασος.", 118);
       addsbubble('mayor', "Και τι θέλεις να κάνουμε τώρα ρε πολέμαρχε?", 121);
       addsbubble('general', "Πόλεμο ρε ΚΟΤΕΣ ... ΠΟΛΕΜΟ.", 123);
       addsbubble('mayor', "Και εγώ το θέλω αλλά είναι άβγαλτοι οι σύμμαχοι.", 130);
       addsbubble('general', "Να τους κάνουμε και αυτούς ΦΑΡΜΕΣΣΣΣ ...", 134);
    }