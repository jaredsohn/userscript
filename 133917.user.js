// ==UserScript==
// @name           IMDB Ratings in Lovefilm
// @namespace      eelcodevlieger
// @description    Adds ratings from IMDB to films in Lovefilm
// @include        http://www.lovefilm.com/browse/*
// @include        http://www.lovefilm.com/search/results/*
// @include        http://www.lovefilm.com/film/*
// @include        http://www.lovefilm.com/games/*
// @author         Eelco de Vlieger
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
//
// Based on George Nixon's 'IMDB Ratings in Lovefilm' script (http://userscripts.org/scripts/show/41720)
// which itself borrows from Keyvan Minoukadeh's Imdb Rating on Pirate Bay and NfoHump (http://userscripts.org/scripts/show/38682),
// which itself borrows from Julien Couvreur's Inline IMDB Ratings (http://userscripts.org/scripts/show/11360)
// 
// v2
// Added direct IMDB search functionality.
//
// v2.1
// Added support for the lovefilm 'browse' and 'games' pages.
// Improved UI feedback (showing 'fetching...' sooner)
// Cleaned up console.debug logging
// 
// v2.2
// If we got redirected to the only matched film page by IMDB, than grab that URL.
// 
// ==/UserScript==

// If true, search for film links via the IMDB search directly, else use Google Web Search JSON API (limited use).
var searchViaImdb = true;

// Fair use settings
var imdb_search_max_lookups = 12; // Only lookup ratings for first n items in the search page.
var imdb_search_delay_between_lookups_ms = 50; // Number of ms to wait after the first lookup on the search page.
var google_search_max_lookups = 5; // Only lookup ratings for first n items in the search page.
var google_search_delay_between_lookups_ms = 1000; // Number of ms to wait after the first lookup on the search page.

var imdbLinkRegex = /^http:\/\/.*\.imdb\.com\/title\/(tt\d*)/i;

function findImdbID(url) {
  var imdbID = url.match(imdbLinkRegex);
  if (imdbID.length > 0) return imdbID[1];
  return null;
}

/**
 * Extract rating and voting count from IMDB page.
 * 
 * Taken from HTML elements:
 *  <span itemprop="ratingValue">6.3</span>
 *  <span itemprop="ratingCount">142,185</span>
 */
function extractMovieInfo(content) {
  var ratingMatch = content.match(/<span itemprop="ratingValue">(\d\.\d)<\/span>/);
  var voteCountMatch = content.match(/<span itemprop="ratingCount">([\d,]+)<\/span>/);
  var matched = ratingMatch !== null && ratingMatch.length > 0 && voteCountMatch !== null && voteCountMatch.length > 0;
  var movieInfoResult = { success: matched, rating: matched ? ratingMatch[1] : "", votecount: matched ? voteCountMatch[1] : ""};
  console.debug(movieInfoResult);
  return movieInfoResult;
}

function getMovieInfo(imdb_url, successCallback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: imdb_url,
    onload: function(details) {
      successCallback(extractMovieInfo(details.responseText));
    }
  });
}

function setImdbInfoOnElement(imdbUrl, link){
  console.debug("imdbUrl: " + imdbUrl);
  if (findImdbID(imdbUrl) !== null){
    getMovieInfo(imdbUrl, function(movieInfo){
      if(movieInfo.success){
	link.innerHTML = "IMDB rating: " + movieInfo.rating + "/10 (" + movieInfo.votecount + " votes)";
	link.href= imdbUrl;
      }else{
	link.innerHTML = "IMDB rating: not found";
      }
    });
  }else{
    link.innerHTML = "IMDB rating: not found";
  }
}

