// ==UserScript==
// @name			add Rottentomatoes info to IMDB/Lovefilm.de
// @namespace		http://userscripts.org/scripts/show/128103
// @description		Adds info from Rottentomatoes to IMDB title pages
// @version			0.1-3.1.1
// @include			http://*.imdb.com/title/*/
// @include			http://*.imdb.com/title/*/maindetails
// @include			http://*.imdb.com/title/*/combined
// @include			http://imdb.com/title/*/
// @include			http://imdb.com/title/*/maindetails
// @include			http://imdb.com/title/*/combined
// @include			http://*.lovefilm.de/film/*
// @require			http://sizzlemctwizzle.com/updater.php?id=128103
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require			http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// ==/UserScript==

// ==Test Cases ==
// http://www.imdb.com/title/tt1375666/ -- Inception (2010) -- RT IMDb Alias API normal (best case scenario)
// http://www.imdb.com/title/tt1375666/combined -- Inception (2010) -- Old IMDb layout -- RT IMDb Alias API normal (best case scenario)
// http://www.imdb.com/title/tt1187064/ -- Triangle (2009) -- Has a Tomatometer rating, but no consensus yet
// http://www.imdb.com/title/tt1762308/ -- Midway to Heaven (2011) -- No Tomatometer rating and no consensus
// http://www.imdb.com/title/tt1126618/ -- Morning Glory (2010) -- RT IMDb Alias API error, works through regular RT API
// http://www.imdb.com/title/tt0386676/ -- The Office (TV Series 2005â€“ ) -- TV show (shouldn't add any RT information)
// http://www.imdb.com/title/tt1848620/ -- "The Office" Search Committee -- TV show episode (shouldn't add any RT information)
// http://www.imdb.com/title/tt1848620/combined -- "The Office" Search Committee -- Old IMDb layout -- TV show episode (shouldn't add any RT information)

// ==User-Defined Variables==

rottenTomatoesApiKey = 'rya8rbpjf93kx9xcu2876ght'; // customize for your own Rotten Tomatoes API login details

//showConsensus = false;
showConsensus = true;

//useRottenTomatoesColors = false;
useRottenTomatoesColors = true;

//showAudience = false;
showAudience = true;

// options below are temporarily deprecated until Rotten Tomatoes adds them to their API
	//showAverageRating = false;
	//showAverageRating = true;

	//showReviewCount = false;
	//showReviewCount = true;

	//showFreshReviewCount = false;
	//showFreshReviewCount = true;

	//showRottenReviewCount = false;
	//showRottenReviewCount = true;

// ==/User-Defined Variables==


