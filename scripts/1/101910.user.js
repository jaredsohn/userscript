// ==UserScript==
// @name	LapinsChercheurs
// @version 	8
// @namespace 	Acer
// @author	Acer
// @description	outil pour l'AllianceLC
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
// Version
// Cette partie de script n'a pas de copyright
// 1. Ajout ALC et ALCE comme alliés
// 2. Ajout AK, ORP, RDM comme alliés et LGD,BFA,O_N comme ennemis
// 3. Ajout du lien vers les nouveaux posts du forum
// 4. Ajout de A-N comme ennemis
// 5. Bug resolu recherche alliance
// 6. Ajout -SA- > alliés
// 7. Ajout LdC > alliés
// 8. Ajout HUNS> alliés + LFL ennemies + suppression des bulles
// 9. Ajout LTB,SA,DTC,EAC, suppression A-N,LdC,ALCE

var version=9;
var scriptlocation="http://userscripts.org/scripts/source/101910.user.js";

switch (location.host) {
	default:
		alliancefullnm='Lapins Crétins';
		alliancenm='ALC';		
		alliance=[	['Νo alliance'	, NoAlliance],
				[ alliancenm	, Alliance	],
				['HUNS'		, Allies	],
                                ['ORP'		, Allies	],
                                ['LTB'		, Allies	],
                                ['RdM'		, Allies	],
                                ['-SA-'		, Allies	],
                                ['O_N'		, Enemies	],
				['EAC'          , Enemies 	],
                                ['_DTC_'	, Enemies	],
				['LFL'          , Enemies 	],
				['BFA'          , Enemies 	]  ];
//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
//chaturl='.';
chaturl='http://alc-ikariam.forumgratuit.fr/';
forumurl='http://lalliance-ikariam.forums-actifs.net/';
forumurlnew='http://alc-ikariam.forumgratuit.fr/search?search_id=newposts';
		break;
}