// ==UserScript==
// @name		Le Script LCn
// @version 	10
// @namespace 	Gboz
// @author		Gboz
// @description	Le Script LCn
// @include		http://s*.fr.ikariam.*/*
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

var version=10;
var scriptlocation="http://userscripts.org/scripts/source/82088.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='DGP'
		alliancenm='DGP';		
		alliance=[	['No alliance'	, NoAlliance],];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='http://google.fr/';
		//forumurl='';
		forumurlnew='.';
		//forumurlnew='http://=newposts';
		break;
}
	
	
    var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
       addsbubble('diplomat',"Ben ça marche plus ?", 68);
       addsbubble('scientist',"Quoi ?", 71);
       addsbubble('diplomat',"Ben ça !", 72);
       addsbubble('scientist',"Ha bon ?", 74);
       addsbubble('diplomat',"Bien non !", 77);
       addsbubble('scientist',"Arrête !", 79);
       addsbubble('diplomat',"Je t'assure", 81);

    } else {
       addsbubble('general',"Attention !!", 125);
       addsbubble('general', "Je vais grogner !", 130);
       addsbubble('mayor', "C'est la fin!", 135);
    }