// ==UserScript==
// @name	Emperors of Ice
// @version 	8
// @namespace 	Gboz
// @author	Gboz
// @description	Ika-core.org ultilitarios para Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched. Your not allowed to edit or copy ika-core.js, read license inside the file.
// You can create a copy of Ika-core-SearchTools.user.js and host it anywhere, when a new version of ika-core.js comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=8;
var scriptlocation="http://userscripts.org/scripts/source/37765.user.js";

switch (location.host) {

	case 's1.ikariam.com.br':
		alliancefullnm='ICE';
		alliancenm='ICE';		
		alliance=[	['Νo alliance'	, NoAlliance],
				[ alliancenm	, Alliance	],
				['AcICE'		, Allies	],
				['FACH'          , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='http://empice.forums-free.com/chat/';
		//chaturl='http://empice.forums-free.com/chat/';
		forumurl='http://empice.forums-free.com/';
		//forumurl='http://empice.forums-free.com/';
		forumurlnew='http://empice.forums-free.com/portal.html' ;
		//forumurlnew='http://empice.forums-free.com/portal.html';
		break;

	case 's9.ikariam.com.br':
		alliancefullnm='DKL';
		alliancenm='DKL';		
		alliance=[	['Νo alliance'	, NoAlliance],
				[ alliancenm	, Alliance	],
				[''		, Allies	],
				[''          , Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='http://dkl.forums-free.com/chat/';
		//chaturl='http://dkl.forums-free.com/chat/';
		forumurl='http://dkl.forums-free.com/';
		//forumurl='http://dkl.forums-free.com/';
		forumurlnew='http://dkl.forums-free.com/portal.html' ;
		//forumurlnew='http://dkl.forums-free.com/portal.html';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();
	


