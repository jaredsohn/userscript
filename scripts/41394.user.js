// ==UserScript==
// @name                Ikariam: Night Warriors Alliance
// @version             v2
// @namespace           Ika-core
// @author              biccius
// @description         Night Warriors Alliance - Ika-core tools
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

// Alliance	=	[	'Blue'	,'Blue'	];
// Allies		=	[	'Cyan'	,'Green'];
// NoAlliance	=	[	'Pink'	,'Pink'	];
// Enemies		=	[	'Red'	,'Red'	];

// Settings

switch (location.host) {

// s3.ikariam.it

	default:
		alliancefullnm='Night Warriors';
		alliancenm='NWRRS';		
		alliance=[	['No alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['FOXH'		, Alliance	],
					['-SA-'	, Alliance	],
					['WRLD'	, Alliance	],
					['FXR' 	, Alliance	],
					['CPA'		, Enemies 	],
					['A CPA'		, Enemies 	],  ];

// Use the DOT (.) to not include the chat, forum, forumnew in the menu.

	chaturl='http://NWRRS.freeshoutbox.net';
	forumurl='http://nwrrs.foru,free.net';
	forumurlnew='http://nwrrs.forumfree.net/?act=Search&CODE=getactive' ;

}

	main();
	ToolsMenu();


var displayedflag = 0;

unsafeWindow.displaychat = function() {
	if(displayedflag == 0) {
		document.getElementById("chatframe").innerHTML = '<iframe width="764" border="0" frameborder="0" height="100%" src="http://NWRRS.freeshoutbox.net" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showchat = function() {
	if(document.getElementById("chatbar").style.left == "-802px")
	{
		document.getElementById("chatbar").style.left = "0px;"
	}
	document.getElementById("chatbar").style.left = "0px;"
}

unsafeWindow.hidechat = function() {
	document.getElementById("chatbar").style.left = "-802px;"
}

vchatbar = document.createElement("div");
vchatbar.setAttribute("id", "chatbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vchatbar);


var wkHTML = '<div id="chattab" onmouseover="showchat()" onclick="hidechat()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://ikariamwikibar.googlepages.com/wikibar_bgtop.gif);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;">Night Warriors Chat</a></div>'
	+ '<div id="chatframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaychat()">Mouse over this area to load the chat</div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://ikariamwikibar.googlepages.com/wikibar_bgbot.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#chatbar { background:url(http://ikariamwikibar.googlepages.com/wikibar_bgmid.gif); padding-top:33px; width:800px; position:fixed; left:-802px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#chatbar:hover { left:0px; }");
GM_addStyle("#chattab { background:url(http://img527.imageshack.us/img527/2136/chatlogotn8.gif); width:26px; height:100px; position:absolute; right:-26px; top:4px; } ");
GM_addStyle("#chattab:hover { cursor: pointer; } ");

document.getElementById("chatbar").innerHTML = wkHTML;

///// End of script /////