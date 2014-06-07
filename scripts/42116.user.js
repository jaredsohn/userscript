// ==UserScript==
// @name                Ikariam: Night Warriors + Angels of War Alliance Script
// @version             v2.3
// @namespace           Ika-core
// @author              biccius
// @description         Night Warriors + Angels of War Alliance - Ika-core tools
// @include		http://s3.ikariam.it/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
// Basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
// stays untouched.

// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
// ika core hold its own version number now.

var version=2;
var scriptlocation="http://userscripts.org/scripts/source/41394.user.js";

// Set the highlight colors for every case
// can be red, green, blue etc
// also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
// or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
// if u still dont understand google for html style color


Fox	=	[	'#7FFF00'	,'Green'	];
Sa	=	[	'#7FFF00'	,'Green'	];
Wrld	=	[	'#7FFF00'	,'Green'	];
Fxr	=	[	'#7FFF00'	,'Green'	];


// Alliance	=	[	'Blue'	,'Blue'	];
// Allies		=	[	'Cyan'	,'Green'];
// NoAlliance	=	[	'Pink'	,'Pink'	];
// Enemies		=	[	'Red'	,'Red'	];

// Settings

switch (location.host) {

// s3.ikariam.it

	default:
		alliancefullnm='NWAGW';
		alliancenm='NWAGW';		
		alliance=[	['No alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['FoxH'		, Alliance	],
					['-SA-'	, Alliance	],
					['WRLD'	, Alliance	],
					['FXR' 	, Alliance	],
					['PHS'	, Alliance	],
					['PMKI'	, Alliance	],
					['U-L'	, Alliance	],
					['Sirio'		, Enemies 	],
					['HSH'		, Enemies 	],
					['Sirac'		, Enemies 	],
					['HSH-2'		, Enemies 	],
					['SOS'		, Enemies 	],  ];

// Use the DOT (.) to not include the chat, forum, forumnew in the menu.

	chaturl='http://NWRRS.freeshoutbox.net';
	forumurl='http://nwrrs.foru,free.net';
	forumurlnew='http://nwrrs.forumfree.net/?act=Search&CODE=getactive' ;

}

	main();
	ToolsMenu();




var el = document.createElement("iframe");
el.setAttribute('id', 'NwAgwChat');
el.setAttribute('width','650');
el.setAttribute('height','350');
el.setAttribute('frameborder','0');
el.setAttribute('scrolling','no');
el.setAttribute('marginheight','0');
el.setAttribute('marginwidth','0');
el.setAttribute('allowtrasparency','true');
document.body.appendChild(el);
el.setAttribute('src', 'http://chatroll.com/nwagw/embed?fgcolor=6699cc&bgcolor=ffffff&textbgcolor=ffffff&textfgcolor=000000&sound=1&border=1&w=$0');
