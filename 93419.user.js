// ==UserScript==
// @name         steamcommunity.com tweak
// @include      http://steamcommunity.com/id/*
// @include      https://steamcommunity.com/id/*
// @include      http://steamcommunity.com/profiles/*
// @include      https://steamcommunity.com/profiles/*
// ==/UserScript==

(function() {
	// Parsing the URL
	var url_re = /^https?:\/\/steamcommunity.com\/(id|profiles)\/([^?\/]+)/;
	var result = url_re.exec(location.href);
	if( !result ) return;

	var profile_type = result[1];  // 'id' or 'profiles'
	var profile_id = result[2];

	// profile_type == 'id' means that the user has configured a custom profile URL
	// profile_type == 'profiles' means that the URL still uses the numeric profile ID

	// Each extra link must have the following attributes: 'name', 'desc'
	// It must also have either 'both' (if the same URL is used for both types
	// of profile page), or 'id' and 'profiles' (if different URLs are used for
	// different profile pages).
	var extra_links = [
		{
			'name': 'SteamCalculator',
			'desc': 'How much is it worth?',
			'both': 'http://www.steamcalculator.com/id/INSERTHERE'
		},
		{
			'name': 'SteamStats',
			'desc': 'Achievements for this user',
			'id':       'http://dev.zr40.nl/steam/redirect.php?customurl=INSERTHERE',
			'profiles': 'http://dev.zr40.nl/steam/redirect.php?id=INSERTHERE'
		},
		{
			'name': 'TF2Stats',
			'desc': 'Team Fortress 2 statistics',
			'both': 'http://tf2stats.net/player_stats/INSERTHERE'
		},
		{
			'name': 'TF2Items',
			'desc': 'Team Fortress 2 backpack',
			'id':       'http://www.tf2items.com/id/INSERTHERE',
			'profiles': 'http://www.tf2items.com/profiles/INSERTHERE'
		},
		{
			'name': 'OPTF2',
			'desc': 'OPTF2 backpack viewer',
			'id':       'http://optf2.com/user/INSERTHERE',
			'profiles': 'http://optf2.com/user/INSERTHERE'
		}
	];

	// Finding the "Gameplay Stats" block
	var rightStatsBlock = document.getElementsByClassName('rightStatsBlock')[0];

	for(var i = 0; i < extra_links.length; i++) {
		// Cloning two elements
		var rightGreyHR = rightStatsBlock.getElementsByClassName('rightGreyHR')[0].cloneNode(true);
		var statsItem = rightStatsBlock.getElementsByClassName('statsItem')[0].cloneNode(false);

		if(extra_links[i].both)
			var steamstats_url = extra_links[i].both;
		else
			var steamstats_url = extra_links[i][profile_type];

		steamstats_url = steamstats_url.replace('INSERTHERE', profile_id);

		statsItem.innerHTML = '<div class="statsItemName">' + extra_links[i].name + ':</div>' +
			'<a href="' + steamstats_url + '">' + extra_links[i].desc + '</a>';

		// Inserting the cloned elements
		var mostPlayedBlock = rightStatsBlock.getElementsByClassName('mostPlayedBlock')[0];
		rightStatsBlock.insertBefore(statsItem, mostPlayedBlock);
		rightStatsBlock.insertBefore(rightGreyHR, mostPlayedBlock);
	}
})();