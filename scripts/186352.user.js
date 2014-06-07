// ==UserScript==
// @name        The Ignorinator
// @author      Shadow Thief
// @namespace   DutchSaint
// @version     0.6
// @description Blocks all the terrible posters in the Tri-State Area
// @include     http://*nolinks.net/boards/*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.6 - (17 Jan 2014) Moved settings to profile.php
//                     - code for saving and loading settings by Keanu
//                     - settings page inspired by CitizenSlick by citizenray and Conquistador by pendevin
//                     Added a "Full Purge with Extreme Prejudice" mode to completely wipe the user from the whole site
//                     Put things in functions because it's better programming or something
// 0.5 - (27 Dec 2013) User Interface added
//                     - UI code by Keanu
// 0.4 - (27 Dec 2013) Now using the boardID instead of the board name
//                     Fixed a bug that broke quoting ignorination if a quotebox without a user was posted
//                     Added "Full Purge" option as default
//                     Blocks topics from ignorinated users
//                     Removed the ignorinated avatar to make the post smaller
// 0.3 - (18 Dec 2013) Fixed a bug that breaks the script if one of the users in the list doesn't have an avatar or sig
// 0.2 - (13 Aug 2013) Alters quoted text as well as regular posts
// 0.1 - (12 Aug 2013) Initial Version

// --------------------------------------------------- Functions ---------------------------------------------------
function loadSettings(){
	// Load the list of ignorinated users from the local store, or create a new array if necessary
	ignoreUsers = JSON.parse(GM_getValue('ignoreUsers','[]'));
	purge = JSON.parse(GM_getValue('purge','[]'));
	fullPurge = JSON.parse(GM_getValue('fullPurge','[]'));
	
	// Load the list of ignorinated places, or set the default to Off Topic if the list is empty
	ignorePlaces = JSON.parse(GM_getValue('ignorePlaces','["15"]'));
}

// Function to set, display, and save Ignorinator settings
function options(){
	// Append Ignorinator Settings to the end of the "Fiddle with settings" box
	var personal_userid = document.URL.split("=").reverse()[0];
	var settings_link = document.createElement("li");
	settings_link.innerHTML = '<a href="profile.php?section=ignorinator&id='+personal_userid+'">Ignorinator Options</a>';
	
	if (document.URL.match("ignorinator") == null) {
		var side_menu = document.getElementsByClassName("blockmenu")[0].getElementsByTagName("ul")[0];
		if (typeof side_menu != "undefined") side_menu.appendChild(settings_link);
	}
	else {
		// profile.php throws an error page if it doesn't recognize the section, so I've got to make a fake section page
		var personal_username = document.getElementById("navprofile").textContent;
		var div_brdmain = document.getElementById("brdmain");
		var div_block2col = '<div id="profile" class="block2col">';
		var div_blockmenu = '<div class="blockmenu">' +
							'<h2><span>Fiddle with settings</span></h2>' +
							'<div class="box"><div class="inbox"><ul>' +
							'<li><a href="profile.php?section=essentials&id='+personal_userid+'">Basic Stuff</a></li>' +
							'<li><a href="profile.php?section=personal&id='+personal_userid+'">Basic Stuff 2</a></li>' +
							'<li><a href="profile.php?section=messaging&id='+personal_userid+'">Useless Page</a></li>' +
							'<li><a href="profile.php?section=personality&id='+personal_userid+'">Avatar & Sig</a></li>' +
							'<li><a href="profile.php?section=display&id='+personal_userid+'">Themes/Styles etc</a></li>' +
							'<li><a href="profile.php?section=privacy&id='+personal_userid+'">Email+Tag Options</a></li>' +
							'<li class="isactive">' + settings_link.innerHTML + '</li>' +
							'</ul></div></div></div>';
		// I'm really not happy with how that table turned out in Firefox. Border="0" should make no border, not a border one pixel wide
		var div_blockform = '<div class="blockform">' +
							'<h2><span>'+personal_username+' - Ignorinator Settings</span></h2>' +
							'<div class="box"><form id="profile8">' +
							'Add users to whichever box you wish, one per line - usernames only need to be added to the relevant box<br/>'+
							'Capitalization matters - block COKECAPS, not Cokecaps<br/>'+
							'<div class="inform"><fieldset><legend>Ignorinate these users</legend>' +
							'<table border="0"><tr><th>Mask posts from these users</th>'+
							'<th>Purge all posts from these users</th>'+
							'<th><acronym title="Removes all posts that even mention the usernames listed here">'+
							'Full Purge with Extreme Prejudice</acronym></th></tr>'+
							'<tr><td><textarea id="ignorinatedUsersArea"></textarea></td>'+
							'<td><textarea id="purgeUsersArea"></textarea></td>'+
							'<td><textarea id="fullPurgeArea"></textarea></td></tr></table>'+
							'</fieldset></div><div="inform"><fieldset>' +
							'<legend>Run the Ignorinator on these boards</legend>' +
							'<div class="infldset">15 - Off Topic | 13 - Site Discussion | 79 - Up, The Loading, and Everything<br/>'+
							'Hover over other board names to get the id to use if you want to be lame and ignorinate in the Link forums<br/>'+
							'<textarea id="boardList"></textarea></div>' +
							'</fieldset><br><p class="buttons">' +
							'<input type="button" id="save" value="Save Settings" /></p></form></div>';
		div_brdmain.innerHTML = div_block2col+div_blockmenu+div_blockform+'<div class="clearer"></div>';
		
		// Place any default values in the textboxes
		document.getElementById("ignorinatedUsersArea").value = ignoreUsers.join("\n");
		document.getElementById("purgeUsersArea").value = purge.join("\n");
		document.getElementById("fullPurgeArea").value = fullPurge.join("\n");
		document.getElementById("boardList").value = ignorePlaces.join("\n");
		
		// Add an EventListener to the new buttons - onclick only works with preexisting buttons
		document.getElementById("save").addEventListener("click", saveSettings);
	}
}

