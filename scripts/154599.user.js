// ==UserScript==
// @name       KeyAffinity Lite
// @namespace  http://keyaffinity.k0bi.tk
// @version    1.2.1
// @description  Adds keyboard navigation functionality to FurAffinity.net
// @include      http://www.furaffinity.net/*
// @include      https://www.furaffinity.net/*
// @include      http://furaffinity.net/*
// @include      https://furaffinity.net/*
// @require    http://code.jquery.com/jquery.min.js
// @require    http://keyaffinity.k0bi.tk/scriptfiles/hotkeys.js
// @copyright  2013 Kobi Tate, Licensed GNU GPL v3
// ==/UserScript==
/*
 *
 *	 This file is part of KeyAffinity.
 *
 *   KeyAffinity is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   KeyAffinity is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of the GNU General Public License is located in LICENSE.txt
 *   and is available online at <http://www.gnu.org/licenses/gpl.txt>.
 *
 *   KeyAffinity Copyright 2013 Kobi Tate. <http://k0bi.tk/>
 *   <http://keyaffinity.k0bi.tk/>
 *
 */

console.log("KeyAffinity is running");

// Link grabbing
var prevLink = $('a.prev').attr("href"); 							// Get link to previous submission
var nextLink = $('a.next').attr("href"); 							// Get link to next submission
var faveLink = $('.alt1 a[href*="fav"]').attr("href");				// Get link to fave submission
var dlLink = $('.alt1 a[href*="facdn.net/art"]').attr("href");		// Get link to download submission
var watchLink = $('a[href*="watch"]').attr("href");					// Get link to watch user
var noteLink = $('a[href*="newpm"]').attr("href");					// Get link to note user
var subUser = $('maintable a[href*="user"]').attr("href");			// Get link to current submission user
var fullLink;

// Notification variables
var newNotifs = false;
var newSubs = false;
var newTix = false;
var newComms = false;
var newNotes = false;
var titleNotifs = false;
var pageTitle = document.title;

// Add IDs to elements to simplify jQuery contol
$('h3 input[name=nuke-watches]').attr("id", "nuke-watches");
$('input.button.remove-nuke').attr("id", "nuke-subs");
$('h3 input[name=nuke-shouts]').attr("id", "nuke-shouts");
$('h3 input[name=nuke-submission-comments]').attr("id", "nuke-comments");
$('h3 input[name=nuke-journals]').attr("id", "nuke-journals");
$('a[title^="Submissions"]').attr("id", "new-subs");
$('a[title^="Comments"]').attr("id", "new-comments");
$('a[title^="Notes"]').attr("id", "new-notes");
$('a[title^="Trouble"]').attr("id", "new-tickets");
$('li.noblock:first').attr("id", "notifs"); // Relies on the notifications div being the first noblock li, may want to change

$('li a[href*="Submission-Agreement"]').closest("li").attr("id", "lastsupport");

// Adding tooltip shortcut help
$("#nuke-watches").attr("title", "(Alt-W)");
$("#nuke-subs").attr("title", "(Alt-S)");
$("#nuke-shouts").attr("title", "(Alt-H)");
$("#nuke-comments").attr("title", "(Alt-C)");
$("#nuke-journals").attr("title", "(Alt-J)");

// Set booleans to enable and disable some functions (possible use for options page)
var control = new Boolean();		// Controls all single-key functions
var pagination = new Boolean();		// Left/right arrow keys, disabled on non-submission pages
var mainJump = new Boolean();		// jumping to main section of page, disabled on non-submission pages
var comJump = new Boolean();		// Comment textbox jumping
control = true;
pagination = true;
comJump = true;
mainJump = true;


var pathArray = window.location.pathname.split( '/' );				// Get current page, place in array
var pageType = pathArray[1];										// Grab page type (view, journal, full, etc.) from URL
var subNumber = pathArray[2];										// Grab submission number from URL

