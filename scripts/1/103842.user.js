// ==UserScript==
// @name    		GOnline Forum Selector
// @author  		Edited by V5 (http://www.gonline.com/profiles/?u=15121979)
// @description 	The current forum page is very useless and obselete. This will allow users of GOnline to select a forum from any page on the site and be taken there.
// @include 		http://www.gonline.com/forum*
// @include 		http://gonline.com/forum*
// @include 		http://www.gonline.com/*
// @include 		http://gonline.com/*
// @include 		https://www.gonline.com/*
// @include 		https://gonline.com/*
// @require 		http://code.jquery.com/jquery-1.3.2.min.js
// @require 		http://sizzlemctwizzle.com/updater.php?id=80660
// ==/UserScript==

/* Only version available */

/* Begin deprecated script update checker code - will remove next version */
var version_timestamp = 1296117134470;
/* End Script Update Checker code */

/* Check to see if the forum list has been updated - only every 144 hours */
if (parseInt(GM_getValue("lastForumCheck","0"))+86400000<=(new Date().getTime()))
{
	var grabber = document.createElement("div");
	$(grabber).load("/gsearch #forum", function() 
	{
		var forumlist = $(grabber).html();
		if (forumlist != GM_getValue("GOnlineForumDropdown","") )
		{
			GM_setValue("GOnlineForumDropdown", forumlist);
		}
		GM_setValue("lastForumCheck",new Date().getTime()+"");
		addJumper();
	}); 
}
else
{
	addJumper();
}

/* Adds the jumpbox to the page */
function addJumper() 
{
	var jumpform = GM_getValue("GOnlineForumDropdown");
	jumpform = jumpform.replace('<select name="forum" id="forum">', '<select id="jumpbox-picker">');
	jumpform = jumpform.replace('<option value="public">All Forums</option>', '<option value="">Select a Forum</option>');

	/* adds the forum select dropdown box to most forum pages */
	var loc = document.URL;
	if ( loc.indexOf("/forum/compose/") == -1 )  // activates on every forum page except compose/edit
	{
		var forumbox;
		var forumtype;
		if ( loc.indexOf("/t.") != -1 ) // if a thread
		{
			forumbox = $("#content-padding div.bg_plate:eq(1)");
			if ($("#content div").hasClass("event_bg")) // if an event forum
			{
				$(forumbox).css("width","100%");
			}
		}
		else if ( document.title.indexOf("Main Index | Forum | Gaia Online") != -1 ) // main forum page
		{
			forumbox = $("#bd div.yui-u:eq(0)");
			forumtype = "main";
		}
		else if ( loc.indexOf("forum/subscription/") != -1 ) // subscribed threads page
		{
			forumbox = $("#bd div.yui-u:eq(0)");
			forumtype = "subscribed";
		}
		else forumbox = $("#yui-main div.yui-b:eq(0)"); // other pages
		
		if (forumbox)
		{
			var jumpbox = document.createElement("form");
			jumpbox.id = "jumpbox";
			jumpbox.style.cssFloat = "right";
			jumpbox.style.fontSize = "13px";
			if ( forumtype == "main" )
			{
				jumpbox.style.paddingRight = "75px";
			}
			else if ( forumtype == "subscribed" )
			{
				jumpbox.style.paddingTop = "10px";
				jumpbox.style.paddingBottom = "10px";
			}
			
			jumpbox.innerHTML = jumpform;
			$(forumbox).append(jumpbox);
		}
	}

	/* Adds event listener to the forum selector */
	if ( document.getElementById("jumpbox") )
	{
		var picker = document.getElementById("jumpbox-picker");
		picker.addEventListener("change", jump, false);
	}

}

/* Gets the selected forum number and takes us there */
function jump()
{
	var x = document.getElementById("jumpbox-picker").selectedIndex;
	var value = document.getElementById("jumpbox").getElementsByTagName("option")[x].value;
	var forum = value.split(" ");
	var new_location = "/forum/" + forum[1] + "/f." + forum[0] + "/";
	window.location = new_location;
}