if (useRottenTomatoesColors == true) {
	var stylesheet = '								\
<style>												\
	#rottenTomatoesResults {						\
		padding: 5px;								\
		margin-top: 5px;							\
		clear: both;								\
		color: #6F6A57;								\
		border: 1px solid #dddddd;					\
		border-radius: 10px;						\
		-moz-box-shadow: 0px 0px 5px #ddd; 			\
		-webkit-box-shadow: 0px 0px 5px #ddd; 		\
		box-shadow: 0px 0px 5px #ddd; 				\
		background-image: -webkit-gradient(			\
			linear,									\
			left top,								\
			left 25,								\
			color-stop(0.1, rgb(255,227,125)),		\
			color-stop(0.3, rgb(255,254,215))		\
		);											\
		background-image: -moz-linear-gradient(		\
			center top,								\
			rgb(255,227,125) 10%,					\
			rgb(255,254,215) 30%					\
		);											\
	}												\
	#rottenTomatoesResults a, #rottenTomatoesResults a:link, #rottenTomatoesResults a:hover {	\
		color: #506A16 !important;					\
		text-decoration: none !important;			\
	}												\
	#rottenTomatoesResults a:hover {				\
		text-decoration: underline !important;		\
	}												\
	#rottenTomatoesResults img {					\
		margin-right: 10px;							\
	}												\
	#rottenTomatoesResults div.rtIcon {				\
		background:url("http://images.rottentomatoescdn.com/images/redesign/icons-v2.png") 0 0;						\
		float: left;								\
		width: 48px;								\
		height: 48px;								\
	}												\
	#rottenTomatoesResults div.rtIcon.fresh {		\
		background-position: 120px 128px;			\
	}												\
	#rottenTomatoesResults div.rtIcon.certified_fresh {		\
		background-position: 120px 80px;			\
	}												\
	#rottenTomatoesResults div.rtIcon.rotten {		\
		background-position: 72px 80px;				\
	}												\
	#rottenTomatoesResults div.rtIcon.upright {		\
		background-position: 280px 48px;			\
		width: 32px;								\
		height: 32px;								\
	}												\
	#rottenTomatoesResults div.rtIcon.spilled {		\
		background-position: 184px 48px;			\
		width: 32px;								\
		height: 32px;								\
	}												\
	#rottenTomatoesResults div.rtIcon.wts {			\
		background-position: 314px 48px;			\
		width: 32px;								\
		height: 32px;								\
	}												\
	#rottenTomatoesResults .floater {				\
		float:left;									\
		padding: 0 3px;								\
	}												\
	#rottenTomatoesTomatoMeterScore, #rottenTomatoesAudience {				\
		font-family: Arial, Helvetica, sans-serif;	\
		font-size: 40px; 							\
		font-weight: 700; 							\
		font-style: normal; 						\
		color: #506A16; 							\
	}												\
	#rottenTomatoesTomatoMeterScore.noScore {		\
		font-size: 26px; 							\
	}												\
	#rottenTomatoesAudience {						\
		font-size: 30px; 							\
	}												\
	#rottenTomatoesConsensus {						\
		font-size:11px;								\
		margin-top:10px;							\
		line-height:1.5em;							\
	}												\
	.rottenClear {									\
		clear: both;								\
	}												\
</style>';


}
else {
	var stylesheet = '								\
<style>												\
	#rottenTomatoesResults {						\
		clear: both;								\
		margin-top: 5px;							\
	}												\
	#rottenTomatoesResults .floater {				\
		float:left;									\
		padding: 0 3px;								\
	}												\
	#rottenTomatoesResults div.rtIcon {				\
		background:url("http://images.rottentomatoescdn.com/images/redesign/icons-v2.png") 0 0;						\
		float: left;								\
		width: 32px;								\
		height: 32px;								\
	}												\
	#rottenTomatoesResults div.rtIcon.fresh {		\
		background-position: 249px 48px;			\
	}												\
	#rottenTomatoesResults div.rtIcon.certified_fresh {		\
		background-position: 152px 48px;			\
	}												\
	#rottenTomatoesResults div.rtIcon.rotten {		\
		background-position: 217px 48px;			\
	}												\
	#rottenTomatoesResults div.rtIcon.upright {		\
		background-position: 24px 152px;			\
		width: 24px;								\
		height: 24px;								\
	}												\
	#rottenTomatoesResults div.rtIcon.spilled {		\
		background-position: 24px 56px;				\
		width: 24px;								\
		height: 24px;								\
	}												\
	#rottenTomatoesResults div.rtIcon.wts {			\
		background-position: 24px 176px;			\
		width: 24px;								\
		height: 24px;								\
	}												\
	#rottenTomatoesConsensus {						\
		width:80%;									\
	}												\
	.rottenClear {									\
		clear: both;								\
	}												\
</style>';
}
$('head').append(stylesheet);

var spinnerGif = $('<img></img>').
	attr('alt', "...").
	attr('src', 'data:image/gif;base64,'+
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
		'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'
	);
	
var labelHtml = 'Rotten Tomatoes:';

rottenTomatoesResults = $('<div></div>').
		attr('id', "rottenTomatoesResults").
		html("Checking Rotten Tomatoes... ").
		append(spinnerGif); 

