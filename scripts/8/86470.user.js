// ==UserScript==
// @name    		LJ Killfile for Friends Page (Minimalism)
// @author  		Mindset (http://mindset.livejournal.com)
// @description 	Remove posts on your LJ friendslist made by specific users. Especially useful for posts to communities. Currently for the Minimalism style only.
// @include 		http://*.livejournal.com/friends*
// @include 		http://users.livejournal.com/*/friends*
// @require 		http://code.jquery.com/jquery-1.3.2.min.js
// @require 		http://sizzlemctwizzle.com/updater.php?id=86470
// ==/UserScript==

// OPTIONS ////////////////////////////////////////////////////////////////////////////////
// Replace the example usernames with the usernames of whomever you wish to killfile.    //
// If you have more than three users to kill, just continue in the same format.          //
// (You can keep the "userexamples" as placeholders, since nobody has those usernames.)  //
//                                                                                       //
var killfile = ["userexample01", "userexample02", "userexample03"];
///////////////////////////////////////////////////////////////////////////////////////////

/* Begin deprecated script update checker code - will remove next version */
var version_timestamp = 1296117134470;
/* End Script Update Checker code */

for (i in killfile)
{
	var users = $("#page div.content dd.username span.ljuser[lj\\:user="+killfile[i]+"]");
	var entry = users.parents("div.entry-wrap");
	var prevline = entry.prev("div.hr");
	var nextline = entry.next("div.hr");
	entry.css("display", "none");
	prevline.css("margin-bottom", "1em");
	nextline.css("margin-top", "1em");
	var blocktext = "<div class='entry-wrap' style='font-size:1.3em;'>Post by <b>"+killfile[i]+"</b> blocked.</div>"; 
	nextline.before(blocktext);
}