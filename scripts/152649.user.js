// ==UserScript==
// @name        Track SteamGifts sync
// @namespace   http://userscripts.org/users/274735
// @description When visiting the SteamGifts.com sync page, alerts you when games have been added or removed from your account
// @include     http://www.steamgifts.com/sync
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.1
// @updateURL   https://userscripts.org/scripts/source/152649.meta.js
// @downloadURL https://userscripts.org/scripts/source/152649.user.js
// ==/UserScript==
var a = 0
try {
	var local_storage_key = 'steamgifts game list'
		
	// retrieve old list
	var old_list = JSON.parse(GM_getValue(local_storage_key, '[]'))
	if (typeof(old_list) != 'object') old_list = []

	// compose new list
	var new_list = []
	var games = $('.invites .code, .invites .heading')

	for (var i = 0; i < games.length; i += 1) {
	    var game = $(games[i]).text()
	    if ($(games[i]).attr('class') == 'heading') {
	    	// break after the "Games in Your Account" section
	        if (game != 'Games in Your Account') break
	    } else {
	        new_list.push(game)
	    }
	}

	// save new list
	if (new_list.length > 0) GM_setValue(local_storage_key, JSON.stringify(new_list))

	// compare lists to find new and removed games
	var added = []
	var removed = []
	for (var i = 0, j = 0;;) {
	    var o = old_list[i]
	    var n = new_list[j]
	    
	    if (o === undefined && n === undefined) break
	    
	    if (o === undefined || (n !== undefined && o.toUpperCase() > n.toUpperCase())) {
	        added.push(n)
	        j += 1
	    } else if (o == n) {
	        i += 1
	        j += 1
	    } else {
	        removed.push(o)
	        i += 1
	    }
	}
	
	// display changes in game list
	if (added.length > 0 || removed.length > 0) {
		var parent = $('<div>').before($('.invites .heading:first'))
		
		function toggle_function(element) {
			return function() {
				element.slideToggle()
			}
		}

		// display removed games
		if (removed.length > 0) {
			var list = $('<ul>').css({
				'list-style-position': 'inside',
				'color': '#DD7070',
				'font-size': '12px'
			})
			.hide()
			.appendTo(parent)
		
			removed.forEach(function(game) {
				list.append($('<li>').text(game))
			})
		
			var heading = $('<p>').css({
				'margin': '1em 0 0.5em',
				'color': '#DD7070',
				'cursor': 'pointer',
				'font-size': '12px'
			})
			.click(toggle_function(list))
			.text(removed.length > 1 ? (removed.length + " games are missing") : "1 game is missing")
			.insertBefore(list)
		}

		// display new games
		if (added.length > 0) {
			var list = $('<ul>').css({
				'list-style-position': 'inside',
				'color': '#68924E',
				'font-size': '12px'
			})
			.hide()
			.appendTo(parent)
		
			added.forEach(function(game) {
				list.append($('<li>').text(game))
			})
		
			var heading = $('<p>').css({
				'margin': '1em 0 0.5em',
				'color': '#68924E',
				'cursor': 'pointer',
				'font-size': '12px'
			})
			.click(toggle_function(list))
			.text(added.length > 1 ? (added.length + " new games were discovered") : "1 new game was discovered")
			.insertBefore(list)
		}
	}

} catch (exception) {
	console.log('Error in "Track SteamGifts sync" extension: ' + exception)
}
