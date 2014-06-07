// ==UserScript==
// @name           LM Addon
// @namespace      http://localhost
// @description    Shows IMDB film rating
// @include        http://www.linkomanija.net/browse.php*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
/* 
 USER SETTINGS, edit this, to make changes
 */ 

 
 
// Show IMDB style stars
var imdb = false; // Set this one to to false to get ratings as text

// Additional information field
var mouseoverbool = true; // true = show the additional info field while hovering, false=don't

// Some settings for the additional information field
var showGenres = true; // Add genres field in there

/*
 Do not edit anything below, if you are not sure what you do
*/
var loggingOn=true;
var bgcolor = $("div#content > form > table:not(.bottom) tr td:nth-child(1)").css('background-color');
function cleanup(str) {
	/* Small function to cleanup a string, remove html tags, underscores, weird characters etc. */
	str = str.replace(/<\/?[^>]+(>|$)/g, "")
		.replace(/\./g, ' ') // . --> space
		.replace(/_/g, ' ') // underscore to space
		.replace(/[\',]/g, '') // quotation  marks
		.replace(/ +/g, ' ') // double spaces
		.replace(/&amp;/g, 'and'); 
	return str;
}

function checkMovie(movieTitle, currElement) {
	/*  Parse a textstring into a movie title by guessing the correct syntax  */
	mpos = movieTitle.search(/[0-9]{4}/);
	if (mpos != -1) {
		loggingOn?GM_log("Year: " + mpos + ", " + movieTitle):void(0);
		handleDTentry(movieTitle.substring(0, mpos+4), currElement);
	} else {
		/* Last option: look for word and use anything before that word.
		If none of the words are found - use everything */
		if(movieTitle.search(/pack/)!=-1) return;
		match = movieTitle.search(/dvd|hdtv|720p|x264|dk|no|eng|pal|dtfs|nordic|s1|s2|s3|s4|d1|d2|d3|d4|s01|s02|s03|s04|s05|s06|s07|s08|s09|s10|s11|s12|s13|s14|s15|s16|s17|s18|s19|s20|e01|e02|e03|e04|e05|e06|e07|e08|e09|e10|e11|e12|e13|e14|e15|e16|e17|e18|e19|e20|1080p|screener|1080i|bd9|bdisc|disc|aaf|proper|r5|limited|italian|french|german|multi|multisubs|complete|dsr|dvsky|dvdr|dvd9|dvd5|ntsc|dvd|puzzle|watbath|xvidhd|npw|ts|cam|telesync|pdtv|hdtv|avi|xvid|bluray|hddvd|nhd|ws|dkdexter|spanish/);
		if (match >= 3) movieTitle = movieTitle.substring(0, match);
		loggingOn?GM_log("General: " + movieTitle):void(0);
		handleDTentry(movieTitle, currElement);
	}
}

function addScore_torrentz(){
	/* Pick the correct tags and get the potential movietitle before sending it to the title parser */
	$("div#content > form > table:not(.bottom) tr td:nth-child(2)").each(function () {
		var fn = $(this).find('a:first').text();
		if(fn!='Pavadinimas') {
			var movieTitle = cleanup(fn.toLowerCase());
			if (movieTitle.match(/xvid|telesync|ts|divx|avi|movies|dvdrip|hdtv|hddvd|nordic|brrip|hdrip|dvd9|dvd5|bluray|bd9|bd5|dvdr/)) {
				checkMovie(movieTitle, this);
			}
		}
	});	
}

function handleDTentry(searchTitle, element){
	var googleUrl = String('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=["' + searchTitle + '"]+site:imdb.com/title');
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
							//var genreMatch = res.match(/<h5>Genre:<\/h5>\s*(<a href="[\/a-zA-Z]*">([a-zA-Z]*)<\/a>(\s\|\s)?)*/g);
							var pattern = /<a href="\/Sections\/Genres\/[\w]*\/">([\w]*)<\/a>/g;
							var match;
							var genre = '';
							while (match = pattern.exec(res)) {
								genre += match[1]+", ";
							}
							genre = genre.slice(0, genre.length-2);
							var imdbMovieId;
							if (m=imdbUrl.match(/title\/tt([0-9]+)\//) ) imdbMovieId = m[1];
							var rating = 0.0;
							var votes = 0;
							if (ratingMatch) {
								rating = ratingMatch[1];
								votes = votesMatch[1];
								addratingLinkToElement(element, [searchTitle, rating, responseDetails.finalUrl, votes, genre]);
							} else if (res.match(/awaiting 5 votes/)) { // Awaiting 5 votes
								addratingLinkToElement(element, [searchTitle, "awaiting 5 votes", responseDetails.finalUrl, 0, genre]);
							} else {
								loggingOn?GM_log("could not get rating: "+searchTitle):void(0);
								addratingLinkToElement(element, [searchTitle, "0.0", responseDetails.finalUrl, -1, genre])
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
	var title = ratingLink[0];
	var imdbrating = ratingLink[1];
	var imdbUrl = ratingLink[2];
	var votes = String(ratingLink[3]);
	votes = votes.replace(/,| /g,"")
	var ratingElement = "<div class='imdb' style='float:right;'>IMDB: ";
	ratingElement += "<a href='" + ratingLink[2] + "' target='_blank'>";
	var rate;
	if ( ratingLink[1] == -1 ) {
		rate = "N/A";
	} else if  ( ratingLink[1] == 0 ) {
		rate = "N/A";
	} else {
		rate = ratingLink[1];
	}
	ratingElement += rate ;
	ratingElement += "</a>";
	ratingElement += " (" + votes + " votes)";
	if(mouseoverbool) {
		ratingElement += "<div class='hover' style='display:none'>Search query: " + title + "<br />" +
			"Rating: " + rate + "<br />"+
			"Vote count: " + votes + "<br />"+
			"IMDB URL: <a href='" + imdbUrl + "' target='_blank'>" + imdbUrl + "</a><br />";
		showGenres? ratingElement += "Genre: "+ratingLink[4]+"." : void(0);
		ratingElement += "</div>";
	}
	ratingElement += "</div>";
	$(element).append(ratingElement);
	if(mouseoverbool)
	$('.imdb').each(function() {
		var offset = $(this).offset();
		$(this).find('.hover')
			.css({
				'position' : 'absolute', 
				'top' : offset.top + $(this).height(),
				'left' : offset.left,
				'padding' : '5px',
				'border' : '1px solid #888888',
				'background-color' : bgcolor
			});
	}).mouseover(function() {
		$(this).find('.hover').show();
	}).mouseout(function() {
		$(this).find('.hover').hide();
	});		
}

addScore_torrentz();