if (pageType == "view") {
	fullLink = "http://www.furaffinity.net/full/" + subNumber;
}
else if (pageType == "full") {
	fullLink = "http://www.furaffinity.net/view/" + subNumber;
}

if (pageType == "") {
	pageType = "home";
}

if (pageType == "journal" || pageType == "browse" || pageType == "search" || pageType == "home" || pageType == "submit" || pageType == "user") {
	pagination = false;
}

if (pageType != "view" && pageType != "full" && pageType != "fav"){
	comJump = false;
	mainJump = false;
}

// Debugging stuff
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
  	for(var i = 0; i < hashes.length; i++) {
        	hash = hashes[i].split('=');
        	vars.push(hash[0]);
        	vars[hash[0]] = hash[1];
    	}
	return vars;
}

var debugParam = getUrlVars()["ka-debug"];

if (debugParam == "true") {
	var debug = true;
}


// Insert the popup boxes
if (nextLink == null && pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-endreach\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-300px; width:600px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">Reached end of gallery</div>");
}

if (prevLink == null && pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-beginreach\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-300px; width:600px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999;border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">Reached beginning of gallery</div>");
}

if (pagination) {
	$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-favepop\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-25px; width:50px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999; padding-bottom:10px; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">&hearts;</div>");
}

$('.footer').before("<!-- inserted by KeyAffinity --><div id=\"keyaffinity-nomsgs\" style=\"display:none; position:fixed; top:300px; left:50%; margin-left:-300px; width:600px; height:50px; text-align:center;  background-color:rgba(0,0,0,0.5); font-size:40px; z-index:999; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">No new messages</div>");

// Insert Help window divs
$("#lastsupport").after(""+
	"<li><hr /><li>"+
	"<a href=\"#\" id=\"keyaffinity-helpshow\">KeyAffinity Help</a>"+
"");

$(".footer").before("" +
	"<!-- inserted by KeyAffinity -->"+
	"<div id=\"keyaffinity-help\" style=\"display:none; position:fixed; top:150px; left:50%; margin-left:-225px; width:450px; padding:10px; text-align:center;  background-color:rgba(0,0,0,0.7); font-size:20px; z-index:999; border-radius:10px; color:white; -webkit-box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3); box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.3);\">"+
	
	"<div id=\"keyaffinity-helpclose\" style=\" position:absolute; background-color:#CE090F; width:15px; height:15px; border-radius:10px; color:white; font-size: 10px; font-weight:bold; opacity:0.7; right:10px; cursor:pointer;\">X</div>"+
	
	"<div style=\"font-weight:bold; border-bottom:solid white 1px; margin-bottom:10px;\">KeyAffinity Help</div>"+
	
	"<table width=\"100%\" style=\"font-size:15px;\"><tr style=\"vertical-align:top;\">"+
		"<td style=\"text-align:left; width:50%; vertical-align:top;\">"+
		
			"<strong>Anywhere</strong><br />"+
			"M - Go to new messages page<br />B - Go to browse page<br />S - Go to Search page<br />"+
			"<br />"+
			
			"<strong>Submission pages</strong><br />"+
			"&rarr; - Next Submission<br />&larr; - Previous Submission<br />F - Favorite Submission<br />C - Jump to Comment box<br />&nbsp;&nbsp;&nbsp;(also works on Journals)<br />/ - Change image size<br />D - Download submission<br />"+
			"<br />"+
			
		"</td>"+
		
		"<td style=\"text-align:left; width:50%;\">"+
		
			"<strong>Messages pages</strong><br />"+
			"Alt-S - Nuke Submissions<br />Alt-C - Nuke Submission Comments<br />Alt-W - Nuke Watches<br />Alt-H - Nuke Shouts<br />Alt-J - Nuke Journals<br />"+
			"<br />"+
			
			"<strong>User profiles</strong><br />"+
			"W - Watch user<br />N - Note user<br />"+
			"<br />"+
			
		"</td>"+
	"</tr></table>"+
	
	"<div style=\"font-size:8px; opacity:0.7;\"><a href=\"http://keyaffinity.k0bi.tk\">KeyAffinity</a> &copy; 2012-2013 Kobi Tate. Distributed under the terms of GNU GPL v3.</div>"+
	
	"</div>");



if (mainJump) {
	$('html, body').animate({
		scrollTop: $('.innertable').offset().top 					// Scroll to main section of page if jumping is enabled
		}, 0);
}

// Notification div watching function
jQuery.fn.contentChange = function(callback){
var elms = jQuery(this);
elms.each(
	function(i){
		var elm = jQuery(this);
		elm.data("lastContents", elm.html());
		window.watchContentChange = window.watchContentChange ? window.watchContentChange : [];
		window.watchContentChange.push({"element": elm, "callback": callback});
	}
)
return elms;
}

setInterval(function(){
if(window.watchContentChange){
	for( i in window.watchContentChange){
		if(window.watchContentChange[i].element.data("lastContents") != window.watchContentChange[i].element.html()){
		  window.watchContentChange[i].callback.apply(window.watchContentChange[i].element);
		  window.watchContentChange[i].element.data("lastContents", window.watchContentChange[i].element.html())
		};
	}
}
}, 500);

function checkNotifs() {
	if ($('#new-notes').text() != ""){
		newNotifs = true;							// Mark new notifications as true
		newNotes = true;							// Mark new notes as true
	}
	else if ($('#new-comments').text() != "") {
		newNotifs = true;							// Mark new notifications as true
		newComms = true;							// Mark new comments as true
	}
	else if ($('#new-subs').text() != "") {
		newNotifs = true;							// Mark new notifications as true
		newSubs = true;								// Mark new submissions as true
	}
	else if ($('#new-tickets').text() != "") {
		newNotifs = true;							// Mark new notifications as true
		newTickets = true;							// Mark new support tickets as true
	}
	else {
		newNotifs = false;							// Mark new notifications as false
	}
}

checkNotifs();										// Check for new notifications each page load

$("#notifs").contentChange(function(){				// When the notifications div changes
	checkNotifs();									// See what new notications there are
});													// This is for FA Status compatibility

// Functions for controls
function prevSub() {
    if (prevLink != null && pagination) { 							// Make sure that there is an older submission
    	window.location = prevLink; 								// Redirect to it
    }
    else {
        $('#keyaffinity-beginreach').fadeIn(100).delay(500).fadeOut(100); // Show alert if no older submissions
    }
}

function nextSub() {
    if (nextLink != null) {											// Make sure there is a newer submission
        window.location = nextLink;									// Redirect to it
    }
    else {
        $('#keyaffinity-endreach').fadeIn(100).delay(500).fadeOut(100);	// Show alert if no newer submissions
    }
}

function faveSub() {
	$('#keyaffinity-favepop').show();								// Show heart popup for visual indicator
	window.location = faveLink;										// Redirect to fave link
}

function comment() {
	$('#JSMessage').focus();										// Jump to comment textarea
}

function sizeChange() {
	$('#submissionImg').trigger('click');							// Simulate image click to change size
}

function download() {
	window.location = dlLink;										// Go to download page
}

function nuke(type) {
	$("#nuke-" + type).trigger('click');							// Simulate click on nuke button
}

function goToMsgs() {
	if (newNotes){
		window.location = "/msg/pms";
	}
	else if (newSubs) {
		window.location = "/msg/submissions";
	}
	else if (newComms) {
		window.location = "/msg/others";
	}
	else if (newTix) {
		window.location = "/msg/troubletickets";
	}
	else {
		$('#keyaffinity-nomsgs').fadeIn(100).delay(500).fadeOut(100);
	}
}

function goToPage(pageName) {
	if (window.location != "http://www.furaffinity.net/" + pageName) {
		window.location = "/" + pageName;
	}
}

function watchUser() {
	if (watchLink != null) {
		window.location = watchLink;
	}
}

function noteUser() {
	if (noteLink != null) {
		window.location = noteLink;
	}
}

function toggleHelp() {
	if ($("#keyaffinity-help").css("display") == "none") {
		$("#keyaffinity-help").fadeIn();
	}
	else {
		$("#keyaffinity-help").fadeOut();
	}
}

$('#JSMessage, .textbox, #message, #keywords').focusin(function() {	// When you enter a textbox
	control = false;												// disable control
}).focusout(function() {											// When you leave the textbox
	control = true;													// reenable control
});

// Key combos for message management
if (pageType == "msg" && control) {
	$(document).bind('keydown', 'alt+s', function(){
		nuke("subs");
	});
	
	$(document).bind('keydown', 'alt+c', function(){
		nuke("comments");
	});
	
	$(document).bind('keydown', 'alt+w', function(){
		nuke("watches");
	});
	
	$(document).bind('keydown', 'alt+h', function(){
		nuke("shouts");
	});
	
	$(document).bind('keydown', 'alt+j', function(){
		nuke("journals");
	});
	
}

// Help window toggling
$(document).bind('keydown', 'alt+/', function(){
	toggleHelp();
});

$("#keyaffinity-helpshow").mousedown(function(){
	toggleHelp();
});

$("#keyaffinity-helpclose").mousedown(function(){
	toggleHelp();
});

$(document.documentElement).keyup(function (event) {				// Detect keyboard usage
    if (event.keyCode == 37 && control && pagination) {				// Watch for left arrow (key 37)
        prevSub();													// Go to previous Submission
    }
    else if (event.keyCode == 39 && control && pagination) {		// Watch for right arrow (key 39)
        nextSub(); 													// Go to next Submission
    }
    else if (event.keyCode == 70 && control && pagination) {		// Watch for F key (key 70)
    	faveSub();													// Favorite Submission
    }
    else if (event.keyCode == 67 && control && comJump) {			// Watch for C key (key 67)
    	comment();													// Jump to comment box
    }
    else if (event.keyCode == 68 && control && pagination) {		// Watch for D key (key 68)
    	download();													// Shrink/enlarge image
    }
    else if (event.keyCode == 77 && control) {						// Watch for M key (key 77)
    	goToMsgs();													// Go to new messages
    }
    else if (event.keyCode == 66 && control) {						// Watch for B key (key 66)
    	goToPage("browse");											// Go to browse page
    }
    else if (event.keyCode == 83 && control) {						// Watch for S key (key 83)
    	goToPage("search");											// Go to search page
    }
    else if (event.keyCode == 87 && control) {						// Watch for W key (key 87)
    	watchUser();												// Go to watch url if on user page
    }
    else if (event.keyCode == 78 && control) {						// Watch for N key (key 78)
    	noteUser();													// Go to note url if on user page
    }
});

$(document).bind('keydown', '/', function(){
	sizeChange();
});

if (pageType == "newpm") {
	$('input[name*="subject"]').focus();							// Jump to subject box on notes page
}

// Debug running

if (debug) {
	console.log("\n\n~~ KeyAffinity Debugging ~~");
	console.log("Previous link: " + prevLink);
	console.log("Next link: " + nextLink);
	console.log("Fave link: " + faveLink);
	console.log("Download link: " + dlLink);
	console.log("Full link: " + fullLink);
	console.log("Watch link: " + watchLink);
	console.log("Control: " + control);
	console.log("Pagination: " + pagination);
	console.log("Main section jump: " + mainJump);
	console.log("Comment jump: " + comJump);
	console.log("Page type: " + pageType);
	console.log("Submission number: " + subNumber);
	console.log("New notifications: " + newNotifs);
	console.log("New submissions: " + newSubs);
	console.log("New support tickets: " + newTix);
	console.log("New comments: " + newComms);
	console.log("New notes: " + newNotes);
	/* Options not yet implemented
	console.log("Options:");
	console.log("\tSubmission auto-scroll: " + optVar_subjump);
	console.log("\tDebug Mode: " + optVar_debug);
	*/
	console.log("~~ KeyAffinity Debugging ~~\n\n");
	
}
