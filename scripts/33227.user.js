// ==UserScript==
// @name           blip.fm Growl Notifications for Fluid
// @include        http://blip.fm/*
// ==/UserScript==
/*

blip.fm Growl Notifications for Fluid
Version 0.1

Copyright 2008 by Max Winde http://twitter.com/343max
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

*/

if(window.fluid) {

	BlipUI.playBlipOrg = BlipUI.playBlip;

	BlipUI.playBlip = function(D, E) {
		BlipUI.playBlipOrg(D, E);
		var message = $("nowplaying").innerHTML.replace(/^Now Playing:\s*/,'');
		
		window.fluid.showGrowlNotification({
		    title: "blip.fm is now playing",
		    description: message,
		    identifier: "blip.fm"
		});
		
	};

}
