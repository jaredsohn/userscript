// ==UserScript==

// ==UserScript==
// @name		DiG Alliance Tools
// @version 	3.1
// @namespace 	Ilude,Cavman
// @author		Ilude,Cavman
// @description	The DiG Alliance Tools - ika-core Eta and Xi Compatible
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js

// ==/UserScript==
//===========================================================================
var version=84;
var scriptlocation="http://www.ika-core.org/scripts/ika-core-tools.user.js";

alliancefullnm='Doorman is God';
alliancenm='DiG';

// Settings for every server
switch (location.host) {
	case 's14.ikariam.org':   
		alliance=	[
					['Ellas', Allies],
					['ENG', Allies],
					['VKG', Allies],
					['iLUSO', Allies],         
					['INTL', Allies],
					['LUSO', Allies],
					]   
	break;

	case 's7.ikariam.org':     
		alliance=	[
					['CCC', Allies],
					['C L', Allies],
					['VKG', Allies],
					['300', Allies],         
					['NMA', Allies],
					['GOW', Allies],   
					['Jolly', Enemies],
					['Poff', Enemies],
					['NED', Enemies],
					['ARES', Enemies],
					['PrG', Enemies],
					['M-A', Enemies],
					['PMU', Enemies],
					['AFP', Enemies],
					['TCE', Enemies],
					['J4Rck', Enemies],
					['VrG', Enemies],
					['SPh', Enemies],
					['HT-MK', Enemies],
					['TITAN', Enemies]
					];
		
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		forumurl='http://digikariam.freeforums.org/';
		forumurlnew='http://digikariam.freeforums.org/search.php?search_id=newposts';
	break;
}

	

	

 /*   var showbubble=Math.floor(Math.random()*10);

    if (showbubble%2) { //If Even

       addsbubble('diplomat',"You remind me of a man.", 68);

       addsbubble('scientist',"What man?", 71);

       addsbubble('diplomat',"The man with the power.", 72);

       addsbubble('scientist',"What power?", 74);

       addsbubble('diplomat',"The power of Hoodoo.", 77);

       addsbubble('scientist',"Who do?", 79);

       addsbubble('diplomat',"You do.", 81);

       addsbubble('scientist',"Do what?", 83);

       addsbubble('diplomat',"Remind me of a man.", 85);

       addsbubble('scientist',"What man?", 88);

       addsbubble('diplomat',"The man with the power.", 90);

       addsbubble('scientist',"What power?", 93);

       addsbubble('diplomat',"Give up?", 95);

       addsbubble('scientist',"Give up. Let's go.", 100);

    } else {

       addsbubble('general',"If they go on about Voodoo, who-do ..", 110);

       addsbubble('general', "I'm pushing them off the tower.", 118);

       addsbubble('mayor', "I'll help you.", 121);

    }



*/