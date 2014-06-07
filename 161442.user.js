// ==UserScript==
// @name        Block Facebook Games
// @version    1.0.4
// @description  Hides the offline friends from Facebook chat
// @include     /^https?://apps\.facebook\.com/.*$/
// @grant       none
// @copyright  2012+, Narender
// @author Narender
// @homepage	  http://userscripts.org/scripts/show/161442
// @downloadURL	  http://userscripts.org/scripts/source/161442.user.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(function(){
	setInterval(function(){
		console.log("games are not allowed");
		if((window.location.href).match("^(https?://)apps.facebook.com/.*")){
		console.log("Match Found!");
		gamesNotAllowed();

	}
		else{
			console.log("No match!");
		}		
}, 5000);
});

function gamesNotAllowed(){
	url="https://www.facebook.com/"
	window.location.replace(url) 
}
