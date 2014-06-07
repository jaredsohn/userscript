// ==UserScript==
// @name        Desura - track collection
// @namespace   http://userscripts.org/users/274735
// @match       http://www.desura.com/collection
// @match       http://www.desura.com/collection?*
// @updateURL   https://userscripts.org/scripts/source/179272.meta.js
// @downloadURL https://userscripts.org/scripts/source/179272.user.js
// @version     0.2
// ==/UserScript==

// constants
var script_prefix = 'userscript-179272'
var localStorage_key_prefix = script_prefix + ' desura collection: '
var run_message = null

// variables
var collection = {}
var previously_missing = []
var missing = []
var added = []
var games_found = 0
var now = Date.now().valueOf()
var account_name = $('#login>.member>a:first-child').text()


// code

if (account_name) {

	var localStorage_key = localStorage_key_prefix + account_name

	// retrieve stored collection
	var collections_json = localStorage.getItem(localStorage_key)
	if (!!collections_json) {
		collection = JSON.parse(collections_json)
	}
	collections_json = null

	// add information on the page to the collection
	$('.tablecollection h4').each((function() {
		var title = this.textContent
		var item = collection[title]
	
		games_found += 1
	
		if (item) {
			item.last_seen = now
		} else {
			item = {
				last_seen: now,
				first_seen: now,
				title: title
			}
			added.push(title)
			collection[title] = item
		}
	}))

	// take note of which games are missing
	Object.keys(collection).forEach(function(value, index) {
		var item = collection[value]
	
		// The following few lines are for debugging purposes, and should remain commented out
		//item.first_found_missing = undefined
		//if (Math.random()*40 < 1) item.last_seen = item.first_seen
		//if (!!item.first_found_missing) item.last_seen = item.first_found_missing
	
		if (item.last_seen != now) {
			if (!item.first_found_missing) {
				item.first_found_missing = now
				missing.push(value)
			} else {
				previously_missing.push(value)
			}
		}
	})

	// store the updated collection
	localStorage.setItem(localStorage_key, JSON.stringify(collection))

	// add custom embedded stylesheet
	$('<style>')
	.text("."+script_prefix+'-list li small { display: block; color: grey; margin: 1px 0 2px 10px; }')
	.appendTo(document.head)

	// display the number of games in the collection
	$('#content .column .title .heading').each(function() {
		if (this.textContent.trim() == 'Collection') this.textContent = "Collection (" + games_found + " games)";
	})

	// list games found to be missing
	if (missing.length > 0) {

		var list = $('<ul>')
		.css({
			'padding': '1em',
			'list-style': 'none'
		})
	
		$('<div class="column span-all">').append(
			$('<div class="normalbox">').append(
				$('<div class="normalcorner">').append(
					$('<div class="title">').append(
						$('<span class="heading">').text((missing.length > 1) ? missing.length + " games found missing from your collection" : "1 game found missing from your collection")
						.click(list.slideToggle.bind(list))
					)
				),
				$('<div class="inner">').append(
					$('<div class="body">').append(list)
				)
			)
		)
		.insertAfter($('#member'))

		missing.forEach(function(value) {
			list.append($('<li>').text(value))
		})
	}

	// list newly-discovered games
	if (added.length > 0) {

		var list = $('<ul>')
		.css({
			'padding': '1em',
			'list-style': 'none'
		})
	
		$('<div class="column span-all">').append(
			$('<div class="normalbox">').append(
				$('<div class="normalcorner">').append(
					$('<div class="title">').append(
						$('<span class="heading">').text((added.length > 1) ? added.length + " new games discovered" : "1 new game discovered")
						.click(list.slideToggle.bind(list))
					)
				),
				$('<div class="inner">').append(
					$('<div class="body">').append(list)
				)
			)
		)
		.insertAfter($('#member'))

		added.forEach(function(value) {
			list.append($('<li>').text(value))
		})
	}

	// list games already known to be missing
	if (previously_missing.length > 0) {

		var list = $('<ul class="'+script_prefix+'-list">')
		.css({
			'padding': '1em',
			'list-style': 'none'
		})
	
		$('<div class="column span-all">').append(
			$('<div class="normalbox">').append(
				$('<div class="normalcorner">').append(
					$('<div class="title">').append(
						$('<span class="heading">').text((previously_missing.length > 1) ? previously_missing.length + " games previously found missing" : "1 game previously found missing")
						.click(list.slideToggle.bind(list))
					)
				),
				$('<div class="inner">').append(
					$('<div class="body">').append(list)
				)
			)
		)
		.appendTo($('#content>.container:first-child'))
	
		function format_date(timestamp) {
			console.log("timestamp " + timestamp)
			return (new Date(timestamp)).toLocaleDateString()
		}
		previously_missing.forEach(function(value) {
			var item = collection[value]
			list.append(
				$('<li>')
				.text(value)
				.append(
					$('<small>')
					.text("(present " + format_date(item.first_seen) + " to " + format_date(item.last_seen) + "; missing since " + format_date(item.first_found_missing) + ")")
				)
			)
		})
	}


	// allow boxes on page to be collapsed
	$('.normalbox>.normalcorner')
	.css('cursor', 'pointer')
	.click(function() {
		$(this).next().slideToggle()
	})
}

// add a note on the console that this script has been run
if (run_message) console.log(run_message)