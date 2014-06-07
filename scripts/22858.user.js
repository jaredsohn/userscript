// ==UserScript==
// @name           skull Facebook Skin..
// @namespace      Facebook
// @description    spinning skull facebook skin
// @include        http://*.facebook.com/*
// ==/UserScript==

// ==== VARIABLE DEFS ====
var cTitleColour	= "#000000";			// Dark Green        = #000000
var cHeadingColour	= "#9933FF";			// Medium Grey/Green = #000000
var cSectionColour	= "#9933FF";			// Very Light Green  = #000000

// ==== Navigator = TOP BAR (i.e. Profile/Friends/Networks Etc. ====
// * Start of JS error prevention *
if (document.getElementById("navigator")) {		// Check existance of Navigator to prevent JavaScript errors

// Turn top bar background black
document.getElementById("navigator").style.background = cTitleColour + " url() no-repeat scroll left bottom";


// ==== Content = The MAIN BODY of the Facebook page ====

// Turn all hyperlinks in black
var mylinks = document.getElementById("content").getElementsByTagName("A");
for (var i = 0; i < mylinks.length; i++) {
	mylinks[i].style.color = cTitleColour;	
}

// ==== Home_sidebar = RIGHT HAND SIDE SIDE BAR ON HOME SCREEN ====

if (document.getElementById("home_sidebar")) {
	// Make home_sidebar background grey
	document.getElementById("home_sidebar").style.backgroundColor = cSectionColour;	
	
	// Now turn all section headings a darker green (hyperlinks were dealt with by the Content hyperlinks)
	mylinks = document.getElementById("home_sidebar").getElementsByTagName("DIV");
	for (var i = 0; i < mylinks.length; i++) {
		if (mylinks[i].className.toLowerCase() == "sidebar_item_header clearfix") {
			mylinks[i].style.backgroundColor = cHeadingColour;
		}
	}
}

// ==== Sidebar_content = NORMAL SEARCH AND APPS LEFT HAND SIDE SIDE BAR ====

// Turn left hand sidebar background grey
document.getElementById("sidebar_content").style.backgroundColor = cSectionColour;		

// Now turn left hand side bar hyperlinks black as these were not part of Content.
mylinks = document.getElementById("sidebar_content").getElementsByTagName("A");
for (var i = 0; i < mylinks.length; i++) {
	mylinks[i].style.color = cTitleColour;	
}

// ==== BACK TO MAIN BODY ====

// Deal with all DIVs in the main body of the Facebook page as there will be lots of box sections with
// headings and sub headings that need the shades changing to dark grey.
mylinks = document.getElementById("content").getElementsByTagName("DIV");
for (var i = 0; i < mylinks.length; i++) {

	// Main section headings
	if (mylinks[i].className.toLowerCase() == "box_head clearfix" || 
	    mylinks[i].className.toLowerCase() == "box_head clearfix moveable" ) {
		mylinks[i].style.backgroundColor = cHeadingColour;
	}
	
	// Sub headings
	if (mylinks[i].className.toLowerCase() == "box_subhead clearfix" || 
	    mylinks[i].className.toLowerCase() == "box_subhead clearfix moveable" ) {
			mylinks[i].style.backgroundColor = cSectionColour;
	}
	
	// Account info headings at the top
	if (mylinks[i].className.toLowerCase() == "account_info clearfix" || 
	    mylinks[i].className.toLowerCase() == "account_info clearfix moveable" ) {
			mylinks[i].style.backgroundColor = cSectionColour;
	}	
	
	// The Wall headings
	if (mylinks[i].className.toLowerCase() == "wallheader") {
			mylinks[i].style.backgroundColor = cSectionColour;
	}		
	
	// Wall Post section
	if (mylinks[i].id.toLowerCase() == "inline_wall_post") {
				mylinks[i].style.backgroundColor = cSectionColour;
	}		
}

// Couple more bits of text that should match the link colours
mylinks = document.getElementById("content").getElementsByTagName("H2");
for (var i = 0; i < mylinks.length; i++) {
	mylinks[i].style.color = cTitleColour;
}

// ==== CHANGE THE FACEBOOK LOGO ====

mylinks = document.getElementById("sidebar").getElementsByTagName("A");
for (var i = 0; i < mylinks.length; i++) {
	if (mylinks[i].className.toLowerCase() == "go_home") {
		mylinks[i].style.background = "url(http://i6.tinypic.com/85aess1.jpg)";
	}
}

// ==== Now manipulate the BODY's font and background etc. ===
document.body.style.fontFamily = "Calibri Bold";
document.getElementById("content").style.backgroundColor = "#9999CC";
document.body.style.backgroundImage = "url(http://i223.photobucket.com/albums/dd237/demon_dragon_fly/tetesmort273yi.gif)";

// ==== Get rid of advert ====
if (document.getElementById("ssponsor")) {
	document.getElementById("ssponsor").innerHTML = "";
}

// * END OF JS ERROR PREVENTION *
}

// ==== END ====