function getImdbSearchPageFilmLink(title, year, response){
    // If we got redirected to the only matched film page by IMDB, than grab that URL.
    var finalUrlMatch = response.finalUrl.match(imdbLinkRegex);
    if(finalUrlMatch !== null && finalUrlMatch.length > 0)
      return response.finalUrl;
  
    // Condense whitespace
    var condensedResponseText = response.responseText.replace(/\s+/g, " ");
    
    // Find matching film link in the IMDB search page_html
    // Example link the regex is based on:
    //   <a href="/title/tt1584131/" onclick="(new Image()).src='/rg/find-title-18/title_approx/images/b.gif?link=/title/tt1584131/';">The Last Godfather</a> (2010)
    // Regex grabs the href, film title and film year from each link.
    // [^<>] was added because otherwise it includes the image link too in the match group.
    // \d+ was added at the start to only match proper listed links.
    var filmLinksRegex = /\d+\..*?<a href=\"(\/title\/tt.*?\/)\" .*?>([^<>]*?)<\/a> \((\d{4})/ig;
    var currentYearMatchFilmTitleLink = null;
    var titleMatchFilmTitleLink = null;
    var match;
    while( match = filmLinksRegex.exec(condensedResponseText) ){
      var href = match[1];
      var currentFilmTitle = unescape(match[2]);
      var currentFilmYear = match[3];
      // console.debug("Found link for " + currentFilmTitle + " (" + currentFilmYear + "): " + href);
      
      var isCurrentYearMatch = year !== null && year === currentFilmYear;
      var isTitleMatch = currentFilmTitle.toUpperCase().indexOf(title.toUpperCase()) > -1 || title.toUpperCase().indexOf(currentFilmTitle.toUpperCase()) > -1;
      
      if(isCurrentYearMatch && isTitleMatch){
	// Proper match
	return href;
      }
      
      if(isCurrentYearMatch && currentYearMatchFilmTitleLink === null){
	// Just matched by year
	currentYearMatchFilmTitleLink = href;
      }else if(isTitleMatch && titleMatchFilmTitleLink === null){
	// Just matched by title
	titleMatchFilmTitleLink = href;
      }
    }
    
    // No exact match found, return the title that matches the year if found
    if(currentYearMatchFilmTitleLink !== null)
      return currentYearMatchFilmTitleLink;
    
    // Return the title that matches (if found)
    return titleMatchFilmTitleLink;
}

function searchImdbDeepLinkViaImdb(title, year, linkCallbackSuccess, linkCallbackFailure){
  // Remove 'format', as that confuses the IMDB search
  title = title.replace(/ -(?: 3D)? blu-ray$/i, "");
  
  var imdb_url = "http://www.imdb.com/find?q=" + title + "&s=tt";
  console.debug("Find IMDB deep link for: " + imdb_url);
  GM_xmlhttpRequest({
    method: "GET",
    url: imdb_url,
    onload: function(response){
      var imdbSearchPageFilmLink = getImdbSearchPageFilmLink(title, year, response);
      
      if(imdbSearchPageFilmLink !== null){
	if(imdbSearchPageFilmLink.indexOf("imdb.com") == -1){
	  imdbSearchPageFilmLink = "http://www.imdb.com" + imdbSearchPageFilmLink;
	}
	linkCallbackSuccess(imdbSearchPageFilmLink);
      }else{
	linkCallbackFailure("no deeplink found for: " + title + (year !== null ? (" (" + year + ")") : "") );
      }
    }
  });
}

function searchImdbDeepLinkViaGoogle(title, year, linkCallbackSuccess, linkCallbackFailure){
  var imdbUrlLookupUrl = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + "%20" + "(" + year + ")" + '+site:imdb.com';
  console.debug("imdbUrlLookupUrl: " + imdbUrlLookupUrl);

  GM_xmlhttpRequest({
    method:"GET",
    index:"",
    url:imdbUrlLookupUrl,
    onload:function(response){
      
      // JSON to object (eval should be safe for using on Google's response).
      var imdbUrlLookupGoogleResult = eval('(' + response.responseText + ')');
      
      console.debug(imdbUrlLookupGoogleResult);
      if(imdbUrlLookupGoogleResult.responseStatus === 200){
	    var imdbUrl = imdbUrlLookupGoogleResult.responseData.results[0].unescapedUrl;
	    console.debug("imdbUrl: " + imdbUrl);
	    if (findImdbID(imdbUrl) !== null){
	      linkCallbackSuccess(imdbUrl);
	    }else{
	      linkCallbackFailure("IMDB rating: not found");
	    }
      }else{
	  linkCallbackFailure("Error (" + imdbUrlLookupGoogleResult.responseStatus + "): " + imdbUrlLookupGoogleResult.responseDetails);
      }
    }
  });
}

