// ==UserScript==
// @name		The AIMA Tools
// @version 	86
// @namespace 	Gboz
// @author		Gboz
// @description	The AIMA alliance Tools - ika-core
// @include		http://s*.ikariam.*/*
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

var version=86;
var scriptlocation="http://www.ika-core.org/scripts/ika-core-tools.user.js";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='INTIFADA';
		alliancenm='AIMA';		
		alliance=[	[ alliancenm	, Alliance	],
			['AIMA2'		, Allies	],
			['TFANG'		, Allies	],
			['ILL'		, Enemies 	],
			['ΤΑΓΜΑ'		, Enemies 	],
			['S-W'		, Enemies 	],
			['ASP'		, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://aima.usersboard.com/chatbox/chatbox.forum';
		forumurl='http://aima.usersboard.com';
		//forumurl='http://forum.com/';
		forumurlnew='http://aima.usersboard.com/forum-f1';
		forumurlnew='http://aima.usersboard.com/forum-f2';
		forumurlnew='http://aima.usersboard.com/forum-f3';
		//forumurlnew='http://=newposts';
		break;
}