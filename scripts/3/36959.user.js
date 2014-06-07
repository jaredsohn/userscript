// ==UserScript==
// @name          Custom Domo SB (v 3.0.1)
// @namespace     aeria
// @description	  Rename Domo Shout Box users
// @author        Xyria (Unsight)
// @homepage      http://forums.aeriagames.com/
// @include       http://forums.aeriagames.com/*
// ==/UserScript==

// Shows all users' customized backgrounds/titles if true
// Shows only the current users' customized backgrounds/titles if false
var showAll = true;

// Shows avatars if true
var useAvatars = true;

// Add more lines to this to replace more names
var nameReplaced = {
	// Old Name               New Name
	"Unsight"               : "Xyria"
	,"exomega255"           : "Zephyro"
	,"EAKMcDowell"          : "Eva-chan"
	,"cenic5"               : "Sekushi"
	,"AKFrost"              : "AKFrost"
	,"hiromuramoto"         : "Glyth"
	,"Ashleechii"           : "Cotton"
	,"juliens6"             : "Savvy"
	,"wigsey"               : "Wiggy"
	,"Cervios"              : "Cerv"
	,"Mayasong"             : "Aidy"
	,"Triysle"              : "Tee"
	,"JulieHime018"         : "Bunneh"
	,"DevilYoshi12"         : "Yoshi*"
	,"tight5000"            : "Ryuusama"
	,"ProLife"              : "Ishkhari"
	,"EvaMarie"             : "Cylvia"
	,"RedshirtRGM79"        : "Zethre"
	,"Lizerd"               : "Az"
	,"tasherana"            : "Rana"
	,"heir"                 : "Forza"
	,"ixnextli"             : "VixenBlue"
	,"LyonSablae"           : "XTFOX"
	,"ForContestEntry"      : "Fichina"
	,"justin199"            : "DivineRose"
	,"Kupsy"                : "Samansa"
	,"GrandDreaming"        : "SnowCrash"
}

// Add more lines to create more titles
var titleReplaced = {
    // User Name              New Title
	 "Unsight"              : " - Shura Angel"
	,"Triysle"              : " - Moderator"
	,"Axnyr"                : " - Ghost D. Prince"
}

// Add the hex code for the color you want
var titleColor = {
	// Pink - #fc1cfc
	// Ghost - #e4d7ff
    // User Name              New Title
	 "Unsight"              : "#fc1cfc"
//	,"Saioul"               : "#1E5B7E"
	,"Axnyr"                : "#9900FF"
}

// Add the background color you want
var bgColor = {
	// Pink - #fce6fc
	// Blue - #e1ecfe
	// Green - #c5f7ce 9af0aa
	// Ghost - #f0e9ff
	// Purple - #eae1ff
	// User name              Color
	"Unsight"               : "#fce6fc url(http://i263.photobucket.com/albums/ii153/CeriseVictory/Domo/SB%20Colors/PinkSB.png) repeat-x left bottom"
	,"exomega255"           : "#e1ecfe url(http://i263.photobucket.com/albums/ii153/CeriseVictory/Domo/SB%20Colors/BlueSB.png) repeat-x left bottom"
	,"Axnyr"                : "#f0e9ff url(http://i263.photobucket.com/albums/ii153/CeriseVictory/Domo/SB%20Colors/GhostSB.png) repeat-x left bottom"
//	,"EAKMcDowell"          : "#ffe1e1 url(http://i263.photobucket.com/albums/ii153/CeriseVictory/Domo/SB%20Colors/RedSB.jpg) repeat-x left bottom"
//	,"Cervios"              : "#eae1ff url(http://i263.photobucket.com/albums/ii153/CeriseVictory/Domo/SB%20Colors/PurpleSB.png) repeat-x left bottom"
}

// Add the avatar url you want
var avatar = {
     "Unsight"              : "http://s.aeriagames.com/files/avatars/35/3514535/picture-3514535.jpg"
	,"exomega255"           : "http://s.aeriagames.com/files/avatars/83/1407583/picture-1407583.png"
	,"EAKMcDowell"          : "http://s.aeriagames.com/files/avatars/237/2843737/picture-2843737.png"
//	,"Ashleechii"           : "http://s.aeriagames.com/files/avatars/360/1122860/picture-1227234493.gif"
	,"RedshirtRGM79"        : "http://s.aeriagames.com/files/avatars/97/2147597/picture-1227402084.png"
//	,"Cervios"              : "http://s.aeriagames.com/files/avatars/304/757304/picture-757304.jpg"
}

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Ensure that jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; runJQueryScripts(); }
}
GM_wait();

// Run every 800 milliseconds
window.setInterval(runJQueryScripts, 800)

// Run scripts which depend on JQuery
function runJQueryScripts() {
  
	// Ensure there is no conflict between jQuery and other libraries
	$.noConflict()
  
	// Get currently logged in user
	var user = $(".username").children("a").children("strong").text();
	
	// Give comments float to allow avatars
	$("div.aComment").each(function() { 
		$(this).css("float", "left");
	});
  
	// Changing ugly margin into nice padding
	$("div.shoutComment").each(function() { 
		$(this).css("margin-top", "0");
		$(this).css("margin-bottom", "0");
		$(this).css("padding-top", "3px");
		$(this).css("padding-bottom", "3px");
	});
  
	// Fun Shoutbox stuff
	$(".aComment").each(function() {
	
		// Get Shout Box Speaker
		var speaker = $(this).children(".shoutComment").children(".name").text();

		// Create avatar
		if( avatar[speaker] && useAvatars ) {
			$(this).prepend('<div style="float: left; height: 50px; width: 50px; padding-bottom: 0px;"><img src="' + avatar[speaker]  + '" height=50 width=50 /></div>');
		}
		
		// Replace background color
		if( (user == speaker || "Unsight" == speaker || showAll) && bgColor[speaker] ) {
			$(this).css("background", bgColor[speaker]);
		}
		
		// Replace titles
		if( titleReplaced[speaker] ) {	
			// Attempt to get title
			var title = $(this).children(".shoutComment").children(".rankingTitle");
		
			// See if the title exists
			if( title.text() ) {
				// Make sure we keep the special <span class="rank"> tag
				title.children(".rank").text(titleReplaced[speaker]);
			} else {				
				// Make sure it's Xyria or the user
				if( (user == speaker || "Unsight" == speaker || showAll) && titleColor[speaker] )
				{
					// Create a new title from scratch
					title .text(titleReplaced[speaker]);
					
					// Color title
					title .css('color', titleColor[speaker]);
				}
			}
		}
		
		// Replace names
		if( nameReplaced[speaker] ) { 
			$(this).children(".shoutComment").children(".name").children("a").text(nameReplaced[speaker]); 
		}
	});
  
}