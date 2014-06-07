// ==UserScript==
// @name		Add PM Button
// @author		Shadow Thief
// @namespace	DutchSaint
// @version		0.1
// @description	Adds a "Send Private Message" button to a user's userbox so that I can clear up space in my sig
// @include		http://nolinks.net/*
// @include		http://www.nolinks.net/*
// @grant		none
// ==/UserScript==

// Version History
// ---------------
// 0.1 (13 Aug 2013) -  Initial Version

// Iterate through each post on this page
var allPostsOnThisPage = document.getElementsByClassName("blockpost");
for (var posts=0; allPostsOnThisPage.length; posts++) {
	// Extract the user's user ID from their post
	var userid = allPostsOnThisPage[posts].getElementsByTagName("a")[1].href;
	userid = userid.replace("http://nolinks.net/boards/profile.php?id=","");
	
	// Insert PM button with link to http://nolinks.net/boards/pmsnew.php?mdl=post&uid=<userid>
	var pm_place = document.getElementsByClassName("postfootleft")[posts].getElementsByTagName("p")[0].innerHTML;
	document.getElementsByClassName("postfootleft")[posts].getElementsByTagName("p")[0].innerHTML = pm_place + ' | <a target="_blank" href="http://nolinks.net/boards/pmsnew.php?mdl=post&uid='+userid+'">Send Private Message</a>';
}