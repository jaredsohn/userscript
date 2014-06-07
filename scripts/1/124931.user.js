// ==UserScript==
// @name         Add SteamRep to Steam Community profiles
// @author       Mattie Casper (with code borrowed from Denilson Sá)
// @namespace    http://userscripts.mattie.net
// @version      1.7.0
// @description  On a Steam Community profile, this script adds a SteamRep and tf2items viewer
// @include      http://steamcommunity.com/id/*
// @include      https://steamcommunity.com/id/*
// @include      http://steamcommunity.com/profiles/*
// @include      https://steamcommunity.com/profiles/*
// ==/UserScript==

(function () {
	"use strict";

	function get_steam_id() {
		// Looking for "Report abuse" hidden ID.
		// It should be available whenever the browser is logged in.
		var abuse_id_input = document.querySelector('#abuseForm input[name="abuseID"]');

		if (abuse_id_input) {
			return abuse_id_input.value;
		}

		// Looking for "Add friend" link.
		// It is available even if the browser is not logged in.
		var add_friend_link = document.querySelector('#rightActionBlock .actionItem a[href*="steamcommunity.com/actions/AddFriend/"]');
		if (add_friend_link) {
			var friend_re = /^https?:\/\/steamcommunity\.com\/actions\/AddFriend\/([0-9]+)/;
			var result = friend_re.exec(add_friend_link.href);
			if (result) {
				return result[1];
			}
		}
		// check to see if we get it from the global javascript
		if (g_rgProfileData)
			return g_rgProfileData["steamid"];
		
		return 'Sorry_but_steam_id_was_not_found';
	}

	// Parsing the URL
	var url_re = /^https?:\/\/steamcommunity\.com\/(id|profiles)\/([^?\/]+)/;
	var result = url_re.exec(location.href);
	if (!result) {
		return;
	}

	var profile_type = result[1];  // 'id' or 'profiles'
	var profile_id_or_name = result[2];
	var steam_id;

	// profile_type == 'id' means that the user has configured a custom profile URL
	// profile_type == 'profiles' means that the URL still uses the numeric profile ID
	if (profile_type === 'id') {
		// Need to extract the steam ID from the page contents
		steam_id = get_steam_id();
	} else {
		// Steam ID is directly available from the URL
		steam_id = profile_id_or_name;
	}

	// Finding some elements
    var profileBlock = document.getElementById('profileBlock');
	var groupsBlock = document.getElementById('primaryGroupBlock');
	
	// Elements that will be cloned
	var steamrepBase = document.createElement('div'); 
	var steamrepurl = "http://steamrep.com/index.php?id=INSERTHERE#repbox";
	steamrepurl = steamrepurl.replace('INSERTHERE', profile_id_or_name);
	var tf2itemsurl = "http://www.tf2items.com/profiles/INSERTHERE";
	tf2itemsurl = tf2itemsurl.replace('INSERTHERE', steam_id);
	steamrepBase.innerHTML = "<h1>Steamrep</h1><style>.emb {background-color:white;}</style><iframe class='emb' width='900' src='" + steamrepurl + "' height=350 />";
	var tf2itemsBase = document.createElement('div'); 
	tf2itemsBase.innerHTML = "<iframe class='emb' width='1024' height='600' src='" + tf2itemsurl + "' />";
	var profileBottom = document.getElementById('profileBlock');
	if (!profileBottom) {
		var checkNewProfile = document.getElementsByClassName('profile_content_inner');
		if (checkNewProfile)
		{
			profileBottom = checkNewProfile[0];
		}
	}
	profileBottom.appendChild(steamrepBase);
	profileBottom.appendChild(tf2itemsBase);
})();