// ==UserScript==
// @name         Steam Community - add extra links to profiles
// @author       Denilson Sá
// @namespace    http://my.opera.com/CrazyTerabyte/
// @version      2.4
// @description  On a Steam Community profile, this script adds a extra links
//               to third-party sites that show information about this user.
// @include      http://steamcommunity.com/id/*
// @include      https://steamcommunity.com/id/*
// @include      http://steamcommunity.com/profiles/*
// @include      https://steamcommunity.com/profiles/*
// ==/UserScript==

(function () {
	"use strict";

	function get_steam_id() {
		// There is a global object storing all relevant user information.
		// This should be available anytime, logged in or logged out.
		if (window.g_rgProfileData && window.g_rgProfileData.steamid) {
			return window.g_rgProfileData.steamid;
		}

		// Alternatively, looking for "Report abuse" hidden ID.
		// It is only available if the browser is logged in.
		var abuse_id_input = document.querySelector('#abuseForm input[name="abuseID"]');
		if (abuse_id_input) {
			return abuse_id_input.value;
		}

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

	var extra_links = [
		/* Documentation for this format:
		{
			'prefix': 'Prefix, at the left column:',
			'links': [
				{
					'name':     'Link name',
					'tooltip':  'Optional tooltip (title attribute)',

					// How to describe a link URL:
					'both':     'URL if it supports both "id" and "name" INSERTHERE'
					// or
					'id':       'URL that only supports "id" INSERTHERE',
					'profiles': 'URL that only supports "name" INSERTHERE'
					// or
					'id_only':  'URL that only supports "id", and there is no URL that supports "name" INSERTHERE'

				}
			]
		}
		*/
		{
			'prefix': 'Steam',
			'links': [
				{
					'name': 'randomsteamgame',
					'both': 'http://randomsteamgame.com/id/INSERTHERE'
				},
				{
					'name':    'SteamCompletionist',
					'id_only': 'http://www.steamcompletionist.net/INSERTHERE/'
				},
				{
					'name':    'SteamRep',
					'id_only': 'http://steamrep.com/profiles/INSERTHERE'
					// Search by name only works if the name is already cached in the site. Search by id works every time.
					//'both': 'http://steamrep.com/index.php?id=INSERTHERE'
				},
				{
					'name': 'Wasted on Steam',
					'both': 'http://wastedonsteam.com/usd/id/INSERTHERE'
				}
				/* Offline since January 2013.
				{
					'name': 'SteamCalculator',
					'both': 'http://www.steamcalculator.com/id/INSERTHERE'
				}
				*/
				/* Offline since... whenever
				{
					'name': 'Steam Analysis',
					'both': 'http://www.lambentstew.com/webblog/miniproject/steamanalysis?steamid=INSERTHERE'
				}
				*/
				/*
				{
					'name': 'Steam Trades',
					'both': 'http://www.steamtrades.com/user/INSERTHERE'
				},
				*/
			]
		},
		{
			'prefix': 'Achievements',
			'links': [
				{
					'name':    'Achievement Stats',
					// Note: this only works if the profile is already cached.
					'id_only': 'http://www.achievementstats.com/index.php?action=profile&playerId=INSERTHERE'
					// To force a profile retrieval, there is a POST to:
					// http://www.achievementstats.com/index.php?action=search
					// with form data player=INSERTHERE
				},
				{
					'name':     'AStats',
					'tooltip':  'This link only works if the profile is already cached by the site.',
					'id_only':  'http://astats.astats.nl/astats/User_Info.php?steamID64=INSERTHERE',
					// This one could work great if FindUser.php also accepted a GET request.
					// 'id':       'http://astats.astats.nl/astats/User_Info.php?steamID64=INSERTHERE',
					// 'profiles': 'http://astats.astats.nl/astats/FindUser.php?UserID=INSERTHERE'
				},
				{
					'name':    'sAPI',
					'both':    'http://sapi.techieanalyst.net/?page=profile&id=INSERTHERE'
				},
				/* This one uses AJAX to retrieve players.
				{
					'name': 'site does not have a name',
					'both': 'http://steam.jsarabians.com/steam/Lookup.aspx?this_does_not_work=INSERTHERE'
				}
				*/
				/* Offline as of 2013-11-06
				{
					'name':    'SteamScore',
					'id_only': 'http://steamscore.net/INSERTHERE'
				}
				*/
			]
		},
		{
			'prefix': 'Inventory',  // multi-games
			'links': [
				{
					'name':     'Bazaar.tf',
					'id_only':  'http://bazaar.tf/backpack/INSERTHERE'
				},
				{
					'name':     'OPTF2',
					'both':     'http://optf2.com/inv/user/INSERTHERE'
					//'both':     'http://optf2.com/inv/INSERTHERE'
					//'both':     'http://optf2.com/d2/user/INSERTHERE'    // DOTA 2
					//'both':     'http://optf2.com/d2b/user/INSERTHERE'   // DOTA 2 beta
					//'both':     'http://optf2.com/p2/user/INSERTHERE'    // Portal 2
					//'both':     'http://optf2.com/tf2/user/INSERTHERE'   // Team Fortress 2
					//'both':     'http://optf2.com/tf2b/user/INSERTHERE'  // Team Fortress 2 beta
				},
				{
					'name':     'TF2B',
					'both':     'http://tf2b.com/id/INSERTHERE'
					//'both':     'http://tf2b.com/d2/INSERTHERE'   // DOTA 2
					//'both':     'http://tf2b.com/p2/INSERTHERE'   // Portal 2
					//'both':     'http://tf2b.com/tf2/INSERTHERE'  // Team Fortress 2
				}
			]
		},
		{
			'prefix': 'Dota 2',
			'links': [
				{
					'name':     'DOTABUFF',
					'both':     'http://dotabuff.com/search?q=INSERTHERE'
				}
				// Not added because there is no GET request:
				// http://pubstats.me/
				// Not added because they are not working:
				// http://stats.dota2.be/
				// http://www.dota2dmg.com/
				// http://www.dota2.verychard.com/
			]
		},
		{
			'prefix': 'Team Fortress 2',
			'links': [
				{
					'name':     'backpack.tf',
					'both':     'http://backpack.tf/id/INSERTHERE'
					// 'id':       'http://www.tf2items.com/profiles/INSERTHERE'
				},
				{
					'name':     'TF2Items',
					'id':       'http://www.tf2items.com/id/INSERTHERE',
					'profiles': 'http://www.tf2items.com/profiles/INSERTHERE'
				},
				{
					'name':     'tf2ls',
					'both':     'http://tf2ls.com/id/INSERTHERE'
				},
				{
					'name':     'TF2Stats',
					'both':     'http://tf2stats.net/player_stats/INSERTHERE'
				},
				{
					'name':     'uhatsearch',
					'both':     'http://uhatsearch.appspot.com/backpack/INSERTHERE'
				}
				/* Offline as of 2013-11-06
				{
					'name':     'TF2Auctions',
					'id_only':  'http://www.tf2auctions.com/backpack#INSERTHERE'
				}
				*/
			]
		},
		{
			'prefix': 'TF2 crafting',
			'links': [
				{
					'name':     'TF2Crafting',
					'both':     'http://www.tf2crafting.info/id/INSERTHERE'
				},
				{
					'name':     'WillItCraft',
					'id':       'http://willitcraft.com/id/INSERTHERE',
					'profiles': 'http://willitcraft.com/profiles/INSERTHERE'
				}
			]
		}
	];

	function create_link(linkdef) {
		// Global/external vars (read-only):
		// profile_id_or_name, profile_type, steam_id

		var URL, param;

		if (linkdef.both) {
			URL = linkdef.both;
			param = profile_id_or_name;
		} else if (linkdef.id_only) {
			URL = linkdef.id_only;
			param = steam_id;
		} else {
			URL = linkdef[profile_type];
			param = profile_id_or_name;
		}

		URL = URL.replace('INSERTHERE', param);
		
		var a = document.createElement('a');
		a.setAttribute('href', URL);
		if (linkdef.tooltip) {
			a.setAttribute('title', linkdef.tooltip);
		}
		a.setAttribute('style', 'padding-left: 2em; display: inline-block;');
		a.textContent = linkdef.name;
		return a;
	}

	function create_link_table() {
		var table = document.createElement('table');
		var tbody = document.createElement('tbody');
		table.appendChild(tbody);

		for (var i = 0; i < extra_links.length; i++) {
			var linkrow = extra_links[i];
			var tr = document.createElement('tr');
			var thprefix = document.createElement('th');
			var tdlinks = document.createElement('td');

			thprefix.textContent = linkrow.prefix;
			thprefix.setAttribute('style', 'text-align: left; font-weight: normal;');
			thprefix.setAttribute('nowrap', '');

			tbody.appendChild(tr);
			tr.appendChild(thprefix);
			tr.appendChild(tdlinks);

			for (var j = 0; j < linkrow.links.length; j++) {
				var linkdef = linkrow.links[j];
				//if (j > 0) {
				//	tdlinks.appendChild(document.createTextNode(', '));
				//}
				tdlinks.appendChild(create_link(linkdef));
			}
		}

		return table;
	}

	function create_box() {
		var div = document.createElement('div');
		div.setAttribute('style', 'padding: 6px 10px; margin-bottom: 8px; border-radius: 3px; background-color: #141414');
		// Adding a CSS class to further allow users to customize the look
		// (using an extension such as Stylish).
		div.setAttribute('class', 'userjs-extra-links');
		return div;
	}

	var profile_leftcol = document.querySelector('.profile_leftcol');
	if (profile_leftcol) {
		var table = create_link_table();
		var box = create_box();
		box.appendChild(table);
		profile_leftcol.insertBefore(box, profile_leftcol.firstChild);
	}

})();