// Hide any Last Post mentions of FPwEP'd users on index.php
function purgeFrontPage(){
	var last_post = document.getElementsByClassName("tcr");
	for (var i=0; i<last_post.length; i++){
		if (typeof last_post[i].getElementsByClassName("byuser")[0] == "undefined") continue;
		var last_username = removeFirstWord(last_post[i].getElementsByClassName("byuser")[0].innerHTML);
		if (fullPurge.indexOf(last_username) > -1) last_post[i].innerHTML="";
	}
}

// Remove PMs by FPwEP'd users
function purgePMs(){
	var pms = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for (var i=0; i<pms.length; i++){
		var starter = pms[i].getElementsByTagName("a")[1].innerHTML;
		var ender = pms[i].getElementsByTagName("a")[2].innerHTML;
		if ( fullPurge.indexOf(starter) > -1 || fullPurge.indexOf(ender) > -1 ) pms[i].innerHTML="";
	}
}

// Hide or remove quotes by ignorinated users
function purgeQuotes(user_post){
	posted_quotes = user_post.getElementsByClassName("quotebox");
	
	if (posted_quotes.length > 0){
		for (var quote = 0; quote < posted_quotes.length; quote++){
			// Ignore quoteboxes that have no user, because otherwise the script breaks for some reason
			if (typeof posted_quotes[quote].getElementsByTagName("cite")[0] == "undefined") continue;
			
			// We don't have to check for FPwEP users because they're already been taken care of in purgeTopic()
			// We do, however, need to check that we're in a forum where ignorination is active
			var q_username = posted_quotes[quote].getElementsByTagName("cite")[0].textContent;
			q_username = q_username.replace(" wrote:", "");
			
			if (ignorePlaces.indexOf(forum_id) > -1) {
				if (purge.indexOf(q_username) > -1){
					posted_quotes[quote].parentElement.removeChild(posted_quotes[quote]);
				}
				if (ignoreUsers.indexOf(q_username) > -1){
					var original_quote = posted_quotes[quote].getElementsByTagName("div")[0].textContent;
					original_quote = original_quote.replace(/["':|]/g,"");
					posted_quotes[quote].getElementsByTagName("div")[0].innerHTML='<center><acronym title="'+
						original_quote+'">This post has been IGNORINATED! Hover over this text to ' +
						'see the original post.</acronym></center>';
				}
			}
		}
	}
}

// Remove references to FPwEP'd users from subforum listings
function purgeSubforum(){
	for (var last_post = 1; last_post < subforum_posts.length; last_post++){
		var sub_username = removeFirstWord(subforum_posts[last_post].getElementsByClassName("byuser")[0].innerHTML);
		if (fullPurge.indexOf(sub_username) > -1){
			subforum_posts[last_post].innerHTML="";
		}
	}
}

// Hide or remove posts by ignorinated users
function purgeTopic(){
	all_posts = document.getElementsByClassName("blockpost");
	
	// Go in reverse to avoid the deletions messing up the numbering
	for (var post = all_posts.length-1; post >= 0; post--){
		// FPwEP means that posts even mentioning ignorinated users get deleted
		for (var i = 0; i < fullPurge.length; i++){
			if (all_posts[post].innerHTML.toUpperCase().match(fullPurge[i].toUpperCase()) != null) {
				all_posts[post].innerHTML="";
			}
		}
	
		// Determine if there are quotes from ignorinationable users in posts
		purgeQuotes(all_posts[post]);
		
		// Regular ignorination and basic full purge only work on specific sub-forums
		if (ignorePlaces.indexOf(forum_id) > -1){
			username = all_posts[post].getElementsByTagName("a")[1].innerHTML;
			if (purge.indexOf(username) > -1){
				all_posts[post].innerHTML="";
			}
			if (ignoreUsers.indexOf(username) >-1 ){
				// Purge postleft section and sig (if sig exists)
				all_posts[post].getElementsByClassName("postleft")[0].innerHTML = "<div><dl><dt>"+
					username+"</dt></div>";
				all_posts[post].getElementsByClassName("postfoot")[0].innerHTML = "";
				if (typeof all_posts[post].getElementsByClassName("postsignature")[0] != "undefined") {
					all_posts[post].getElementsByClassName("postsignature")[0].innerHTML = "";
				}
				
				// Replace post with ignorination text
				var original_post = all_posts[post].getElementsByClassName("postmsg")[0].innerHTML;
				original_post = original_post.replace(/["']/g,"");
				all_posts[post].getElementsByClassName("postmsg")[0].innerHTML = '<center><acronym title="'+
				original_post+'">This post has been IGNORINATED! Hover over this text to see the original post.</acronym></center>';
			}
		}
	}
}

// Hide or remove topics by ignorinated users
function purgeTopicList(){
	// FPwEP mode eliminates any "last post"s in subforums
	if (document.getElementById("vf1") != null){
		subforum_posts = document.getElementById("vf1").getElementsByClassName("tcr");
		purgeSubforum();
	}

	all_topics = document.getElementById("vf").getElementsByTagName("tr");
	// Go in reverse to avoid the deletions messing up the numbering
	for (var topic = all_topics.length-1; topic >= 0; topic--){
		var topic_title = all_topics[topic].getElementsByClassName("tcl")[0].getElementsByTagName("a")[0].innerHTML;
		var creator = all_topics[topic].getElementsByClassName("tc2")[0].getElementsByTagName("a")[0].innerHTML;
		var last_poster = removeFirstWord(Array.prototype.slice.call(all_topics[topic].getElementsByClassName("byuser")).reverse()[0].innerHTML);
		
		// FPwEP mode ignores forum - purge topics by these users, topics where they were the last poster, and topics about them
		if (fullPurge.indexOf(creator) > -1 || fullPurge.indexOf(last_poster) > -1){
			all_topics[topic].parentElement.removeChild(all_topics[topic]);
		}
		for (var i=0; i < fullPurge.length; i++){
			if (topic_title.match(fullPurge[i]) != null) {
				all_topics[topic].parentElement.removeChild(all_topics[topic]);
			}
		}
		
		// Regular ignorination and basic full purge only work on specific sub-forums
		if (ignorePlaces.indexOf(forum_id) > -1){
			if (purge.indexOf(creator) > -1){
				all_topics[topic].parentElement.removeChild(all_topics[topic]);
			}
			if (ignoreUsers.indexOf(creator) > -1){
				original_topic = all_topics[topic].getElementsByClassName("tclcon")[0].getElementsByTagName("a")[0].innerHTML;
				original_topic = original_topic.replace(/["']/g,"");
				all_topics[topic].getElementsByClassName("tclcon")[0].getElementsByTagName("a")[0].innerHTML = '<acronym title="'+
					original_topic+'">This topic has been IGNORINATED! Hover over this text to see the original title.</acronym>';
			}
		}
	}
}

function removeFirstWord(str){
	var twostar = str.substr(str.indexOf(" ")+1);
	return twostar;
}

function storeArray(textid){
	// Split input from the textareas on newline characters
	var nameParser = document.getElementById(textid).value.split(/\n/);
	var notWhitespace = /\S/g;
		
	//Purge the array before a save to avoid duplicate entries
	var name=[];
	
	// Push each line into the array, ignoring blank lines
	for( var i=0;i<nameParser.length;i++) {
		if (notWhitespace.test(nameParser[i].trim())) name.push(nameParser[i].trim());
	}
	
	return name;
}

function saveSettings(){
	// Store values of textareas in arrays
	ignoreUsers = storeArray("ignorinatedUsersArea");
	purge = storeArray("purgeUsersArea");
	fullPurge = storeArray("fullPurgeArea");
	ignorePlaces = storeArray("boardList");
	
	// Store data locally in case people don't want it stored in their cookies
	GM_setValue('ignoreUsers', JSON.stringify(ignoreUsers));
	GM_setValue('purge', JSON.stringify(purge));
	GM_setValue('fullPurge', JSON.stringify(fullPurge));
	GM_setValue('ignorePlaces', JSON.stringify(ignorePlaces));
}
// ------------------------------------------------- Main  Section -------------------------------------------------
var ignoreUsers, purge, fullPurge, ignorePlaces;
var all_posts, all_topics, forum_id, original_topic, posted_quotes, subform_posts, username;
loadSettings();

// If the user is on profile.php, display Ignorinator Options in the "Fiddle With Settings" box
if (document.URL.match("profile") != null) options();

// If the user is on the main page, hide or remove any undesirable last posts
if (document.URL == "http://nolinks.net/boards/" || document.URL == "http://www.nolinks.net/boards/" || document.URL.match("index") != null) purgeFrontPage();

// If the user is on pmsnew.php, remove any undesirable PMs
if (document.URL.match("pmsnew") != null) purgePMs();

forum_id = document.getElementsByClassName("crumbs")[0].getElementsByTagName("a")[1].href.split("=")[1];
// If the user is on viewforum.php, hide or remove any undesirable topics
if (document.URL.match("viewforum") != null) purgeTopicList();

// If the user is on viewtopic.php, hide or remove any undesirable posts
if (document.URL.match("viewtopic") != null) purgeTopic();