// ==UserScript==
// @name           IMDB Ratings in BBC iPlayer
// @namespace      www.sqtl.co.uk
// @grant          GM_xmlhttpRequest
// @description    Adds ratings from IMDB to films in iPlayer
// @include        http://www.bbc.co.uk/iplayer/tv/categories/films*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
//
// ==/UserScript==

// New version, changed to use omdbapi instead 


$('ul.episodelist>li').each(function(i){
		var cache_this = this;
		currentTitleChunk = $(this).find('span.title');
		currentTitle = currentTitleChunk.text();
		GM_xmlhttpRequest({
		    method: "GET",
		  url: "http://www.omdbapi.com/?t=" + currentTitle,
		    onload: function(response) {
		      var foo_result=jQuery.parseJSON(response.responseText);
		      var rating=foo_result.imdbRating;
		      $(cache_this).find('span.title').append(' ('+rating+' on IMDb)');
		    }
		  });

} );
