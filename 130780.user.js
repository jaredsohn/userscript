// ==UserScript==
// @name		Le Script S-G
// @version 	1
// @namespace 	Gboz
// @author		Gboz
// @description	Le Script S-G
// @include		http://s*.fr.ikariam.*/*
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
//
//
//	THIS IS THE LICENCE FOR THE @require http://www.ika-core.org/scripts/ika-core.js dependency
//	OR IN OTHER WORDS THE MAIN CORE SCRIPT WITH A FILE NAME OF ika-core.js, this file should only be downloaded from www.ika-core.org/script/ika-core.js only,
//	not from other links in the above domain only form this location.
//
// Ika-core, a collection of modules(sripts) to beutify and assist web page interaction.
//    Copyright (C) 2008 GBoz
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//
//    You are not allowed to offer this programm for download or redistribute it
//    in any way except directions stated at the www.ika-core.org website by the administration.
//    This programm is offered for download only at http://www.ika-core.org/script/ika-core.js .
//     If you downloaded this programm from another location please report it
//     at the www.ika-core.org website.
//     This programm may be downloaded automatically by You but only form the location
//     mentioned above.
//     The code remains as is, no alteration or modification should be done without the
//     written permission of the auhtor.
//     This script is not permited to be incorporated into any of your program/s or
//     any proprietary programs .
//     This script will comunicate with www.ika-core.org to check for upgrades,
//     or for any other means. Any damage by usage in general (bandwidth etc) by this programm
//     is considered your expense and fault and not the auhtors.
//     In other means , you know what you are doing.
//     Any damage inflicted in general to others (Companies, individuals etc) or to yourslef by use of
//     this code is your responsibility. Any unlegal practice or result by usage of this script is your fault.
//	   Or in plain english, its not the authors fault for anything but the users.
//     This script is considered as free tool without any purpose whatsoever.

var version=1;
var scriptlocation="http://userscripts.org/scripts/source/130780.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Super Guerriers';
		alliancenm='S-G';		
		alliance=[	['No alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
                                        ['TYRAN'		, Enemies	],
					['ARME'		, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='http://xxxxxxx';
		//forumurl='';
		forumurlnew='.';
		//forumurlnew='http://=newposts';
		break;
}
	
	
    var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Qui sont les plus forts ?", 68);
       addsbubble('scientist',"Qui ?", 71);
       addsbubble('diplomat',"Ben c'est nous, les S-G !", 72);
       addsbubble('scientist',"Ha bon ?", 74);
       addsbubble('diplomat',"Bien sûr !", 77);
       addsbubble('scientist',"Arrête !", 79);
       addsbubble('diplomat',"Je t'assure", 81);
       addsbubble('scientist',"Et les autres ?", 83);
       addsbubble('diplomat',"Des petits kikis !", 85);
       addsbubble('scientist',"On y va alors ?", 88);
       addsbubble('diplomat',"Allé, on y va !", 90);
       addsbubble('scientist',"Où ça?", 93);
       addsbubble('diplomat',"Ben, on va les taper !", 95);
       addsbubble('scientist',"Allé, on y va !", 100);
       addsbubble('mayor', "Taper qui ?", 110);
       addsbubble('general', "Les ARMEs !", 120);
    } else {
       addsbubble('general',"Attention !!", 125);
       addsbubble('general', "Je vais grogner !", 130);
       addsbubble('mayor', "C'est moi le chef ici !", 135);
    }

