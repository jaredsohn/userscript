// ==UserScript==
// @name           OrkutShortcuts by orkut helper
// @namespace      OrkutShortcuts by orkut helper
// @description    Keyboard shortcuts for Orkut by orkut helper
// @include        http://www.orkut.com/*
// ==/UserScript==


var bodies;
var fnCheckShortcut;

fnCheckShortcut = function(e){
	
	// H = 72
	// S = 83
	// F = 70
	// C = 67

	
	if(e.ctrlKey && e.shiftKey && e.keyCode == 72){ // Ctrl + Shift + H will open Home
		window.location.href = "http://www.orkut.com/Home.aspx";
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 83){ // Ctrl + Shift + S will open Scrapbook
		window.location.href = "http://www.orkut.com/Scrapbook.aspx";
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 70){ // Ctrl + Shift + F will open Friends
		window.location.href = "http://www.orkut.com/Friends.aspx";
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 67){ // Ctrl + Shift + C will open Communities
		window.location.href = "http://www.orkut.com/Communities.aspx";
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 72){ // Ctrl + Shift + E will open Editing profile
		window.location.href = "http://www.orkut.com/EditSummary.aspx";
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 83){ // Ctrl + Shift + A will open Album
		window.location.href = "http://www.orkut.com/AlbumList.aspx";
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 70){ // Ctrl + Shift + V will open Videos
		window.location.href = "http://www.orkut.com/FavoriteVideos.aspx";
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 67){ // Ctrl + Shift + M will open Messages
		window.location.href = "http://www.orkut.com/Messages.aspx";

}


document.addEventListener("keydown",fnCheckShortcut,0);

// Focus on the scrap text are when any scrapbook is opened,
var scrapBookLink = "Scrapbook.aspx"
if(window.location.href.indexOf(scrapBookLink) != -1){
	var scrapTB = document.getElementById("scrapText");
	
	if(scrapTB != null){
		scrapTB.focus();
	}

}