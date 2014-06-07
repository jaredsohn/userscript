// ==UserScript==
// @name           Netflix - Rotten Tomatoes Rating
// @namespace      http://www.userscripts.org
// @description    Adds Rotten Tomatoes ratings to Netflix movie pages
// @include        http://www.netflix.com/Movie/*
// @include        http://www.netflix.com/WiMovie/*
// @version        1.0.6
// ==/UserScript==

// ==User-Defined Variables==

//showAverageRating = false;
showAverageRating = true;

//showReviewCount = false;
showReviewCount = true;

//showPositiveReviewCount = false;
showPositiveReviewCount = true;

//showNegativeReviewCount = false;
showNegativeReviewCount = true;

//useRottenTomatoesColors = false;
useRottenTomatoesColors = true;

// Plain Movie Title
var plainMovieTitle;

// Movie Subtitles
var movieSubtitles = '';

// Movie Release Year
var movieReleaseYear;

// ==/User-Defined Variables==

insertRTBase();

rottenSearchString = 'http://www.rottentomatoes.com/search/full_search.php?search=' + getMovie();

getRottenSearch();

function getRottenSearch() {	

	GM_xmlhttpRequest({
		url: rottenSearchString,
		method: 'GET',
		onload: function(response) {
		
			// Create a new div element to contain the search results
			var newDiv = document.createElement('div');
			newDiv.innerHTML = response.responseText;
			
			// Create variables to work with URLs
			var newRottenUrl = '?';
			var thisLink;

			// Create variable to count how many movie title matches there are
			var titleMatches = 0;
			
			// Create variables for search result table and the links contained within
			var resultTable = newDiv.getElementsByTagName('table')[0];			
			var linksInTable = resultTable.getElementsByTagName('a');
			var releaseDates = resultTable.getElementsByTagName('strong');
			
			// For counting
			var i, j;

			// Compare the search results with that of the plain movie title
			for (i = 0; i < linksInTable.length; i++) {
			
				// Set the link text to lowercase for easier comparison
				thisLink = cleanMovieTitle(linksInTable[i].innerHTML, true).replace(/[+]/g, ' ');
				
				// Look for the plain movie title in the link text
				if (thisLink.indexOf(plainMovieTitle) > -1) {

					// Make sure plain movie title substring in link text isn't a partial part of another title
					if (thisLink.indexOf(plainMovieTitle) == 0 || thisLink.charAt(thisLink.indexOf(plainMovieTitle) - 1) == /\s/) {
					
						// Set Rotten Tomatoes URL
						newRottenUrl = linksInTable[i].href.replace('http://www.netflix.com', 'http://www.rottentomatoes.com');
						titleMatches++;
					}					
				}
			}
			
			// See if more than one link matched the movie title and if so compare release dates
			if (titleMatches > 1) {
			
				// Reset number of title matches
				titleMatches = 0;
			
				// Compare the search results with that of the plain movie title, this time with release dates
				for (i = 0; i < linksInTable.length; i++) {
				
					// Set the link text to lowercase for easier comparison
					thisLink = cleanMovieTitle(linksInTable[i].innerHTML, true).replace(/[+]/g, ' ');
									
					// Look at the link text and release date
					if (thisLink.indexOf(plainMovieTitle) > -1 && releaseDates[i].innerHTML == movieReleaseYear) {
					
						// Set Rotten Tomatoes URL
						newRottenUrl = linksInTable[i].href.replace('http://www.netflix.com', 'http://www.rottentomatoes.com');
						titleMatches++;
						break;
					}
				}

				// If no title and release date matches were found try exact title matches
				if (titleMatches == 0) {
				
					// Look for an exact title match, regardless of release date
					for (i = 0; i < linksInTable.length; i++) {
					
						// Set the link text to lowercase for easier comparison
						thisLink = cleanMovieTitle(linksInTable[i].innerHTML, true).replace(/[+]/g, ' ');
									
						// See if title is an exact match
						if (thisLink == plainMovieTitle) {										
							// Set Rotten Tomatoes URL
							newRottenUrl = linksInTable[i].href.replace('http://www.netflix.com', 'http://www.rottentomatoes.com');
							titleMatches++;
							break;
						}
					}
				}
			}
			else if (titleMatches == 0  && movieSubtitles.length > 0) { // See if there are any subtitles to check
				
				// Get each subtitle
				for (i = 0; i < movieSubtitles.split(':').length; i++) {
					
					// Search for subtitles in results and compate release dates
					for (j = 0; j < linksInTable.length; j++) {
					
						// Clean search result link text
						thisLink = cleanMovieTitle(linksInTable[j].innerHTML).replace(/[+]/g, ' ');
						
						// Look at the link text and release date
						if (thisLink.indexOf(movieSubtitles.split(':')[i]) > -1 && releaseDates[j].innerHTML == movieReleaseYear) {
						
							// Set Rotten Tomatoes URL
							newRottenUrl = linksInTable[j].href.replace('http://www.netflix.com', 'http://www.rottentomatoes.com');
							titleMatches++;
							break;
						}
					}
				}
				
				// If subtitle and release date matches were not found try exact title and subtitle matches
				if (titleMatches == 0) {
					// Get movie title with subtitles
					var fullTitle = movieSubtitles.replace(/[:]/g, ' ');
					
					// Look for an exact title and subtitle match, regardless of release date
					for (i = 0; i < linksInTable.length; i++) {
					
						// Set the link text to lowercase for easier comparison
						thisLink = cleanMovieTitle(linksInTable[i].innerHTML, true).replace(/[+]/g, ' ');
						
						// See if title is an exact match
						if (thisLink == fullTitle) {										
							// Set Rotten Tomatoes URL
							newRottenUrl = linksInTable[i].href.replace('http://www.netflix.com', 'http://www.rottentomatoes.com');
							titleMatches++;
							break;
						}
					}
				}
			}
			
			// See if any movie URL was found
			if (titleMatches > 0) {
				getRTinfo(newRottenUrl);
			}
			else {
				// Let the user know there were no exact matches and provide the top ten search results
				var addedDivRotten = document.getElementById('greaseTextRotten');
				addedDivRotten.innerHTML = '<h3>Rotten Tomatoes:</h3>No Rotten Tomatoes rating found.<br />';
				addedDivRotten.innerHTML = addedDivRotten.innerHTML + 'Try these other search results:<br />';
				
				// Add the links
				for (i = 0; i < linksInTable.length; i++) {
					addedDivRotten.innerHTML = addedDivRotten.innerHTML + '<br /><a href="' + linksInTable[i].href.replace('http://www.netflix.com', 'http://www.rottentomatoes.com') + '" title="' + linksInTable[i].innerHTML + ' (' + releaseDates[i].innerHTML + ')">' + linksInTable[i].innerHTML + ' (' + releaseDates[i].innerHTML + ')</a>';
				}
			}
		}
	});	
}

