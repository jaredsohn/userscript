// ==UserScript==

// @name           Show IMDB Ratings on Torrentz.com
// @namespace      Script Modified by Nitin Hayaran (Originally by, Vigazor and Rosenkjaer)
// @description    IMDB Rating add for Torrentz.com
// @include        http://www.torrentz.com/*
// @include        http://torrentz.com/*

// ==/UserScript==

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// USER SETTINGS, edit this, to make changes
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Show IMDB style stars
var imdb = true; // Set this one to to false to get ratings as text

// Show 10 grey stars behind rating
var showgreystars = true; // true = show grey stars, false= only show rating stars

// Show votes
var showvotes = true; // false = dont show votes, true = show votes

// Show on two lines or one line
var twolines = false; // false = show stars and torrent link on same line

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// DONT!! Edit anything below, if you are not sure what you do
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var loggingOn=false;


var starimage=''+
'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'+
'mwAAAABJRU5ErkJggg==';

function cleanup(str) {
	str = str.replace(/<\/?[^>]+(>|$)/g, "")
		.replace(/\./g, ' ') // . --> space
		.replace(/_/g, ' ') // underscore to space
		.replace(/[\',]/g, '') // quotation  marks
		.replace(/\[.*?\]/g, '') 
		.replace(/ +/g, ' ')
		.replace(/\(/g, '')
		.replace(/\)/g, '')
		.replace(/^ +| +$/g, '');
	return str;
}

function checkMovie(movieTitle, currElement) {
	//
	// Extract movie title from text string
	//
	// Check for "Title title title 2009 blah blah blahb" - and keep title + year
	mpos = movieTitle.search(/[0-9]{4}/)
	if (mpos > 0) {
		loggingOn?GM_log("Year: " + mpos + movieTitle):void(0);
		movieTitle = movieTitle.substring(0, mpos+4);
		handleDTentry(movieTitle, currElement);
	} else if(movieTitle.match(/klaxxon/)) {
		loggingOn?GM_log("Klaxxon: " + movieTitle):void(0);
		searchTitle = movieTitle.substring(0, movieTitle.indexOf('klaxxon'));
		handleDTentry(searchTitle, currElement);
	} else if(m=movieTitle.match(/axxo|fxg|fxm/)){ // Always like "title titlte YEAR DVDRIP AXXO"
		loggingOn?GM_log("Axxo: " + movieTitle):void(0);
		temp = movieTitle;
		temp = temp.substring(0, temp.indexOf('dvdrip'));
		handleDTentry(temp, currElement);
	} else {
		match = movieTitle.search(/ dvd | hdtv | 720p | x264 | dk | no | eng | pal | dtfs |nordic|s1|s2|s3|s4|d1|d2|d3|d4|s01|s02|s03|s04|s05|s06|s07|s08|s09|s10|s11|s12|s13|s14|s15|s16|s17|s18|s19|s20|e01|e02|e03|e04|e05|e06|e07|e08|e09|e10|e11|e12|e13|e14|e15|e16|e17|e18|e19|e20|1080p|1080i|bd9|bdisc| disc | aaf |proper|r5|limited|italian|french|german|multi|multisubs|complete|dsr|dvsky|dvdr|dvd9|dvd5|ntsc|dvd|puzzle|watbath|xvidhd|npw| ts | cam |telesync|pdtv|hdtv|avi|xvid|bluray|hddvd|nhd|ws|dkdexter|spanish/);
		if (match >= 3) { // If match occurs more than three characters in the string, crop out the rest of the string
			movieTitle = movieTitle.substring(0, match);
		} 
		loggingOn?GM_log("General: " + movieTitle):void(0);
		handleDTentry(movieTitle, currElement);
	}
}

function addScore_torrentz(){
	//
	// Specific to torrentz.com
	//
	a_dt = document.getElementsByTagName('dt');
	for(i=0; i < a_dt.length; i++) {
		currElement=a_dt[i];
		descText = currElement.getElementsByTagName('a');
		if (!descText[0].href.match(/www\.torrentz\.com/)) {
			continue; // FAST skipping all non-torrent links
		}
		// Reset current element to the torrent link
		currElement = descText[0];
		movieTitle = descText[0].innerHTML; 
		movieTitle = cleanup(movieTitle.toLowerCase());
		if (!movieTitle.match(/xvid| ts |divx|avi|movies|dvdrip|hdtv|hddvd|nordic|brrip|hdrip|dvd9|dvd5|bluray|bd9|bd5|dvdr/)) {
			continue; // FAST skipping II
		}
		if (movieTitle.match(/xxx|swe6rus|novo|ps2/)) {
			continue; // FAST skipping III
		}
		checkMovie(movieTitle, currElement);
	}
}

function handleDTentry(searchTitle, element){
	var googleUrl = String('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=[' + searchTitle + ']+site:imdb.com/title');
	loggingOn?GM_log("Google: " + googleUrl):void(0);
	GM_xmlhttpRequest({
			method: 'GET',
			url: googleUrl,
			onload: function(responseDetails) {
				var gR = eval('(' + responseDetails.responseText + ')');
				if (gR.responseData.results && gR.responseData.results.length > 0) {
					var imdbUrl = gR.responseData.results[0].url; // get imdbUrl from googleResponse
					imdbUrl = imdbUrl.substring(0, 36); // Crop to http://www.imdb.com/title/tt1080016/
					loggingOn?GM_log("Parsed:" + searchTitle + " to: " + imdbUrl):void(0);
					GM_xmlhttpRequest({
						method: 'GET',
						url: imdbUrl,
						headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml',
						},
						onload: function(responseDetails) {
							var res = responseDetails.responseText;  
							var votesMatch = res.match(/<a href="ratings" class="tn15more">(.*) votes/);
							var ratingMatch = res.match(/<div class="meta">\s*<b>(\d\.\d)\/10<\/b>/);
							var imdbMovieId;
							var match = imdbUrl.match(/title\/tt([0-9]+)\//);
							if (match) imdbMovieId = match[1];
							if (ratingMatch) {
								rating = ratingMatch[1];
								votes = votesMatch[1];
								addratingLinkToElement(element, [searchTitle, rating, responseDetails.finalUrl, votes]);
							} else if (res.match(/awaiting 5 votes/)) { // Awaiting 5 votes
								addratingLinkToElement(element, [searchTitle, 0.0, responseDetails.finalUrl, 0]);
							} else {
								loggingOn?GM_log("could not get rating: "+searchTitle):void(0);
								addratingLinkToElement(element, [searchTitle, -1.0, responseDetails.finalUrl, -1])
							}
						}
					});
				} else {
					loggingOn?GM_log("google failed: "+searchTitle):void(0);
				}
			}
	});
}

function addratingLinkToElement(element, ratingLink){
	if (ratingLink && ratingLink != -1) {
		votes = String(ratingLink[3]);
		votes = votes.replace(/,| /g,"")
		if (votes == -1) {
			votes = "<5";
		}
		ratingElement = "<!-- Container -->";
		if (twolines) {
			ratingElement += "<div style='height:20px'>"; // For two lines
		} else if (!imdb) {
			ratingElement += "<div style='float:left;'>"; // For everything on one line and no IMDB stars
		} else {
			ratingElement += "<div style='float:left;'>"; // For everything on one line  AND IMDB stars
		}
		ratingElement += "<!-- Starbar --><div style='height:20px; float:left;'><a href='" + ratingLink[2] + "'>";
		if ( imdb ) {
			imdbrating = ratingLink[1] + " Stars";
			//if (showgreystars) imdbrating  = "<div style='width: 200px;height: 20px;background: url(data:image/png;base64," + starimage + ") no-repeat 0px 0px;'>";
			//imdbrating += "<div style='width: " + 20 * ratingLink[1] + "px;height: 20px;background: url(data:image/png;base64," + starimage + ") no-repeat 0px -20px;'>";
			//imdbrating += "</div>";
			//if (showgreystars) imdbrating += "</div>";
			ratingElement += imdbrating;
		} else {
			if ( ratingLink[1] == -1 ) {
				rate = "N/A";
			} else if  ( ratingLink[1] == 0 ) {
				rate = "N/A";
			} else {
				rate = ratingLink[1];
			}
			ratingElement += rate ;
		}
		ratingElement += "</a></div><!-- End Starbar -->";
		if ( showvotes ) {



			ratingElement += "&nbsp; (" + votes + " votes) ";
		}

		ratingElement += "</div>&nbsp;";
		newText= ratingElement + element.parentNode.innerHTML;
		element.parentNode.innerHTML = newText;
	}
}

addScore_torrentz();