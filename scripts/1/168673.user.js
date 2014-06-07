// ==UserScript==
// @name           Raid Catcher, load ! (BETA)
// @namespace      tag://kongregate
// @description    Getting bored about the alert box that say "All RaidCatcher servers failed to respond. Attempting to load script without server interaction." ? You won't see it anymore with this script !
// @author         YepoMax
// @version        0.0.1
// @date           05/27/2013
// @grant          None
// @include		   *armorgames.com/dawn-of-the-dragons-game*
// @include        http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// @include        *newgrounds.com/portal/view/609826*
// @include        *web*.dawnofthedragons.com/*
// ==/UserScript==


/* Very short code that catch alert function.

Next code will verify if Raid Catcher loaded in order to restart */

prev_alert = alert;
unsafeWindow.alert = function(text){
	if(text == "All RaidCatcher servers failed to respond. Attempting to load script without server interaction."){
		console.log("All RaidCatcher servers failed to respond. Attempting to load script without server interaction.");
	}else{
		prev_alert(text);
	}
}
alert = unsafeWindow.alert;
/* --- END --- */