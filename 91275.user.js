// ==UserScript==
// @name          Tribal Wars Hotkeys
// @namespace     zrnecx
// @description   Hotkeys to Tribal Wars
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// ==/UserScript==
	

plugins.hotkeys = { // Quick Access Keys
				gm_quick_buttons: function(screen) { // The main function
				location.href=twe.currentServer+"/game.php?screen="+screen+"&villageid="+personals.currentVillage; // Changes the current screen
				},
				// The following set of functions is made because you cannot send parameters to a function via greasemonkey commands so they will send the parameters to the main function
				f0 : function(){
				plugins.hotkeys.gm_quick_buttons("overview_villages");
				},
				f1 : function(){
				plugins.hotkeys.gm_quick_buttons("overview");
				},
				f2 : function(){
				plugins.hotkeys.gm_quick_buttons("map");
				},
				f3 : function(){
				plugins.hotkeys.gm_quick_buttons("main");
				},
				f4 : function(){
				plugins.hotkeys.gm_quick_buttons("barracks");
				},
				f5 : function(){
				plugins.hotkeys.gm_quick_buttons("stable");
				},
				f6 : function(){
				plugins.hotkeys.gm_quick_buttons("workshop");
				},
				f7 : function(){
				plugins.hotkeys.gm_quick_buttons("place");
				},
				f8 : function(){
				plugins.hotkeys.gm_quick_buttons("academy");
				},
				f9 : function(){
				plugins.hotkeys.gm_quick_buttons("statue");
				},
				set_shortcuts : function(){
				// Follows the template for each function and page
				// GM_registerMenuCommand("Title","function with no () = without parameters","Shortcut Key","Simultaneous Shortcut Buttons","Selection Key = If you are selecting this from the GM menu which key to press to start command should be a char from the cmd title");
				GM_registerMenuCommand( twe.lang("overviews"), plugins.hotkeys.f0 , "0", "control alt", "" );
				GM_registerMenuCommand( twe.lang("overview"), plugins.hotkeys.f1 , "1", "control alt", "" );
				GM_registerMenuCommand( twe.lang("map"), plugins.hotkeys.f2 , "2", "control alt", "" );
				GM_registerMenuCommand( twe.lang("main"), plugins.hotkeys.f3 , "3", "control alt", "" );
				GM_registerMenuCommand( twe.lang("barracks"), plugins.hotkeys.f4 , "4", "control alt", "" );
				GM_registerMenuCommand( twe.lang("stable"), plugins.hotkeys.f5 , "5", "control alt", "" );
				GM_registerMenuCommand( twe.lang("workshop"), plugins.hotkeys.f6 , "6", "control alt", "" );
				GM_registerMenuCommand( twe.lang("place"), plugins.hotkeys.f7 , "7", "control alt", "" ); 
				GM_registerMenuCommand( twe.lang("academy"), plugins.hotkeys.f8 , "8", "control alt", "" ); 
				GM_registerMenuCommand( twe.lang("statue"), plugins.hotkeys.f9 , "9", "control alt", "" ); 
				},
				'enhance_game' : function() { // Set the shortucts on every page of your village
				plugins.hotkeys.set_shortcuts();
				},

		'info' : {
		'mandatory' : false,
		'name' : "TW Quick Buttons",
		'desc' : "Access each page of your village by a shortcut!",
		'version' : "0.1",
		'dev' : "enduo"
		}

				};