if ( -1 < location.host.indexOf("imdb.com"))
{
if (document.getElementById('tn15') != null) {
	oldImdbLayout = true;
}
else {
	oldImdbLayout = false;
}

findPattern = "//table[@class='probody']";
results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

if (results.snapshotItem(0) != null)
{
	proImdbLayout = true;
}
else {
	proImdbLayout = false;
}


var insertSelector = "div.star-box";

if (oldImdbLayout == true) {
	insertSelector = "div.info:first";
}

if (proImdbLayout == true) {
	insertSelector = "table.probody";
}

if (document.title.indexOf('TV Series') < 0
	&& $("#pagecontent").html().indexOf('<h2 class="tv_header">') < 0
	&& $("#pagecontent").html().indexOf("<h5>TV Series:</h5>") < 0
) {
	$(insertSelector).append(rottenTomatoesResults);
	getRTFromImdbId(getIMDBid());
}
}
else if ( -1 < location.host.indexOf("lovefilm.de"))
{
	insertSelector = "div.widgets";

	$(insertSelector).prepend(rottenTomatoesResults);
	//	.find('#rottenTomatoesResults');

	getRTFromTitle(getLoveOrigMovieName(),getLoveMovieYear());
}
else
{
	alert("rotten tomatoes not supported");
}

function getRTFromImdbId(imdbID) {

	$.getJSON('http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?type=imdb&id='+imdbID+'&apikey='+rottenTomatoesApiKey, function(response){
		if (response.hasOwnProperty("error")) {
			getRTFromTitle(getMovieName(),getMovieYear());
		}
		else {
			parseValidResponse(response);
		}
		
	});

} // end function getRTFromImdbId

