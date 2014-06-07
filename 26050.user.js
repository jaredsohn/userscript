// ==UserScript==
// @name          Google Shortcuts
// @namespace     http://userscripts.org/users/50149
// @description   Allows you to search other sites using the Google search.
// @include       http://www.google.*/search*
// ==/UserScript==

var url = document.URL;
var search = url.search(/q=.%3A/);

// Checks for "?q=*:" in search query
if (search)
{
	var search_type = url.charAt(search + 2, 1);
	var ampersand_location = url.indexOf("&", search);
	var search_query = url.slice(search + 7, ampersand_location);

	switch (search_type)
	{
		case 'i': // Searches Google images
			window.location = "http://images.google.com/images?q=" + search_query;
			break;

		case 'f': // Searches Last.FM
			window.location = "http://www.google.com/search?hl=en&q=site%3Alast.fm+" + search_query + "&btnI=I%27m+Feeling+Lucky";
			break;

		case 'm': // Searches IMDB
			window.location = "http://www.google.com/search?hl=en&q=site%3Aimdb.com+-intitle:amazon.com+" + search_query + "&btnI=I%27m+Feeling+Lucky";
			break;

		case 'r': // Searches Rotten Tomatoes
			window.location = "http://www.google.com/search?hl=en&q=site%3Arottentomatoes.com+" + search_query + "&btnI=I%27m+Feeling+Lucky";
			break;

		case 'p': // Searches Playlist
			window.location = "http://searchbeta.playlist.com/tracks#" + search_query.replace(/\++/g, "%20");
			break;
			
		case 'w': // Searches Wikipedia (does an I'm Feeling Lucky search because Wiki's search sucks)
			window.location = "http://www.google.com/search?hl=en&q=site%3Awikipedia.org+" + search_query + "&btnI=I%27m+Feeling+Lucky";
			break;
			
		case 'u': // Searches UrbanDictionary
			window.location = "http://www.urbandictionary.com/define.php?term=" + search_query;
			break;
			
		case 'y': // Searches YouTube
			window.location = "http://youtube.com/results?search_query=" + search_query + "&search_type=";
			break;
		
		case 'g': // Searches Ultimate-Guitar (guitar tabs)
			window.location = "http://ultimate-guitar.com/search.php?s=" + search_query + "&w=songs";
			break;
			
		case 'l': // Lyrics (does an I'm Feeling Lucky search)
			window.location = "http://www.google.com/search?hl=en&q=site%3Asongmeanings.net+" + search_query + "&btnI=I%27m+Feeling+Lucky";
			break;
			
		case 'x': // Merriam-Webster Dictionary (for word pronounciations)
			window.location = "http://www.merriam-webster.com/dictionary/" + search_query;
			break;
	}
}