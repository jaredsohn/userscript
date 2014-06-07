// ==UserScript==
// @name    		Gaia - Add useful links to user menu
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description 	Wherever the user menu dropdown exists on Gaia, adds an "Add Profile Comment" link, a Userstore link, a "View Posts" link, and a "View Topics" link.
// @include 		http://www.gaiaonline.com/*
// @include 		http://gaiaonline.com/*
// @require 		http://code.jquery.com/jquery-1.3.2.min.js
// @require 		http://sizzlemctwizzle.com/updater.php?id=66101
// ==/UserScript==

/* Latest version: Switched "View Posts" to use /myposts instead of /gsearch. */

function AddMenuLinks(event) 
{ 
	var changed = event.target.id;
	if( ($(this).css("display") == "block") && (changed == "avatar_menu" || changed == "jointhem") )
	{
		var checkcomment = document.getElementById("addcomment");
		//if the comment link doesn't exist yet, then arrange the old links and add the new links
		 if (!checkcomment)
		{
			var postslink = document.getElementById("viewposts");
			var posts = postslink.firstChild;
			var userid = posts.href.match(/\d+/);
			var username = document.getElementById("jointhem").firstChild.title.replace("Join ","");
			var PMline = document.getElementById("sendpm");
			var achievements = $(this).find("a[href*='achievements']")[0].parentNode;
			
			var sep = '<li id="sep" class="menu_seperator">&nbsp;</li>';
			var topics = '<li id="viewtopics"><a href="/forum/mytopics/'+userid+'" title="View forum topics by '+username+'">View Topics</a></li>';
			var comments = '<li id="addcomment"><a href="/profiles/?mode=addcomment&u='+userid+'" title="Add a profile comment for '+username+'">Add Comment</a></li>';
			var store = '<li id="userstore"><a href="/marketplace/userstore/'+userid+'" title="View '+username+'\'s Marketplace store">View Store</a></li>';
			var newlinks = topics + sep + comments;
			
			$(achievements).insertAfter(achievements.nextSibling);
			$(posts).attr("href", "/forum/myposts/"+userid);
			$(posts).attr("title", "View forum posts by "+username);
			$(postslink).insertBefore(PMline);
			$(newlinks).insertBefore(PMline);
			$(store).insertAfter("#trade");
		}
	}
}

/* The arena's avatar menus are weird and annoyingly have no ids */
function AddArenaMenuLinks(event) 
{
	var gallery = $(this).find("a[title*='Gallery']")[0];
	var userid = gallery.href.match(/\d+/);
	var username = gallery.title.match(/ (.+)'s /)[1];
	var commentid = "addprocomment" + userid;
	var checkcomment = document.getElementById(commentid);
	
	// if the comment link doesn't exist yet, then add the new links
	if (!checkcomment)
	{
		var PMline = $(this).find("a[href*='privmsg']")[0].parentNode;
		var tradeline = $(this).find("a[href*='mode=trade']")[0].parentNode;
		
		var sep = '<li id="sep" class="menu_seperator">&nbsp;</li>';
		var posts = '<li id="viewposts"><a href="/forum/myposts/'+userid+'" title="View forum posts by '+username+'">View Posts</a></li>';
		var topics = '<li id="viewtopics"><a href="/forum/mytopics/'+userid+'" title="View forum topics by '+username+'">View Topics</a></li>';
		var comments = '<li id="'+commentid+'"><a href="/profiles/?mode=addcomment&u='+userid+'" title="Add a profile comment for '+username+'">Add Comment</a></li>';
		var store = '<li id="userstore"><a href="/marketplace/userstore/'+userid+'" title="View '+username+'\'s Marketplace store">View Store</a></li>';
		var newlinks = posts + topics + sep + comments;
		
		$(newlinks).insertBefore(PMline);
		$(store).insertAfter(tradeline);
	}
}

var loc = document.URL;
if (loc.indexOf("/arena/") != -1 && loc.indexOf("/winners/") == -1) 
{
	//everywhere in the Arenas except the winners page, which uses normal menus
	$("div.individual_menuArena").live("DOMAttrModified", AddArenaMenuLinks);
}
else 
{ 
	$("#avatar_menu").live("DOMAttrModified", AddMenuLinks);
}
