// ==UserScript==
// @name          bitreactor.to Enhancer
// @namespace     http://bitreactor.to/enhancer
// @description   Shows IMDB Rating and Genre/Link to IMDB besides Torrent links, removes Ads, redirects to index
// @include       http://bitreactor.to/*
// @include       http://*.bitreactor.to/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==


/** jQuery.uniq
* Author: Florent Vaucelle (florentvaucelle@gmail.com)
* 
* Get uniq values from an Array
* Data type is respected
* Usage: jQuery.uniq(anArray)
* 
* Requirement: jQuery >= 1.3
*/
// http://plugins.jquery.com/files/jquery.uniq.js_0.txt
;(function($) {
  $.uniq = function(notUniqArray) {
    // Check that we were given an array
    // If not, return the object
    if (!$.isArray(notUniqArray)) return notUniqArray;
    
    // Add each array value as a key in a map
    var map = {};
    for (var index in notUniqArray) {
      value = notUniqArray[index];
      // Store type_value as a map key,
      // unless 5 and '5' would be the same as a map key
      map[typeof value + '_' + value] = value;
    }
    
    // Build a new array with each map keys
    var uniqValues = [];
    for (var key in map) {
      uniqValues.push(map[key]);
    }
    
    return uniqValues;
  };
})(jQuery);



// Strip text of certain phrases/words
var stripText = function(text) {
	//german ac3 r5 xvid divx * [ ] ( ) dvd dvdrip "bessere version" "besserer ton" 
	var pattern = /(\[.+\])|(\*.+\*)|(\(.+\))|german|ac3|r5|xvid|divx|dvdrip|dvd|(bessere version)|(besserer ton)/gi;
	var replace = "";
	
	return text.replace(pattern, replace);
};

// Create IMDB-link
var makeImdbUrl = function(text) {
	return 'http://www.imdb.com/find?q='+ encodeURIComponent(text) +';s=tt;site=aka';
};

// Wrapper for AJAX
var getMovieInfo =  function(obj, i) {
	GM_xmlhttpRequest({
		method : "GET",
		url    : obj.lnk,
		onload : function(transport) { checkPage(i, transport) }

	});
};	

