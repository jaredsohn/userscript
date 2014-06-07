// ==UserScript==
// @name           Steam Community Extras
// @namespace      Rissole
// @version        2.0
// @description    Adds some extra actions to a Steam Community profile page.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include        http*://steamcommunity.com/id/*
// @include        http*://steamcommunity.com/profiles/*
// @include        http*://www.steamcommunity.com/id/*
// @include        http*://www.steamcommunity.com/profiles/*
// ==/UserScript==

// Emulate GM_get/setValue if it doesnt exist
(function(){

// if this doesnt exist then we arent on a community page.
var actionsHeader = $("div.profile_header_actions");
if (actionsHeader.length == 0)
	return;
	
// get steamId64
var steam_id = unsafeWindow.g_rgProfileData['steamid'];
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function to add all the DOM stuff for a new action link
function addAction(iconURL, linkURL, linkText)
{
	var actionString = "<a class='popup_menu_item' href=\"$LINK\"><img src='$ICON' />$TEXT</a>".replace('$LINK',linkURL).replace('$ICON',iconURL).replace('$TEXT',linkText);
	var action = $(actionString);
	
	actionBlock.append(action);
	return action;
}

// function for when Edit Notes is pressed
function editNotes()
{
	var note = GM_getValue(steam_id, "Enter notes here");
	var newNote = window.prompt("User notes", note);
	if (newNote != note && newNote != "" && newNote != null)
		GM_setValue(steam_id, newNote);
}

// Make 'Add Friend' button appear+use steam protocol link
var addFriendItem = $('a[href$="AddFriend()"]');
var madeMoreButton = false;
if (addFriendItem.length == 0 && $('#profile_action_dropdown_link').length == 0)
{
	actionsHeader.append('<a class="btn_profile_action btn_medium" href="steam://friends/add/'+steam_id+'"><span>Add Friend</span></a>');
	actionsHeader.append('<span class="btn_profile_action btn_medium" id="profile_action_dropdown_link" onclick="ShowMenu( this, \'profile_action_dropdown\', \'right\' );"><span>More <img src="http://cdn.steamcommunity.com/public/images/profile/profile_action_dropdown.png"></span></span>');
	actionsHeader.append('<div id="profile_action_dropdown" class="popup_block" style="visibility: visible; left: -5px; top: 75px; display: none;"><div class="popup_body popup_menu"></div></div>');
	madeMoreButton = true;
}
else if (addFriendItem.length > 0)
{
	// modify the AddFriendItem to use steam:// protocol
	addFriendItem.attr('href', "steam://friends/add/"+steam_id);
}

var actionBlock = actionsHeader.find("div.popup_body");
// first a horizontal rule
if (madeMoreButton == false)
	actionBlock.append("<hr/>");

// Add "View Backpack on TF2B" action
addAction("http://i498.photobucket.com/albums/rr344/hypersniper090/steamcommunity%20extras/tf2bico.png", "http://tf2b.com/tf2/"+steam_id, "View Backpack on TF2B");

// Add steamrep link
addAction("http://i498.photobucket.com/albums/rr344/hypersniper090/steamcommunity%20extras/steamrep.png", "http://steamrep.com/index.php?id="+steam_id, "View SteamRep Profile");

// Add notes section
addAction("http://i498.photobucket.com/albums/rr344/hypersniper090/steamcommunity%20extras/PetitionGossipIcon.png", "javascript:void(0);", "Edit notes").click(editNotes);

// Add steamID64, with clipboard copy
addAction("http://i498.photobucket.com/albums/rr344/hypersniper090/steamcommunity%20extras/PetitionGossipIcon.png", "javascript:window.prompt('Steam ID:', '"+steam_id+"'); void(0)", steam_id);
})();