// ==UserScript==
// @name		RDC Tools
// @version 	0.2	
// @namespace 	elemilio
// @author	solo modificado por elemilio
// @description	    Modificacion de prueba de ika-core para usar en la alianza Reyes del Caos
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//Esto es una pequeña modificacion al script original de ika-core, es totalmente libre y sin copyright
//en un principio esta pensada para la alianza RDC Reyes del Caos. pero se puede usar con cualquier otra, pero la informacion de los 
//Jugadores aliados no se mostrara


var version=73;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

Alliance	=	[	'Green'	,'Blue'		];
Allies		=	[	'Cyan'	,'Green'	];
NoAlliance	=	[	'Purple','Brown'	];
Enemies		=	[	'Red'	,'Red'		];


// Configuracion para cualquier servidor
switch (location.host) {
	default:
		alliancefullnm='Reyes del Caos';
		alliancenm='RDC';		
		alliance=[		['Νo alliance'		, NoAlliance		],
					[ alliancenm		, Alliance		],
					['cRDC'			, Alliance		] ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	}
	main();
	ToolsMenu();
	fixtreaties();
	
