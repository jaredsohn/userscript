// ==UserScript==
// @name           IMDB ratings on nxtgn tracker
// @namespace      Original Script By Vigazor http://userscripts.org/scripts/show/56420 - tweaked by Minus
// @description    IMDB Ratings Nxtgn Original Script By Vigazor.
// @include        http*://*nxtgn.org/browse.php*
// @version        1.9b
// ==/UserScript==
/*
// @require http://buzzy.hostoi.com/AutoUpdater.js
autoUpdate(56420, "1.9");
 Do not edit anything below, if you are not sure what you do
*/
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
function addScore(){
	/* Pick the correct tags and get the potential movietitle before sending it to the title parser */
	var a_dt = document.getElementsByTagName('a'); // Get all <A>'s - should point to http://nordic-t.org/details.php?id=...
	for(i=0; i < a_dt.length; i++) {
		var currElement=a_dt[i];
		if (!currElement.href.match(/\/details.php/)) continue;
		var movieTitle = currElement.title; // Get first title tag and make it lowercase and cleanup
		movieTitle = cleanup(movieTitle.toLowerCase());
		if (!movieTitle.match(/bluray|xvid| ts |divx|avi|movies|dvdrip|hdtv|hddvd|nordic|brrip|hdrip|dvd9|dvd5|bluray|bd9|bd5|dvdr/)) continue;
		if (movieTitle.match(/xxx|swe6rus|novo|ps2/)) continue;
		checkMovie(movieTitle, currElement);
	}
}
function addScore_details(){
	/* Pick the correct tags and get the potential movietitle before sending it to the title parser */
	var currElement = document.getElementsByTagName('h1')[0];
	var movieTitle = currElement.innerHTML; // Get the H1 tag
	movieTitle = cleanup(movieTitle.toLowerCase());
    if (!movieTitle.match(/bluray|xvid| ts |divx|avi|movies|dvdrip|hdtv|hddvd|nordic|brrip|hdrip|dvd9|dvd5|bluray|bd9|bd5|dvdr/)) return;
    if (movieTitle.match(/xxx|swe6rus|novo|ps2/)) return;
	checkMovie(movieTitle, currElement);
}
function checkMovie(movieTitle, currElement) {
	/*  Parse a textstring into a movie title by guessing the correct syntax  */
    mpos = movieTitle.search(/[0-9]{4}/)
	if (mpos > 4) {
		loggingOn?GM_log("Year: " + mpos + movieTitle):void(0);
		handleDTentry(movieTitle.substring(0, mpos+4), currElement);
	} else {
		/* Last option: look for word and use anything before that word.
		If none of the words are found - use everything */
		match = movieTitle.search(/ dvd | hdtv | 1080p | 720p | x264 | dk | no | eng | pal | dtfs |nordic|s1|s2|s3|s4|d1|d2|d3|d4|s01|s02|s03|s04|s05|s06|s07|s08|s09|s10|s11|s12|s13|s14|s15|s16|s17|s18|s19|s20|e01|e02|e03|e04|e05|e06|e07|e08|e09|e10|e11|e12|e13|e14|e15|e16|e17|e18|e19|e20|1080p|1080i|bd9|bdisc| disc | aaf |proper|r5|limited|italian|french|german|multi|multisubs|complete|dsr|dvsky|dvdr|dvd9|dvd5|ntsc|dvd|puzzle|watbath|xvidhd|npw| ts | cam |telesync|pdtv|hdtv|avi|xvid|bluray|hddvd|nhd|ws|dkdexter|spanish/);
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
				if (gR.responseData.results && gR.responseData.results.length > 0) {
					var imdbUrl = gR.responseData.results[0].url; // get imdbUrl from googleResponse
					imdbUrl = imdbUrl.substring(0, 36)+"combined"; // Crop to http://www.imdb.com/title/tt1080016/
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
	r += "<div style='float:right;'>";
	r += "<a href='" + ratingLink[2] + "' target=”_blank' " + "' style='";
	r += "background-color: "  + color[colnumber];
	r += ";'>";
	r += ratingLink[1]+"  ";
	r += "</a>  ";
	r += "</div>";
	r += element.parentNode.innerHTML;
	element.parentNode.innerHTML = r;
}
 
if (/details\.php/.test(window.location.href)) {
	addScore_details();
} else {
	addScore();
}