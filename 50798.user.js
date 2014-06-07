// ==UserScript==
// @name		The Ika-core FUSION
// @version 	84
// @namespace 	Jonaswlad
// @author	Jonaswlad
// @description	 - GNV - Esta aliança, visa unir os cidadãos das ilhas até onde ela possa alcançar. Com objetivos comuns a todos. 
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================

var version=84;
var scriptlocation="http://www.ika-core.org/scripts/ika-core-tools.user.js";

Alliance	=	['Cyan','Green'];
Allies		=	['Blue','Blue'	];
Brothers	=	['Green','Green'];
NoAlliance	=	['Purple','Brown'];
Enemies		=	['Red','Red'];
Enemies1	=	['black','black'];


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='GNV';
		alliancenm='GNV';		
		alliance=[	['ï¿½o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['7CITY'	, Allies	],
					['A-JSN'  	, Allies	],
					['_MA_'         , Allies	],
					['-=+'		, Enemies 	],];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		forumurl='.';
		//forumurl='http://forum.com/';
		forumurlnew='.';
		//forumurlnew='http://=newposts';
		break;
}
main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
//	showgames();
	
	
    /* var showbubble=Math.floor(Math.random()*10);
    if (showbubble%2) { //If Even
        addsbubble ( "diplomat", "Voce lembrar-me de um homem.", 68);
        addsbubble ( "acientist", "Que homem?", 71);
        addsbubble ( "diplomat", "O homem com o poder.", 72);
        addsbubble ( "acientist", "Que poder?", 74);
        addsbubble ( "diplomat", "O poder do Vudu.", 77);
        addsbubble ( "acientist", "Quem ?", 79);
        addsbubble ( "diplomat", "Tu"., 81);
        addsbubble ( 'acientist', "Fazer o que?", 83);
        addsbubble ( "diplomat", "Lembra-me de um homem.", 85);
        addsbubble ( "acientist", "Que homem?", 88);
        addsbubble ( "diplomat", "O homem com o poder.", 90);
        addsbubble ( "acientist", "Que poder?", 93);
        addsbubble ( "diplomat", "Dame-se?", 95);
        addsbubble ( "acientist", "Desista. vamos la.", 100);
     ) Else (
        addsbubble ( "general", "Se eles fizeram Voodoo, que-fazer ..", 110);
        addsbubble ( "general", "Eu vou empurra-los fora da torre.", 118);
        addsbubble ( "mayor", "Eu vou te ajudar.", 121);
     )

*/