function getMovie() {

	// Get primary title from page
	var priTitle = document.getElementById('primary-title');
	
	// Set movie year
	movieReleaseYear = priTitle.getElementsByTagName('span')[0].innerHTML.replace('(', '').replace(')', '');
	
	// Clean up movie title for searching and comparing	
	return cleanMovieTitle(priTitle.innerHTML.split('<')[0], false);
}

function cleanMovieTitle(strTitle, isSearchResult) {

	// For counting
	var i;

	// Set movie title to lowercase for easier comparison
	strTitle = strTitle.toLowerCase();
		
	// Replace foreign characters
	strTitle = strTitle.replace(new RegExp(/[àáâãäå]/g),'a');
	strTitle = strTitle.replace(new RegExp(/æ/g),'ae');
	strTitle = strTitle.replace(new RegExp(/ç/g),'c');
	strTitle = strTitle.replace(new RegExp(/[èéêë]/g),'e');
	strTitle = strTitle.replace(new RegExp(/[ìíîï]/g),'i');
	strTitle = strTitle.replace(new RegExp(/ñ/g),'n');                            
	strTitle = strTitle.replace(new RegExp(/[òóôõö]/g),'o');
	strTitle = strTitle.replace(new RegExp(/œ/g),'oe');
	strTitle = strTitle.replace(new RegExp(/[ùúûü]/g),'u');
	strTitle = strTitle.replace(new RegExp(/[ýÿ]/g),'y');
		
	// Replace other characters
	strTitle = strTitle.replace(/[!]/g, '');
	strTitle = strTitle.replace(/[.]/g, '');
	strTitle = strTitle.replace(/[,]/g, '');
	strTitle = strTitle.replace(/[?]/g, '');
	strTitle = strTitle.replace(/[@]/g, '');
	strTitle = strTitle.replace(/[#]/g, '');
	strTitle = strTitle.replace(/[']/g, '');
	strTitle = strTitle.replace(/["]/g, '');
	strTitle = strTitle.replace(/[$]/g, '');
	strTitle = strTitle.replace(/[%]/g, '');
	strTitle = strTitle.replace(/[*]/g, '');
	strTitle = strTitle.replace(/[(]/g, '');
	strTitle = strTitle.replace(/[)]/g, '');
	strTitle = strTitle.replace(/[_]/g, '');
	strTitle = strTitle.replace(/- /g, '');

	// Replace spaces with '+' signs
	strTitle = strTitle.replace(/\s/g, '+');

	// Remove leading spaces
	while (strTitle.charAt(0) == '+') {
		strTitle = strTitle.slice(1);
	}

	// Remove trailing spaces
	while (strTitle.charAt(strTitle.length - 1) == '+') {
		strTitle = strTitle.substring(0, strTitle.length - 1);
	}

	// Replace small words in title
	strTitle = strTitle.replace(/ a /g, ' ');
	strTitle = strTitle.replace(/ an /g, ' ');
	strTitle = strTitle.replace(/ and /g, ' ');
	strTitle = strTitle.replace(/ the /g, ' ');
	strTitle = strTitle.replace(/ of /g, ' ');
	strTitle = strTitle.replace(/ el /g, ' ');
	strTitle = strTitle.replace(/ la /g, ' ');
	strTitle = strTitle.replace(/ de /g, ' ');
	strTitle = strTitle.replace(/ but /g, ' ');
	strTitle = strTitle.replace(/ &amp; /g, ' ');
	strTitle = strTitle.replace(/ & /g, ' ');

	// Check to see if there are subtitles
	if (strTitle.indexOf(':') > -1  && isSearchResult == false) {
	
		var subTitle;
	
		// Go through each subtitle
		for (i = 0; i < strTitle.split(':').length; i++){
			
			// Add subtitles separated by colons
			if (movieSubtitles.length == 0) {
			
				subTitle = strTitle.split(':')[i];
				
				// Remove any leading '+' signs
				while (subTitle.charAt(0) == '+') {
					subTitle = subTitle.slice(1);
				}
				
				movieSubtitles = movieSubtitles + subTitle.replace(/[+]/g, ' ');
			}
			else {
			
				subTitle = strTitle.split(':')[i];
				
				// Remove any leading '+' signs
				while (subTitle.charAt(0) == '+') {
					subTitle = subTitle.slice(1);
				}
				
				movieSubtitles = movieSubtitles + ':' + subTitle.replace(/[+]/g, ' ');
			}
		}
	}

	// Replace colons
	strTitle = strTitle.replace(/:/g, '');
	
	// See if text being cleaned is a Rotten Tomatoes search result
	if (isSearchResult == false) {
		// Set plain movie title by removing '+' signs
		plainMovieTitle = strTitle.replace(/[+]/g, ' ');
	}
	
	return strTitle;
}

function insertRTBase() {

	// Get element to insert Rotten Tomatoes div before
	var widRent = document.getElementById('widrent');
	
	// Create new div element and set some attributes
	addedDivRotten = document.createElement('div');
	addedDivRotten.innerHTML = '<H3>Rotten Tomatoes:</H3>\nChecking <img src="'+'data:image/gif;base64,'+
    'R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2'+
    'Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8'+
    'fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKC'+
    'gqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra'+
    '2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCg'+
    'oE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQ'+
    'EAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/'+
    'C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwA'+
    'AAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAML'+
    'E4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaD'+
    'ERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAH'+
    'jIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hL'+
    'UbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb'+
    '04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkK'+
    'E2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0pu'+
    'aoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtA'+
    'L9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZ'+
    'Z1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zH'+
    'kFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwF'+
    'GAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVE'+
    'PAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3'+
    'Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5'+
    'BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZW'+
    'QYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyD'+
    'N9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAA'+
    'EAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjcz'+
    'rJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUW'+
    'VnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6'+
    'RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpj'+
    'ggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgce'+
    'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'+'" alt ="checking">';
	addedDivRotten.setAttribute('id','greaseTextRotten');
	addedDivRotten.setAttribute('class','info');
	addedDivRotten.style.cursor = "default"; // Changes cursor to pointer instead of text selector
	
	// Insert new div above rent/watch buttons
	widRent.insertBefore(addedDivRotten, widRent.firstChild);

}

function getRTinfo(rottenTomatoesURL) {

	GM_xmlhttpRequest({
		url: rottenTomatoesURL,
		method: 'GET',
		onload: function(resp) {
		
			fresh_icon_uri = 'data:image/gif;base64,R0lGODlhEAAQALMAAFViHKY0F9c7FJdiHPtGF/51VDuIJlahLYmJJ/6Ia////wAAAP///wAAAAAAAAAAACH5BAEAAAwALAAAAAAQABAAAARdkMlJq2WpFHJnyhvBXZpIHKIgVIkpHoOAjNKXHviAoKsUCoQBAGcAqHoulRAACBwlQNNgcDAEDNaAJCVyHprfgJYBVBFUgaZAPHGWj+40xXk+rtkVsX7f2es7gBQRADs=';
			rotten_icon_uri = 'data:image/gif;base64,R0lGODlhEAAQANUAAECdJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///yH5BAEAAD8ALAAAAAAQABAAAAY2wJ/wBygOj0hiEZBMLpnN43O4pBqrSqwW+uQas1PptRvtQstm59e83jLJ2Kz1K6bT6+eoPBkEADs=';
			comment_bubble_uri = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdC'+
				'AK7OHOkAAAAHdElNRQfZBwsVChqBpMw9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
				'EwEAmpwYAAABa0lEQVQoz2NgQAKxreuYY1vXBsS1rlsJxA+B+D8Qfwbik0DcDMRSDNgAUEI6qmnN'+
				'0f6Vx/6fuPbk/5sPX/+DwPefv//fffru/4bD1//nTtz2C6iuCF2jHBC/vXT3xX984OuPX/+X7Lr4'+
				'P6R2ZSdQPSPQqWtZg2pWrD9z4+l/YkHPiqO/w+pXaTEEVC2TnbX57Of/JIB7z979z5+0bSJDeMMq'+
				'g4MX7pOi9/83oPNLpu28yAAMJLNDFx+QpPkrRPM5oLOXy0xbf+oDKZrvPH37P2/itn5w3IbUrliw'+
				'9fgtojW3Lzn0LrRupQIsqtiA+N7pG0/+//v3D6em95+//5+75SwoqsrR41oI6P8drYsO/dtz5u7/'+
				'O0/e/v/5+w9Y020ge8bG0/9TuzZ+BKpLZsAFgJL2QDwN6J0TQPrbRWDCAQbOMSA/FsjnZiAWABUb'+
				'18ze+7946o6JDOQAoAHxQPwdiJnJNGCtJVCzF7o4AIvXFqgzJp23AAAAAElFTkSuQmCC';

			doc = document.createElement('div');
			doc.innerHTML = resp.responseText;
			var fresh_reviews_html;
			var rotten_reviews_html;

			// get canonical RT url
			var findPattern = "//div[@class='movie_tools_area']/a";
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			
			if (results.snapshotItem(0) != null)
			{
				URL_split = results.snapshotItem(0).href.split(".com")
				rottenTomatoesURL = "http://www.rottentomatoes.com"+URL_split[1];
			} // end if 


			findPattern = "//div[@id='tomatometer_data']/p";
			results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			if (results.snapshotItem(3) != null && showAverageRating == true)
			{
				average_split = results.snapshotItem(3).innerHTML.split(":");
				average_html = average_split[1];
				average_html = " <span id='gm_rotten_average_html' style='font-size:smaller;'>(Average "+average_html+")</span>";
			} // end if tomatometer_data not null
			
			if (results.snapshotItem(0) != null && showReviewCount == true)
			{
				count_split = results.snapshotItem(0).innerHTML.split(":");
				count_split_title = count_split[1].split(">"); // Added to remove the span tag in the anchor's title
				reviews_count_html = " <span title='"+count_split_title[1].replace("</span", "")+" Total Reviews' style='margin-left:10px;'><img style='width:12px;' src='"+comment_bubble_uri+"' alt='Reviews'> "+count_split[1]+"</span>";
				
			} // end if
			else
				reviews_count_html = "";

			if(results.snapshotItem(1) != null && showPositiveReviewCount == true) {
				fresh_split = results.snapshotItem(1).innerHTML.split(":");
				fresh_split_title = fresh_split[1].split(">"); // Added to remove the span tag in the anchor's title
				fresh_reviews_html = " <a href='"+rottenTomatoesURL+"?sortby=fresh&view=#contentReviews' title='"+fresh_split_title[1].replace("</span", "")+" Fresh Reviews' style='margin-left:10px; text-decoration:none;'><img style='width:12px;' src='"+fresh_icon_uri+"' alt='Fresh'> "+fresh_split[1]+"</a>";
			}
			else
				fresh_reviews_html = "";
				
			if(results.snapshotItem(2) != null && showNegativeReviewCount == true) {
				rotten_split = results.snapshotItem(2).innerHTML.split(":");
				rotten_split_title = rotten_split[1].split(">"); // Added to remove the span tag in the anchor's title
				rotten_reviews_html = " <a href='"+rottenTomatoesURL+"?sortby=rotten&view=#contentReviews' title='"+rotten_split_title[1].replace("</span", "")+" Rotten Reviews' style='margin-left:10px; text-decoration:none;'><img style='width:12px;' src='"+rotten_icon_uri+"' alt='Rotten'> "+rotten_split[1]+"</a>";
			}
			else
				rotten_reviews_html = "";


			if(showReviewCount == true || showPositiveReviewCount == true || showNegativeReviewCount == true) {
				reviews_html = reviews_count_html+fresh_reviews_html+rotten_reviews_html;
			}
			else
				reviews_html = "";

			
			var findPattern = "//div[@id='tomatometer_score']/span";
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if (results.snapshotItem(0) != null)
			{
				var score_html = results.snapshotItem(0).innerHTML;
				if (score_html == "N/A") {
					score_html = "N/A";
					rotten_rating_image_uri = '';
					rotten_rating_text = '';
				}
				else {
					if (parseInt(score_html) >= 60) { // it's fresh
						rotten_rating_image_uri = fresh_icon_uri;
						rotten_rating_text = "Fresh";
					}
					else { // it's rotten
						rotten_rating_image_uri = rotten_icon_uri;
						rotten_rating_text = "Rotten";
					}
					score_html = score_html + "%";
				}
				// found a rotten_rating
				if ( score_html == -1)
				{
					addedDivRotten.innerHTML = '<H3>Rotten Tomatoes:</H3>\nNot enough reviews for a rating\n<a class="tn15more inline" title="Rotten Tomatoes link" href="' + rottenTomatoesURL + '">more</a>';
					addedDivRotten.style.color='black';
				}
				else { // best default case
					var rotten_rating_image_url, rotten_rating_text;
					var addedDivRotten = document.getElementById('greaseTextRotten');
					addedDivRotten.innerHTML = '<H3>Rotten Tomatoes:</H3>\n<div id="greaseTextRottenResults" style=\"-moz-border-radius: 4px !important; border: 2px solid #5E7D0E !important\">' + score_html + ' \n<img src="' + rotten_rating_image_uri + '" alt="' + rotten_rating_text + '" title="' + rotten_rating_text + '">\n'+average_html+reviews_html+'</div>\n<br/><br/><a class="tn15more inline" title="Rotten Tomatoes Link" href="' + rottenTomatoesURL + '">More >>></a>';
					addedDivRotten.style.color='black';
					addedDivRotten.style.padding='4px 4px 4px 0'; // Changed padding so "Rotten Tomatoes" would line up with other IMDb text

					if(useRottenTomatoesColors == true) {
						var addedDivRottenResults = document.getElementById('greaseTextRottenResults');
						addedDivRottenResults.style.color='#5E7D0E';
						addedDivRottenResults.style.display='inline';
						addedDivRottenResults.style.backgroundColor='#d6e5a5';
						addedDivRottenResults.style.fontFamily='"Trebuchet MS",Trebuchet,Myriad,sans-serif';
						addedDivRottenResults.style.padding='3px';
					} // end if useRottenTomatoesColors

				} // end else 
			} // end if tomatometer_score not null
			else {
				// did not find rotten_rating
				var addedDivRotten = document.getElementById('greaseTextRotten');
				addedDivRotten.innerHTML = 'No Rotten Tomatoes rating found.';
			}
		}
	});
}