// Check if the page is a movie page or a search result page
var checkPage = function(objIndex, transport) {
	var content = transport.responseText;
	var moviePage;
	try {
		moviePage = content.match(/<link rel="canonical" href="http:\/\/www\.imdb\.com\/title\/tt(\d+)\/" \/>/i);	// Only on movie sites
	}
	catch (err) {
	}
	
	
	// We've landed on a search result page
	if (!moviePage) {
		var exact   = content.match(/<b>Titles \(Exact Matches\)<\/b>.*?<\/table>/i);
		var popular = content.match(/<b>Popular Titles<\/b>.*?<\/table>/i);
		var partial = content.match(/<b>Titles \(Partial Matches\)<\/b>.*?<\/table>/i);
		var approx  = content.match(/<b>Titles \(Approx Matches\)<\/b>.*?<\/table>/i);
		
		var exMatches, popMatches, partMatches, apprMatches = [];
		if (exact)   exMatches   = jQuery.uniq(exact[0].match(/\/title\/(t+\d+)\//g));
		if (popular) popMatches  = jQuery.uniq(popular[0].match(/\/title\/(t+\d+)\//g));
		if (partial) partMatches = jQuery.uniq(partial[0].match(/\/title\/(t+\d+)\//g));
		if (approx)  apprMatches = jQuery.uniq(approx[0].match(/\/title\/(t+\d+)\//g));
		
		// 1. Popular, 2. Exact, 3. Partial, 4. Approximate
		movieResults = [].concat(popMatches, exMatches, partMatches, apprMatches);
		movieResults = jQuery.grep(movieResults, function(ele) {
      		return (ele != null && ele != undefined);
    	});
    	movieResults = jQuery.uniq(movieResults);
    	
    	if (movieResults.length > 0) {
			getMovieIndex(objIndex, 0);
    	}
    	else {	// Nothing found
    	}
    	

	}
	
	// Ok, landed directly on a movie page, all is well
	else {
		var imdbLink = "http://www.imdb.com/title/tt"+moviePage[1];
		var infos    = extractInfos(objIndex, imdbLink, false, 0, {responseText: content});
	}
};

// Check a link from the movieIndex array (which contains all the search results if we didn't land on a movie page)
var getMovieIndex = function(objIndex, movieIndex) {
	if (!movieResults[movieIndex] || movieIndex > movieResults.length) return false;
	
	
	var imdbHref = movieResults[movieIndex].replace(/"/g, '');
	var imdbLink = "http://www.imdb.com"+imdbHref;
	GM_xmlhttpRequest({
		method : "GET",
		url    : imdbLink,
		onload : function(transport) { extractInfos(objIndex, imdbLink, true, movieIndex, transport) }
	});
};
	
// Extract infos from IMDB
var extractInfos =  function(objIndex, imdbLink, multiple, movieIndex, transport) {
	var content = transport.responseText;
	var rating, genres = null;
	try {
		rating = content.match(/<b>(\d.\d)\/10<\/b>/)[1];
		genres = content.match(/\/Genres\/([aA-zZ'"_ -]+)\/["']>/g);
		genres = jQuery.map(genres, function(ele) {
			return ele.split("/Genres/")[1].split("/")[0];
		});
	}
	catch (err) {
	}
	
	if (multiple && !rating) {
		getMovieIndex(objIndex, movieIndex+1);
		return false;
	}
	if (!rating) {
		rating = "0.0";
	}
	if (!genres) {
		genres = ["Unknown"];
	}

	titles[objIndex].rating   = rating;
	titles[objIndex].genres   = genres;
	titles[objIndex].trueLink = imdbLink;
	titles[objIndex].multiple = multiple;
	addInfos(objIndex);
};


// Change bitreactor's page and insert infos
var addInfos = function(objIndex) {
	var obj     = titles[objIndex];
	var curEle  = $(obj.oriEle);							// The current element (A)
	var curDiv  = curEle.parent();							// div.titlebox, the DIV containing all the elements
	var curTD   = curEle.parents('td');						// The current TD containing the A
	var prevEle = curEle.parents('td').prev();				// The previous TD, before the TD containing the A (previous sibling, contains add time)
	var added   = curEle.parents('table').find('th')[0];	// The headline for "Added", we'll change it to "Rating"
	curTD.html(curDiv.prev()).append(curDiv);				// Replace content with only title and direct download link (remove "Webseed", "New", etc.)

	// Change "Added" to "Rating"
	$(added).html("Rating");
	
	
	if (obj.trueLink) {
		var div, span, text, a, bold, small, img;
		
		// 1. IMDB-Rating
		div  = document.createElement("div");
		bold = document.createElement("strong");
		text = document.createTextNode(obj.rating+'/10');
		$(bold).css({"font-size": "120%"});
		bold.appendChild(text);
		div.appendChild(bold);
		prevEle.html(div);

		// 2. Genres
		span = document.createElement("span");
		text = document.createTextNode(" - ["+obj.genres.join(", ")+"]");
		span.appendChild(text);
		curEle.append(span);
		
		// 3. Link to IMDB
		a       = document.createElement('a');
		img     = document.createElement("IMG");
		img.src = "data:image/x-icon;base64,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";	// Inline-image, stolen from other userscripts, don't remember which one
		$(a).attr("href", obj.trueLink).attr("target", "_blank");	// we're in Transitional, so target is actually valid
		a.appendChild(img);
		curTD.append(a);
	}
};

// Remove ads
var removeAds = function() {
	if ($('.torrentlist').length > 1) {
		$($('.torrentlist')[0]).remove();
	}
	$('#adlayerad, .adbar, .newsticker, iframe, div.box:has(a[href*="opendownload"]), script[src*="layer"]').remove();
};


var titles       = null;	// Object for all titles found (Level 1)
var movieResults = null;	// Array for all results of a search request, if we didn't land directly on a movie page (Level 2)

// Start the action
var insertImdb = function() {
	var box, hrefs;

	// 8 = SVCD, 9 = MVCD, 10 = DivX, 11 = DVD-R, 38 = ratDVD, 47 = MP4, 59 = HD
	box   = $('div.box:has(a[name="8"]), div.box:has(a[name="9"]), div.box:has(a[name="10"]), div.box:has(a[name="11"]), div.box:has(a[name="38"]), div.box:has(a[name="47"]), div.box:has(a[name="59"])');
	if (box.length < 1) return;

	hrefs = box.find('.titlebox > a');
	
	// Extract titles
	titles = jQuery.map(hrefs, function(ele) {
		var title = ele.title.replace(/\./g, " ").split("(")[0];
		    title = jQuery.trim(title);
		return {title: title, oriEle: ele, lnk: makeImdbUrl(stripText(title))};
	});


	// Extract movie infos
	jQuery.each(titles, function(i, obj) {
		getMovieInfo(obj, i);
	});
};



window.addEventListener('load', function(event) {
	
	// Intro page? Skip it
	// Note:
	// (www.)bitreactor.to => German
	//   eng.bitreactor.to => English
	// May produce Firebug errors / notices, but we don't care
	if (top.location.href.split(".to/")[1].length < 1) {
		top.location.href = '/index.php';
		return;
	}
	
	removeAds();		// Remove ads
	insertImdb();		// Insert IMDB-links
}, 'false');
