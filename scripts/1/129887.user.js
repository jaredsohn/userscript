// ==UserScript==
// @name           MyAnimeList.net - Find OVAs, specials, sequels, etc. that you haven't watched
// @namespace      http://danielj.se
// @author         MaTachi
// @description    Find related anime (OVAs, specials, seasons, movies etc.) that you haven't watched yet.
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// @version        1.1
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
(function() {

// Whether or not manga should be shown too
var showMangas = false;

// Add some CSS
var css = "\
	#results {\
		position: absolute;\
		top: 100px;\
		left: 50%;\
		margin-left: -250px;\
		padding: 20px;\
		width: 500px;\
		border-radius: 15px;\
		box-shadow: 0 0 10px #000;\
		background-color: rgba(51,51,51,0.9);\
		color: #dfb363;\
		font-family: georgia;\
		font-size: 14px;\
	}\
	#results a {\
		color: #dfb363;\
	}\
	#scanButton {\
		position: absolute;\
		top: 50px;\
		right: 20px;\
		display: block;\
		width: 100px;\
		padding: 5px 10px;\
		border-radius: 5px;\
		box-shadow: 0 0 5px #000;\
		background-color: rgba(51,51,51,0.9);\
		color: #dfb363;\
		font-family: verdana;\
		text-decoration: none;\
	}\
	#scanButton:hover {\
		box-shadow: 0 0 15px #000;\
		background-color: rgba(31,31,31,0.9);\
	}\
	.heading {\
		margin-top: 0;\
	}\
"; 
GM_addStyle(css);

// Reference to the output list
var list;

// Whether the page is a anime list
var isAnimelist;



// Start with determining if this is an anime list
determineIfPageIsAnimeList();

// Then show the scan button
showScanButton();



/* Determine if the page is an anime list or a manga list */
function determineIfPageIsAnimeList() {
	isAnimelist = $('#list_surround table tr td a:first').html() === "Currently Watching";
}

/* Returns true if the page is an anime list. False if it's a manga list. */
function isAnimeList() {
	return isAnimelist;
}

/* Shows the scan button in the top right corner */
function showScanButton() {
	if (isAnimeList())
		var button = $('<a id="scanButton" href="#">Scan for related OVAs, specials, sequels, etc. that you haven\'t watched</a>');
	else
		var button = $('<a id="scanButton" href="#">Scan for related side stories, sequels, etc. that you haven\'t read</a>');
	button.bind('click', run);
	button.appendTo('body');
}

/* Run the scan and show the results */
function run() {
	// Create a list where the related anime can be shown
	createOutputList();

	// List with all of your watched anime
	var watchedAnimeURLs = fillWatchedAnimeURLsList();

	// Keep track of all watched anime and anime already on the list
	var foundRelatedAnime = watchedAnimeURLs.slice(0);

	// Traverse through all watched anime
	for (i = 0; i < watchedAnimeURLs.length; i++) {
		// Get the anime page
		$.get(watchedAnimeURLs[i], function(data) {
			// Create a list with all related anime from the page
			var relatedAnime = getRelatedAnime(data);

			// Walk through the related anime from the page and check so they aren't
			// already on the list
			for (j = 0; j < relatedAnime.length; j++) {
				if (foundRelatedAnime.indexOf(relatedAnime[j].attr("href")) < 0) {
					foundRelatedAnime.push(relatedAnime[j].attr("href"));
					// Add a entry for the anime in the results panel
					addListItem(relatedAnime[j].html(), relatedAnime[j].attr("href"));
				}
			}
		});
	}
}

/* Get all links under Related Anime on a given anime page */
function getRelatedAnime(data) {
	// Selector for the Related Anime heading
	var relatedAnimeH2Selector = "#content table tr td div table tr td h2:eq(1)";

	// Create an array list to collect all valid links in
	var collection = new Array();

	// Return the empty collection if there aren't any related anime
	var header = $(relatedAnimeH2Selector, data).html();
	if (header !== "Related Anime" && header !== "Related Manga")
		return collection;

	// Traverse through all elements until the next heading
	$(relatedAnimeH2Selector, data).nextUntil("h2").each(function() {
		// Only add links to the collection
		if (isAnimeList()) {
			if ($(this).is("[href^='http://myanimelist.net/anime/']") || (showMangas && $(this).is("a"))) {
				collection.push($(this));
			}
		} else {
			if ($(this).is("[href^='http://myanimelist.net/manga/']")) {
				collection.push($(this));
			}
		}
	});

	return collection;
}

/* Returns an array with URLs to all anime you have seen */
function fillWatchedAnimeURLsList() {
	var watchedAnimeURLs = new Array();

	$("a.animetitle").each(function() {
		watchedAnimeURLs.push($(this).attr("href"));
	});

	return watchedAnimeURLs;
}

/* Creates an list on the page where all related anime will be posted */
function createOutputList() {

	// Create a container
	if (isAnimeList())
		var container = $('<div id="results"><h2 class="heading">Related anime that you haven\'t watched:</h2></div>');
	else
		var container = $('<div id="results"><h2 class="heading">Related manga that you haven\'t read:</h2></div>');
	container.appendTo('body');

	// Create the list
	list = $('<ul></ul>');
	list.appendTo(container);
}

/* Add an entry to the list */
function addListItem(name, url) {
	$('<li><a href='+url+'">'+name+'</a></li>').appendTo(list);
}

})();