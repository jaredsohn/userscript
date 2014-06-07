// ==UserScript==
// @name Yahoo Fantasy Toggle
// @namespace https://dl.dropbox.com/u/68992713/Scripts/
// @description Switches between one Yahoo Fantasy League and another.  Edit the script to include your teams!  (Links replace the "Make Y! your homepage" link at the top...but seriously, who cares about that?)
// @version 0.23
// @include http://football.fantasysports.yahoo.com/*
// ==/UserScript==

// Step 1: create a 2D array of your league names and ID numbers

var leagues= [];

// Modify your league values here.  Make sure to put the numbers in quotes!

leagues[0] = ["Kenosis Fantasy Football", "447716"];
leagues[1] = ["HOPE League", "534779"];

// Step 2: Identify which league you're currently on, and remove it from the array.

var currentURL = window.location.href;
var currentLeague = "";

for(i=0;i<leagues.length;i++){

	if(currentURL.indexOf(leagues[i][1]) !== -1){
		currentLeague = leagues[i][1];
		leagues.splice(i,1);
	}

}

// Step 3:  Create an array of links and titles, each link replacing the current league ID with another league ID.

leagueLinks = [[]];

for(i=0;i<leagues.length;i++){

	leagueLinks[i][0] = leagues[i][0];
	leagueLinks[i][1] = currentURL.replace(currentLeague,leagues[i][1]);

}

// Step 4:  create a long html string with links to all leagues in LeagueLinks array.

var newHTML = "";
for(i=0;i<leagueLinks.length;i++){

	newHTML += "<a href=\"";
	newHTML += leagueLinks[i][1];
	newHTML += "\">";
	newHTML += leagueLinks[i][0];
	newHTML += "</a>";
	
}

// Step 5:  Replace "homepage?" html with new html.

var container = document.getElementById('yuhead-promo');
container.innerHTML = newHTML;