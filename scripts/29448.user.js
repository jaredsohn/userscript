// ==UserScript==
// @name        Pandora Growl Played Song
// @namespace   http://fluidapp.com
// @description Displays a growl notification when a new song is played
// @include     http://www.pandora.com/*
// @author      Mark Kendall
// ==/UserScript==

function songPlayed(args) {
	window.fluid.showGrowlNotification({
		title: "Now Playing", 
		description: args.songName + "\nby " + args.artistName, 
		sticky: false,
		identifier: "Pandora",
		icon: args.artURL
	});
}

Pandora.setEventHandler("SongPlayed", songPlayed);
