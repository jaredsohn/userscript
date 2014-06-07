// ==UserScript==
// @name			Unofficial GOG.com Updated Games Lister
// @namespace		gog_updated_games_lister
// @description		Presents an "Updated Games" list at the top of the Shelf and Game List views.
// @include			https://secure.gog.com/*account/games/shelf*
// @include			https://secure.gog.com/*account/games/list*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version			1.2
// @updateURL		http://userscripts.org/scripts/source/142051.meta.js
// @downloadURL		https://userscripts.org/scripts/source/142051.user.js
// @grant			GM_log
// ==/UserScript==

// NOTE: The "@grant GM_log" seems to be needed in order for setTimeout to work when explicitly specifying the @grant tag.
// Changes:
// v1.2
//		Fixed the way that the script detects when the game shelf and game list are done loading.
//		If the script interferes with page loading, the page loading will stop and you'll only get part of the shelf or game list.

$('<style>')
	.attr("type", "text/css")
	.appendTo($("head"))
		.text("\
.shelf_container #updatedGamesShelf {\n\
	float:left;\n\
	width:906px;\n\
	margin:-11px 22px 9px\n\
}\n\
.update_shelf_game {\n\
	float: left;\n\
	width: 178px;\n\
	height: 208px;\n\
	margin-top: 34px;\n\
	margin-right: 0px;\n\
	margin-bottom: 0px;\n\
	margin-left: 3px;\n\
	background-color: transparent;\n\
	background-image: url('/www/default/-img/acc_shelf_box.785001480.png');\n\
	background-repeat: repeat;\n\
	background-attachment: scroll;\n\
	background-position: 0% 0%;\n\
	background-clip: border-box;\n\
	background-origin: padding-box;\n\
	background-size: auto auto;\n\
	position: relative;\n\
	left: 0px;\n\
	z-index: 1;\n\
}\n\
.update_shelf_game > .shelf_badges {\n\
	position: absolute;\n\
	top: -3px;\n\
	right: 25px;\n\
}\n\
#updatedGamesList .game-item {\n\
	cursor: default;\n\
}\n\
");

var gameSearchInternal = 600;

/**
 * Loads the updated games from the game shelf.
 * If the game shelf is not finished loading, it will wait until it does.
 */
function loadFromShelf() {
	// Source for comparison: accountGamesShelfInfiniteScroll().
	var pageSize = $("#account_shelf_page_size").val();
	var a = $(".shelf_main:first .shelf_game:not(.empty)").length;
	var b = unsafeWindow.accountGamesShellParams.page * pageSize;
	if (a >= b) {
		setTimeout(loadFromShelf, gameSearchInternal);
		return;
	}
	// If there are no updated games, abort.
	if ($('div.shelf_container i.bdg_update').length == 0) {
		return;
	}
	var shelfStyle = "wood";
	if ($('div.shelf_container .shelf_outer').hasClass("dark")) {
		shelfStyle = "dark";
	}
	// Add the updated games list shelf.
	var updatedGamesShelf = $('<div>')
		.attr('id', 'updatedGamesShelf');

	$('<div>')
		.addClass('shelf_outer')
		.addClass(shelfStyle)
		.append($('<div>')
			.addClass('shelf_header')
			.append($('<b>')
				.text('Updated Games')
			)
		)
		.append($('<div>')
			.addClass('shelf_main')
			.append(updatedGamesShelf)
		)
		.append('&nbsp;')
		.prependTo($('div.shelf_container'));
	// Find the updated games.
 	$('div.shelf_container i.bdg_update').each(function() {
 		var div = $(this).closest('.shelf_game');
		var img = div.find('img');
 		var src = img.attr('src');
		$('<div>')
			.addClass('update_shelf_game')
			.append($('<img>')
				.addClass('shelf_game_box')
				.attr('src', src)
			)
			.append($('<div>')
				.addClass('bottom_shadow')
			)
			.append($('<div>')
				.addClass('shelf_badges')
				.append($('<i>')
					.addClass('bdg_update')
				)
			)
			.appendTo(updatedGamesShelf);
	});
};

/**
 * Loads the updated games from the game list.
 * If the game list is not finished loading, it will wait until it does.
 */
function loadFromList() {
	// Source for comparison: accountGamesListInfiniteScroll().
	var pageSize = $("#account_list_page_size").val();
	var a = $("#gamesList .game-item").length;
	var b = unsafeWindow.accountGamesListParams.page * pageSize;
	if (a >= b) {
		setTimeout(loadFromList, gameSearchInternal);
		return;
	}
	// If there are no updated games, abort.
	if ($('div#gamesList i.bdg_update').length == 0) {
		return;
	}
	var gamesList = $('div#gamesListHolder');
	// Add the updated games list shelf.
	var updatedGamesList = $('<div>')
		.attr('id', 'updatedGamesList')
		.prependTo(gamesList);
	$('<div>')
		.addClass('list_header')
		.text('Updated Games')
		.prependTo(gamesList);
 	// Find the updated games.
 	$('div#gamesList i.bdg_update').each(function() {
 		var div = $(this).closest('.game-item');
		var img = div.find('img');
 		var src = img.attr('src');
		var name = div.find('span[class="game-title-link"]').text();
		$('<div>')
			.addClass('game-item')
			.append($('<img>')
				.addClass('list_image')
				.attr('src', src)
			)
			.append($('<div>')
				.addClass('game-item-title')
				.append($('<div>')
					.addClass('game-item-title-in')
					.append($('<span>')
						//.addClass('game-title-link')
						.text(name)
					)
					.append($('<span>')
						.addClass('list_badges')
						.append($('<i>')
							.addClass('bdg_update')
						)
					)
				)
			)
			.appendTo(updatedGamesList);
	});
};

/**
 * Calls the url-dependent games list loading function.
 */
function findUpdatedGames() {
	if (window.location.pathname.indexOf('shelf') > -1) {
		loadFromShelf();
	} else {
		loadFromList();
	}
};

/**
 * Calls the main function to start the whole process.
 */
findUpdatedGames();
