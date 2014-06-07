// ==UserScript==
// @name		Lux Tools
// @version 	83
// @namespace 	Emperor
// @author		Emperor
// @description	Lux Tools based on ika-core script
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
var version=83;
var scriptlocation="http://userscripts.org/scripts/show/39260";

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Nulli Secundus';
		alliancenm='Lux';		
                alliance=[	
['Νo alliance'	, NoAlliance],
[ alliancenm	, Alliance],
[ 'Lux2'	, Alliance],
['DARF' , Allies ],
['DEZA' , Allies ],
['Eddie' , Allies ],
['Fks-2' , Allies ],
['FOX' , Allies ],
['Fwkis' , Allies ],
['ILL' , Allies ],
['REV' , Allies ],
['test' , Allies ],
                 ];

		chaturl='http://nullisecundus.4forum.biz/chatbox/chatbox.forum?';
		forumurl='http://nullisecundus.4forum.biz/;'
		forumurlnew='http://nullisecundus.4forum.biz/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	fixtreaties();