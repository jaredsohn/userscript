// ==UserScript==
// @name				Global Message - Inforge.net
// @description		Send message to all users of the current topic.
// @namespace			inforge.net
// @icon				http://www.inforge.net/favicon.ico
// @include			/^(http://)?(www\.)?inforge\.net/community/[\w-]{1,}/\d{6}-.{1,}(\.html)$/
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @downloadURL		http://userscripts.org/scripts/source/183463.user.js
// @run-at			document-end
// @version			0.5
// ==/UserScript==



// ======================= START COPYRIGHT ==========================//
//																			     //
//          				 Created by Error218, for the staff Inforge.net       				             //
//                                                                  											     //
//				   This script is free, if you payed for it.. you are a moron!				     //
//              			           You can do what you want with this     					             //
//                 				 for any non-commercial purpose.                 					     //
//                                                                   											     //
//  Copyright 2013.                                                  									     //
// ======================== END COPYRIGHT ==========================//


var $grandgrandmother = $("ul#postlist_popups");		// This is the menu where I'll add my custom element

// Declaring the elements
var $grandmother;
var $mother;
var $child;

// Initializing them 
$grandmother = $("<li class=\"popupmenu\" id=\"globalmessage\">");
$mother = $("<h6>");
$child = $("<a class=\"popupctrl\" href=\"javascript://\" id=\"boxxy-you-see\">Global Message</a>");

// Add 'em to the page
$grandgrandmother.append($grandmother);
$grandmother.append($mother);
$mother.append($child);

$child.click( function() {
	// TODO: check all the pages of the post and get all the uids of the post.

	var $father = $("li.welcomelink");
	var $son = $father.children("a").eq(0);
	var sunoftheson = $son.attr("href").match(/\d{6}/);
	var yourid = sunoftheson[sunoftheson.length-1];
	    
	var $users = $("a.siteicon_message");									// Gets all the user's new pm links in the page
	var newpm = "http://www.inforge.net/community/private.php?do=newpm";		// Base string for send a new pm
	var tmpuid;														// Temp var used for store current user ID
	
	$users.each(function(){
		tmpuid = $(this).attr("href").split("&u=")[1];
		if((newpm.indexOf(tmpuid) == -1) && (tmpuid != yourid))
			newpm += "&userid[]=" + tmpuid;
	});
	
	if(newpm != "http://www.inforge.net/community/private.php?do=newpm")
		OpenInNewTab(newpm);												// Open the newpm page
	else
		alert("Only you writed in this topic.");
} );


function OpenInNewTab(url)		// StackOverflow <3
{
	var win=window.open(url, '_blank');
	win.focus();
}