function getRTFromTitle(movieName,movieYear) {

	rottenTomatoesResults.html("IMDb Alias not available: ").
		append("Trying Rotten Tomatoes Movie API...").
		append(spinnerGif);


	var rtUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey='+rottenTomatoesApiKey+'&q='+movieName+'%20'+movieYear;


	$.getJSON(rtUrl, function(response){
		if (response.hasOwnProperty("error")) {
			rottenTomatoesResults.html("Got error from Rotten Tomatoes' Movie API: \"").
				append(response.error).
				append("\" Giving up.");
		}
		else {
			if (response.hasOwnProperty("movies") && 0 < response.movies.length) {
				parseValidResponse(response.movies[0])
			}
			else {
				rottenTomatoesResults.html("Unable to find film in Rotten Tomatoes' Movie API. Giving up.");
			}
		}
	});
}
function parseValidResponse(response) {
	
	// add tomato-meter score and icon
	var tomatoMeterScoreImage = '';
	if (response.ratings.critics_score == -1) {
		tomatoMeterScoreText = "No Score Yet...";
		tomatoMeterScoreClass = " noScore";
	}
	else {
		tomatoMeterScoreText = response.ratings.critics_score;
		tomatoMeterScoreClass = "";
		
		critics_rating_text = response.ratings.critics_rating;
		
		if (critics_rating_text == "Certified Fresh") { // it's certified fresh
			critics_rating_image_class = 'certified_fresh';
		}
		else {
			if (critics_rating_text == "Fresh") { // it's fresh
				critics_rating_image_class = 'fresh';
			}
			else { // it's rotten
				critics_rating_image_class = 'rotten';
			}
		}
		tomatoMeterScoreText = response.ratings.critics_score + "%";

		tomatoMeterScoreImage = $('<div></div>').
			attr('class', 'rtIcon ' + critics_rating_image_class).
			attr('title', critics_rating_text + " - "+ tomatoMeterScoreText);

		if (critics_rating_text == "Certified Fresh") { // it's certified fresh
			critics_rating_image_class = 'certified_fresh';
		}
		else {
			if (critics_rating_text == "Fresh") { // it's fresh
				critics_rating_image_class = 'fresh';
			}
			else { // it's rotten
				critics_rating_image_class = 'rotten';
			}
		}

	}

	var tomatoMeterScore = $('<span></span>').
		attr("id", "rottenTomatoesTomatoMeterScore").
		text(tomatoMeterScoreText); 

	var tomatoMeter = $('<a></a>').
		attr('href', response.links.alternate).
		attr("id", "rottenTomatoesTomatoMeterScore").
		attr("title", "\""+response.title+"\" on Rotten Tomatoes").
		addClass("floater"+tomatoMeterScoreClass).
		html(tomatoMeterScoreImage).
		append(tomatoMeterScoreText);
		
	rottenTomatoesResults.html(tomatoMeter);

	
	if (showAudience) {
		if (response.ratings.hasOwnProperty("audience_rating")) {
			audience_rating_text = response.ratings.audience_rating;
		}
		else {
			audience_rating_text = "No Audience Rating Yet";
		}
		
		audience_rating_label = "Liked It";
		if (audience_rating_text == "Upright") { 
			audience_rating_image_class = 'upright';
		}
		else {
			if (audience_rating_text == "Spilled") { 
				audience_rating_image_class = 'spilled';
			}
			else {
				audience_rating_label = "Want To See It";
				audience_rating_image_class = 'wts';
			}
		}
		
		AudienceScoreText = response.ratings.audience_score + "%";
		

		AudienceScoreImage = $('<div></div>').
			attr('class', 'rtIcon ' + audience_rating_image_class).
			attr('title', audience_rating_text+" - "+AudienceScoreText+" "+audience_rating_label);

			rottenTomatoesResults.append(
			$('<a></a>').
				attr("href", response.links.alternate).
				attr("id", "rottenTomatoesAudience").
				attr("title", "\""+response.title+"\" on Rotten Tomatoes").
				addClass("floater").
				append(AudienceScoreImage).
				append(AudienceScoreText)
		);
	}

	if (showConsensus) {
		if (response.hasOwnProperty("critics_consensus")) {
			var consensusText = response.critics_consensus;
		}
		else {
			var consensusText = "No Consensus Yet";
		}
		rottenTomatoesResults.append(
			$('<div></div>').
				attr("id", "rottenTomatoesConsensus").
				addClass("floater").
				html("<b>Consensus</b> : ").
				append(consensusText)
		);
	}
	
	rottenTomatoesResults.append(
		$('<div></div>').
			addClass("rottenClear").
			html("&nbsp;")
	);
	
	// TODO add average rating -- currently not implemented in RT API
	
	// TODO add review count -- currently not implemented in RT API
	
	// TODO add fresh review count -- currently not implemented in RT API

	// TODO add rotten review count -- currently not implemented in RT API
	
}

function getIMDBid () {
	var regexImdbNum = /\/title\/tt(\d{7})\//;
	id = regexImdbNum.exec(document.location);
	return id[1];
}

function getMovieYear() {
	var links = document.evaluate(
			"//a[contains(@href,'year')]/text()",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

	year = new Date();
	year.setFullYear(links.snapshotItem(0).data);
	year = year.getFullYear();
	return year;
}

function getMovieName () {
	const $xpath = '//h1/text()';
	var $nodes = document.evaluate($xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return escape($nodes.singleNodeValue.data.replace(/[^\w \xC0-\xFF]/g, ''));
}

function getLoveMovieYear() {
        var released=$('table.product_info_table tbody tr th:contains("Erschienen")').siblings().text();
	{
		var year = new Date();
		year.setFullYear(released.match(/[12][90][0-9][0-9]/)[0]);
		year = year.getFullYear();
	}
	return year;
}

function getLoveOrigMovieName() {
     var name = $('table.product_info_table tbody tr th:contains("Originaltitel")').siblings().text();
     if(!name){
	     name=$("title").text().match(/(.*) auf/)[1]
     }
     return name;
}
