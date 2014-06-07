// ==UserScript==

// @name           IMDB rating for torrentz and  pirate bay
// @namespace      Script by Vigazor
// @description    Adds IMDB Ratings for torrentz.com and thepiratebay.org
// @include        http://*torrentz.com/*
// @include        http://*torrentz.eu/*
// @include        http://*thepiratebay.org/*
// @version        1.95
// @require        http://userscripts.org/scripts/source/52251.user.js

// ==/UserScript==

//autoUpdate(56362, "1.95");

var loggingOn=false;

function cleanup(str) {
	/* Small function to cleanup a string, remove html tags, underscores, weird characters etc. */
	str = str.replace(/\./g, ' ') // . --> space
		.replace(/_/g, ' ') // underscore to space
		.replace(/\(/g, ' ')
		.replace(/\)/g, ' ') 
		.replace(/ +/g, ' ') // double spaces
		.replace(/&amp;/g, 'and') 
		.replace(/<\/?[^>]+(>|$)/g, ""); // HTML TAGS
	return str;
}

function addScore_tpb(){
	/* Pick the correct tags and get the potential movietitle before sending it to the title parser */
	var a_dt = document.getElementsByTagName('a'); // Get all <A>'s 
	for(i=0; i < a_dt.length; i++) {
		var currElement=a_dt[i];
		if (!currElement.href.match(/\/torrent\//)) continue;
		var movieTitle = currElement.innerHTML; // Get the text for the link
		movieTitle = cleanup(movieTitle.toLowerCase());
		//if (!movieTitle.match(/bluray|xvid| ts |divx|avi|movies|dvdrip|hdtv|hddvd|nordic|brrip|hdrip|dvd9|dvd5|bluray|bd9|bd5|dvdr/)) continue;
		if (movieTitle.match(/xxx|swe6rus|novo|ps2/)) continue;
		loggingOn?GM_log(i + " checking movie: " + movieTitle):void(0);
		checkMovie(movieTitle, currElement);
	}
}

function addScore_torrentz(){
	/* Pick the correct tags and get the potential movietitle before sending it to the title parser */
	var a_dt = document.getElementsByTagName('dt');
	loggingOn?GM_log("Found " + a_dt.length + " dt elements"):void(0);
	for(i=0; i < a_dt.length; i++) {
		var currElement=a_dt[i];
		var descText = currElement.getElementsByTagName('a');
		if (descText.length==0) continue; // FAST skipping all wrong dt elements
		loggingOn?GM_log(i + " href  " + descText[0].href):void(0);
		if (descText[0].href.match(/\/z\//)) continue; // FAST skipping all /z/ links
		// Reset current element to the torrent link
		currElement = descText[0];
		var movieTitle = descText[0].innerHTML; 
		movieTitle = cleanup(movieTitle.toLowerCase());
		if (!movieTitle.match(/|dvd|dvdrip|xvid|telesync| ts |divx|avi|movies|dvdrip|hdtv|hddvd|nordic|brrip|hdrip|dvd9|dvd5|bluray|bd9|bd5|dvdr|R5|dvdscr|dvdrip/)) continue;
		loggingOn?GM_log(i + " checking movie: " + movieTitle):void(0);
		window.setTimeout(checkMovie, i*200,movieTitle, currElement);
	}
}

function checkMovie(movieTitle, currElement) {
	/*  Parse a textstring into a movie title by guessing the correct syntax  */
    mpos = movieTitle.search(/[0-9]{4}/)
	if (mpos > 4) {
		loggingOn?GM_log("Year: " + movieTitle.substring(0, mpos+4)):void(0);
		handleDTentry(movieTitle.substring(0, mpos+4), currElement);
	} else {
		/* Last option: look for word and use anything before that word.
		If none of the words are found - use everything */
		match = movieTitle.search(/ eng | dvd | hdtv | 1080p | 720p | x264 | pal | dtfs |nordic|s1|s2|s3|s4|d1|d2|d3|d4|s01|s02|s03|s04|s05|s06|s07|s08|s09|s10|s11|s12|s13|s14|s15|s16|s17|s18|s19|s20|e01|e02|e03|e04|e05|e06|e07|e08|e09|e10|e11|e12|e13|e14|e15|e16|e17|e18|e19|e20|1080p|1080i|bd9|bdisc| disc | aaf |proper|r5|limited|italian|french|german|multi|multisubs|complete|dsr|dvsky|dvdr|dvd9|dvd5|ntsc|dvd|puzzle|watbath|xvidhd|npw| ts | cam |telesync|pdtv|hdtv|avi|xvid|bluray|hddvd|nhd|ws|dkdexter|spanish/);
		if (match >= 3) movieTitle = movieTitle.substring(0, match);
		loggingOn?GM_log("General: " + movieTitle):void(0);
		handleDTentry(movieTitle, currElement);
	}
}

function handleDTentry(searchTitle, element){
	var googleUrl = String('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=["' + searchTitle + '"]+site:imdb.com/title');
	loggingOn?GM_log("Google: " + googleUrl):void(0);
	GM_xmlhttpRequest({
			method: 'GET',
			url: googleUrl,
			onload: function(responseDetails) {
				var gR = eval('(' + responseDetails.responseText + ')');
				loggingOn?GM_log("GR:" + gR + ":" + searchTitle ):void(0);
				if (gR.responseData==null) {
					loggingOn?GM_log("GRNULL:" + searchTitle ):void(0);
				} else {
					if (gR.responseData.results && gR.responseData.results.length > 0) {
						var imdbUrl = gR.responseData.results[0].url; // get imdbUrl from googleResponse
						imdbUrl = imdbUrl.substring(0, 36)+"combined"; // Crop to http://www.imdb.com/title/tt1080016/combined
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
								var votesMatch = res.match(/<a href="ratings" class="tn15more">(.*) votes/); // <a href="ratings" class="tn15more">6,072 votes</a>
								var ratingMatch = res.match(/<div class="starbar-meta">\s*<b>(\d\.\d)\/10<\/b>/); //<div class="starbar-meta"><b>8.3/10</b> 
								var imdbMovieId;
								var imdbTitle = res.match(/<title>(.*)<\/title>/)[1];
								if (m=imdbUrl.match(/title\/tt([0-9]+)\//) ) imdbMovieId = m[1];
								var rating = 0.0;
								var votes = 0;
								if (ratingMatch) {
									rating = ratingMatch[1];
									votes = votesMatch[1];
									addratingLinkToElement(element, [imdbTitle, rating, responseDetails.finalUrl, votes, searchTitle]);
								} else if (res.match(/awaiting 5 votes/)) { // Awaiting 5 votes
									addratingLinkToElement(element, [imdbTitle, "0.0", responseDetails.finalUrl, "<5", searchTitle]);
								} else {
									loggingOn?GM_log("could not get rating: "+searchTitle):void(0);
									addratingLinkToElement(element, [searchTitle, "0.0", responseDetails.finalUrl, 0, searchTitle])
								}
							}
						});
					} else {
						loggingOn?GM_log("google failed: "+searchTitle):void(0);
					}
				}
			}
	});
}

function addratingLinkToElement(element, ratingLink){
	var imdbTitle = ratingLink[0];
	var imdbrating = ratingLink[1];
	var imdbUrl = ratingLink[2];
	var votes = String(ratingLink[3]);
    var searchTitle = ratingLink[4];
	votes = votes.replace(/,| /g,"")

	colnumber = Math.round(ratingLink[1]);
	if (votes == -1) {
		votes = "<5";
	}
	if (ratingLink[1] == -1 ) {
		ratingLink[1] = "N/A";
	} else if (ratingLink[1] == 0 ) {
		ratingLink[1] = "N/A";
	}
	color = ["#Faa", "#Faa","#Faa", "#Faa","#Faa", "#Faa","#Faa", "#ff7","#7e7", "#5e5", "#0e0", "#ddd"]
	var r = ""
	r += "<div style='float:left; width:10em;clear:both;'>";
	r += "<a href='" + ratingLink[2] + "' style='";
	r += "background-color: "  + color[colnumber];
	r += ";'>";
	r += ratingLink[1]+" - " + votes + " votes";
	r += "</a>  ";
	r += "</div>";
	r += element.parentNode.innerHTML;
	element.parentNode.innerHTML = r;
}

if (/torrentz.com/.test(window.location.href)) {
	addScore_torrentz();
} else {
	addScore_tpb();
}




