// ==UserScript==
// @name			Icefilms Tweaks
// @namespace		http://userscripts.nerdwaller.com (under construction)
// @description		Removes many items that slow icefilms load or are unnecessary. Adds support for new rapidshare/MU banners
// @author			Nerdwaller
// @version			2.2
// @include			www.icefilms.info
// @include			www.icefilms.info/*
// @include			*.icefilms.*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

// Version 2.2 Updates:
//     Items divided up to allow user choosing included items (if you want favorites, or whatever)
//     Removes the items with the classes added, not just hides
//     Removes the episode stream past the "stream"th episode (you can customize this with the variable "stream")
//	   Removes the episode stream headers past the "stream_head"th occurrance (you can customize this)
//     Added new items to remove the new Rapidshare banners

var stream = 20;
var stream_head = 9;

// Set classes to all the unwanted sections
	// Header
		$('#plbutton').addClass("removeme");  // < Favorites Star
		$("[href='http://www.icedivx.com/donate.php']").addClass("removeme");  // < Donate Button
		$("[href='http://forum.icefilms.info']").addClass("removeme");  // < Forum Link
	
	// Left Column
		$("li:contains('Statistics')").addClass("removeme");					// < Statistics
		
	// Main Column
		$("h1:contains('Megaupload Links')").addClass("removeme");				// \/ Megaupload Links Announcement
		$("p:contains('Megaupload has been')").addClass("removeme");
		$("p:contains('As many of you may already be aware')").addClass("removeme");
		$("p:contains('http://torrentfreak.com/megaupload-shut-down-120119/')").addClass("removeme");
		$("h1:contains('*** Megaupload is down')").addClass("removeme");
		$("p:contains('Yep. RapidShare.')").addClass("removeme");				// \/ Rapidshare Announcements
		$("h1:contains('You can now add RapidShare')").addClass("removeme");
		$("h1:contains('RapidShare SUCKS.')").addClass("removeme");
		$("p:contains('RapidShare's decision to limit all free user downloads')").addClass("removeme");
		$("p:contains('Concerns and questions about alternative')").addClass('removeme');
		$('a[href="http://forum.icefilms.info/viewtopic.php?f=24&t=65037&p=179639#p179639"]').addClass('removeme');
		$("h1:contains('Do Not Update')").addClass("removeme");					// \/ divX promps					
		$("p:contains('The new version of the DIVX')").addClass("removeme");
		$("p:contains('If you are repeatedly')").addClass("removeme");
		$("table:contains('Install This Version')").addClass("removeme");
		$("a:contains('Install AC3')").addClass("removeme");					// \/ AC3 Filter
		$("a:contains('No Sound?')").addClass("removeme");
		$("h1:contains('Tutorial!')").addClass("removeme");						// \/ Anon Tutorial(s)
		$("[href='https://docs.google.com/document/pub?id=1JOtVuUSrvadUVb3dVeY5_zLM55rXa1dFtS1pFYPmVIo']").addClass("removeme");
		$("p:contains('Setting up Icefilms for beginners')").addClass("removeme");
		$("p:contains('Tutorial: Basic troubleshooting')").addClass("removeme");
		$("p:contains('Hidden Ad')").addClass("removeme");						// Hidden Ad Banner
		$("p:contains('DON'T CLICK THE BANNERS BELOW THIS LINE!')").addClass("removeme");
		
		$("h1:contains('IQS 5.x Tutorial')").addClass("removeme");					// 1/15/13
		$("h1:contains('How To Make The Player Appear')").addClass("removeme");   
		$("h1:contains('IQS 5.x Troubleshooting')").addClass("removeme");
		$("p a[href='http://forum.icefilms.info/viewtopic.php?f=35&t=68515']").addClass("removeme");
		$("p a[href='http://forum.icefilms.info/viewtopic.php?f=24&t=72508']").addClass("removeme");
		$("p a[href='http://forum.icefilms.info/viewtopic.php?f=35&t=72246&p=196665#p196665']").addClass("removeme");
		$("h1:contains('3D Movies On Your')").addClass("removeme");
		$("h1:contains('Choice of VLC,')").addClass("removeme");
		$("p span:contains('We've heard your complaints.')").addClass("removeme");
	
	// Right Column Removed, IMO there is nothing useful as a user there.
		$("div[style='z-index:10;position:absolute;right:0px;top:40px;background-color:black;padding-right:10px;']").addClass("removeme");

	// Footer
		$("[href='http://forum.icefilms.info/viewtopic.php?f=24&t=11121']").addClass("removeme");
		$("[href='/membersonly']").addClass("removeme");  // Members Only
		$("iframe[src='http://www.icedivx.com/chat.php']").addClass("removeme");  // Chat
		$("a:contains('Members Login')").addClass("removeme");  // Members Login
		$("center:contains('No Sound?')").addClass("hideme");  // No Sound? (ac3 filter) -- Scripts are included here so it is just hidden.
		$("#chat").remove();  // Chat box.
		
// Decrease the number of streamed elements
	$('div#fp_articles > h1').slice( stream_head ).addClass("removeme");
	$('p > a > img').slice( stream ).addClass("removeme");	
	


// Remove them all!
$(".removeme").remove();
$(".hideme").hide();





// NOTES:
/* 
   Changelog:
     Version 1.0: Removed the barebones extras, side panel, some main content.
     
     Version 1.1: Added options that let users select some options they may want

     Version 2.0: Added the script to display a user defined # of items in the new release feed.
     
     Version 2.2: Added the removal of the new Rapidshare stuff.  Added description why Rapidshare is down.

*/