function lookupAndAddFilmRating(title, year, outputElement){
  var searchImdbDeepLink = searchViaImdb ? searchImdbDeepLinkViaImdb : searchImdbDeepLinkViaGoogle;
  console.debug("Searching for IMDB film page via " + (searchViaImdb ? "the IMDB search page" : "the Google Web Search API") );
    
  // Create rating and link to IMDB page
  var link = document.createElement('A');
  link.innerHTML = "IMDB rating: fetching...";
  outputElement.appendChild(link);
  
  var successHandler = function(url) { setImdbInfoOnElement(url, link); };
  var errorHandler = function(errorMsg){ link.innerHTML = "IMDB rating: not found"; console.debug(errorMsg) };
  
  searchImdbDeepLink.call(null, title, year, successHandler, errorHandler);
}

function addImdbRatingToLoveFilmDetailsPage(){
  var page_html = document.documentElement.innerHTML;
  // Taken from: <meta property="og:title" content="Transformers 3 - The Dark of the Moon">
  var details_title_match = page_html.match(/<meta property="og:title" content="(.*)">/);
  if(details_title_match !== null && details_title_match.length > 0){
    var details_title = details_title_match[1];
    
    // Get year
    // Taken from: <meta property="video:release_date" content="2011-11-28">
    var title_details = document.getElementsByClassName('title-details')[0];
    var details_year = $.trim( title_details.textContent ); //page_html.match(/<meta property="video:release_date" content="(\d{4}).*">/)[1];
    
    console.debug("Found: " + details_title + ( details_year !== null ? " (" + details_year + ")" : "" ) );
    var ratings_element = document.getElementById("blank_ratings");
    
    lookupAndAddFilmRating(details_title, details_year, ratings_element)
  }
}

function addImdbRatingToLoveFilmSearchPage(film_info_items){
  console.debug("Found " + film_info_items.length + " film_info_items");
  var i=0;
  for(i=0; i < film_info_items.length && i < (searchViaImdb ? imdb_search_max_lookups : google_search_max_lookups); i++){
    var film_info_item = film_info_items[i];
    var title = film_info_item.getElementsByTagName("H2")[0].getElementsByTagName("A")[0].innerHTML;
    var yearElement = film_info_item.getElementsByClassName("release_decade");
    var year = yearElement.length > 0 ? yearElement[0].innerHTML.substr(1, 4) : null;
    console.debug("Found: " + title + (year !== null ? " (" + year + ")" : "" ) );
    
    // Fair use - schedule lookups n ms apart
    ( function(inner_title, inner_year, inner_film_info_item, index){
        var delay = index * (searchViaImdb ? imdb_search_delay_between_lookups_ms : google_search_delay_between_lookups_ms);
	setTimeout( function(){ lookupAndAddFilmRating(inner_title, inner_year, inner_film_info_item); }, delay);
      }
    )(title, year, film_info_item, i);
  }
}

function addImdbRatingToLoveFilm(){
  var film_info_items = document.getElementsByClassName("fl_detail_info");

  // Determine if this is the search page, details page, or some other page.
  if(film_info_items.length > 0){
    addImdbRatingToLoveFilmSearchPage(film_info_items);
  }else{
    addImdbRatingToLoveFilmDetailsPage();
  }
}

addImdbRatingToLoveFilm();