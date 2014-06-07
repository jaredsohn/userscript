// ==UserScript==
// @name          Netflix: IMDB + Rotten Ratings and Links
// @namespace     http://userscripts.org/users/93326
// @description	  Adds info from IMDB and Rotten to Netflix pages
// @include       http://www.netflix.com/Movie/*
// @include       http://www.netflix.com/WiMovie*

// Based on David Gotz's Netflix Customization: Adding IMDB and Rotten Tomatoes Links (http://userscripts.org/scripts/show/10079)

// ==/UserScript==

//GM_IMDB_Div.innerHTML = ''
//ratingsdiv.innerHTML = ''

var ratingsdiv = document.getElementById('avgratings');

if (ratingsdiv != null) {
  var htmlcode = ratingsdiv.innerHTML;
  
var IMDB_icon = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAYAAAB24g05AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAABGdB' +
	'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAu0lE' +
	'QVR42mL8DwQMYMDIQBqAaAMIIBa45rNppOk3ZgQbAhBATAjNs6AyRNJgPYwMAAHEBLOZ1YIFJ81qMQ/I' +
	'QlaHMAQggJgQJiMARAMC/D6RhCKGbAhAADHBTEbXgA9ADIS4ECCAmFD9hx2AbIcYOguNz8AAEECM/8+k' +
	'/UdVPosB4SpkNjqAyAEEEBPEb7MIaMYWE2lglwAEECMoIbGysqL5m7ArwN74/ZsBIIAYYSkRZAgpAKQZ' +
	'BAACDABFGEQjVBKm/gAAAABJRU5ErkJggg==';



var Rotten_icon = 'data:image/gif;base64,R0lGODlhEAAQALMAAFViHKY0F9c7FJdiHPtGF/51VDuIJlahLYmJJ/6Ia////wAAAP///wAAAAAAAAAAACH5BAEAAAwALAAAAAAQABAAAARdkMlJq2WpFHJnyhvBXZpIHKIgVIkpHoOAjNKXHviAoKsUCoQBAGcAqHoulRAACBwlQNNgcDAEDNaAJCVyHprfgJYBVBFUgaZAPHGWj+40xXk+rtkVsX7f2es7gBQRADs=';


var MetaCritic_icon ='data:image/gif;base64,'+
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
    'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA';




///////////
  var rottenTomatoesName = document.title.substring(9,document.title.length).toLowerCase().replace(/ /g,'_').replace(/:/g,'');
  var prefix = rottenTomatoesName.substr(0,4);
  if ('the_' == prefix) {
    rottenTomatoesName = rottenTomatoesName.substr(4, rottenTomatoesName.length-4);
    }
///////////



}



//////////////////////////////
//IMDB CODE STARTS HERE//
//////////////////////////////



var addedDiv_IMDB = document.createElement('div');


addedDiv_IMDB.innerHTML = "<br>" + '<div class="fl">\n<P><span class="label"><img src="' + IMDB_icon + '" alt="IMDB"><B> Rating:</B></span>\n <span class="content" id="imdb_rating">checking...</span></p></div>';



addedDiv_IMDB.setAttribute('id','addedDiv_IMDB');




document.getElementById('avgratings').appendChild(addedDiv_IMDB);


const $xpath = '//div[@class="movie_info_area"]/h1/text()';
var $nodes = document.evaluate($xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);




var title = rottenTomatoesName


var IMDB_rating_span = document.getElementById('imdb_rating');


title = rottenTomatoesName.replace(/_/g, " ");

url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + '+site:imdb.com';


//////////////////////////////

GM_xmlhttpRequest({
	method:"GET",
	url:url1,
	onload:function(details) {
		var res;
		res = eval('(' + details.responseText + ')');
		url2 = res.responseData.results[0].unescapedUrl;

		if (findImdbID(url2) == null) {
			IMDB_rating_span.innerHTML = "IMDB entry not found" + "<a href=\"http://www.imdb.com/search\">...</a>"
			}

		if (findImdbID(url2) != null) {
			getMovieInfo(url2, this.index, function(rating) { 
			var IMDB_rating_span = document.getElementById('imdb_rating');

			//GM_log("rating: "+rating.rating);


var IMDB_rate = rating.rating;


IMDB_rating_span.innerHTML = IMDB_rate + " / 10" + "<br>" + "(" + rating.votecount +")" + "<a href= '" + url2 + "'>...</a>";


			});
		}
	}
});

//////////////////////////////




//////////////////////////////
// the three functions below have been borrowed from Julien Couvreur's 
// Inline IMDB Ratings: http://userscripts.org/scripts/review/11360
//////////////////////////////

function findImdbID(url) {
	var m = url.match(/^http:\/\/(.*\.)?imdb.com\/title\/(tt\d*)/i);
	if (m) return m[2];
	return null;
}
///////////

function getMovieInfo(imdbUrl, index, callback) {
	var url = imdbUrl;
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(details) {
			callback(extractMovieInfo(details.responseText, index));
		}
	});
}
///////////

function extractMovieInfo(content, index) {
	// <b>User Rating:</b> 
	// <b>2.1/10</b> 
	var match = content.match(/<b>(\d.\d)\/10<\/b>/);

  var match2 = content.match(/([\d,]+ votes)/);
  return { rating: match[1], index: index, votecount: ""+match2[1] };

	//return { rating: match[1], index: index };
}

//////////////////////////////
//IMDB CODE ENDS HERE//
//////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
//ROTTEN CODE STARTS HERE//
//////////////////////////////




var addedDiv_ROTTEN = document.createElement('div');

var score_html = "n/a";

var rotten_rating_text = '';

addedDiv_ROTTEN.innerHTML = '<div class="fl">\n<P> <span class=""content" id="ROTTEN_rating"><img src="' + Rotten_icon + '" alt="RotTom"> <B> Rating:</B> checking...</span></p></div>';


addedDiv_ROTTEN.setAttribute('id','greaseTextRotten');
addedDiv_ROTTEN.setAttribute('class','info');

document.getElementById('avgratings').appendChild(addedDiv_ROTTEN);


var ROTTEN_rating_span = document.getElementById('ROTTEN_rating');



//var findPattern = "//div[@class='info']";
//var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
//var link = results.snapshotItem(0);


var rottenTomatoesURL = "http://www.rottentomatoes.com/m/" + rottenTomatoesName ;


//////////////////////////////

GM_xmlhttpRequest({
	method: 'GET',
	url: rottenTomatoesURL,
	onload: function(response) {


		var doc = document.createElement('div');
		doc.innerHTML = response.responseText;

		var findPattern = "//div[@id='tomatometer_data']/p";
		var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );



		if (results.snapshotItem(3) == null)
		{

ROTTEN_rating_span.innerHTML = '<img src="' + Rotten_icon + '" alt="RotTom">' + " Rotten entry not found" + "<a href=\"http://www.rottentomatoes.com/search\">...</a>"


		}

		if (results.snapshotItem(3) != null)
		{
			var average_html = results.snapshotItem(3).innerHTML;


			if (average_html != "")
			{
				average_html = "<span id='gm_rotten_average_html' style='font-size:smaller'>("+average_html+")</span>";
			}
		} // end if tomatometer_data not null

		var findPattern = "//div[@id='tomatometer_score']/span";
		var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		if (results.snapshotItem(0) != null)
		{
			var score_html = results.snapshotItem(0).innerHTML;
			if (score_html == "N/A") {
				score_html = "n/a";
				Rotten_icon = '';
				rotten_rating_text = '';
			}
			else {
				if (parseInt(score_html) >= 60) { // it's fresh

					Rotten_icon = 'data:image/gif;base64,R0lGODlhEAAQALMAAFViHKY0F9c7FJdiHPtGF/51VDuIJlahLYmJJ/6Ia////wAAAP///wAAAAAAAAAAACH5BAEAAAwALAAAAAAQABAAAARdkMlJq2WpFHJnyhvBXZpIHKIgVIkpHoOAjNKXHviAoKsUCoQBAGcAqHoulRAACBwlQNNgcDAEDNaAJCVyHprfgJYBVBFUgaZAPHGWj+40xXk+rtkVsX7f2es7gBQRADs=';
					rotten_rating_text = "Fresh";
				}
				else { // it's rotten

					Rotten_icon = 
'data:image/gif;base64,R0lGODlhEAAQANUAAECdJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///yH5BAEAAD8ALAAAAAAQABAAAAY2wJ/wBygOj0hiEZBMLpnN43O4pBqrSqwW+uQas1PptRvtQstm59e83jLJ2Kz1K6bT6+eoPBkEADs=';
					rotten_rating_text = "Rotten";

				}
				score_html = score_html + "%";
			}
			// found a rotten_rating
			if ( score_html == -1)
			{

				ratingsdiv.innerHTML = htmlcode + '<h5>Rotten Tomatoes:</h5>\nNot enough reviews for a rating\n';
				addedDiv_ROTTEN.style.color='black';
			}
			else { // best default case


		ROTTEN_rating_span.innerHTML = ' \n <IMG SRC=' + Rotten_icon + '>\n'+ '<B> Rating: </B>' + score_html + '<br>' + average_html +'\n' + "<a href=\"http://www.rottentomatoes.com/m/"+rottenTomatoesName+"/\">...</a>" ;



				addedDiv_ROTTEN.style.color='black';
			}
		} // end if tomatometer_score not null
		else {
			// did not find rotten_rating
			var addedDiv_ROTTEN = document.getElementById('greaseTextRotten');
			const $xpath = '//div[@id="tn15title"]/h1/text()';
			var $nodes = document.evaluate($xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			var movieName = escape($nodes.singleNodeValue.data.replace(/\s+$/, ''));
			googleRottenTomatoesFallbackURL = "http://www.google.com/search?q=" + "intitle%3A%22" + movieName + "%22+" + "site%3Arottentomatoes.com";
			ratingsdiv.innerHTML = htmlcode + '\nUnable to find\n';
			addedDiv_ROTTEN.style.color='red';
		}
	}

});

//////////////////////////////
//ROTTEN CODE ENDS HERE//
//////////////////////////////


//////////////////////////////
//METACRITIC CODE STARTS HERE//
//////////////////////////////



var addedDiv_METACRITIC = document.createElement('div');


addedDiv_METACRITIC.innerHTML = '<div class="fl">\n<P> <img src="http://www.metacritic.com/favicon.ico"> <B> Rating:</B> <span class=""content" id="METACRITIC_rating"> checking... </span></p></div> <span class=""content" id="METACRITIC_score"></span>'; 





addedDiv_METACRITIC.setAttribute('id','greaseTextMetaCritic');
addedDiv_METACRITIC.setAttribute('class','info');

document.getElementById('avgratings').appendChild(addedDiv_METACRITIC);


var METACRITIC_rating_span = document.getElementById('METACRITIC_rating');

var METACRITIC_score_span = document.getElementById('METACRITIC_score');




titleNOspaces = rottenTomatoesName.replace(/_/g, '');


var MetaCriticURL = "http://www.metacritic.com/film/titles/" + titleNOspaces ;






//////////////////////////////

GM_xmlhttpRequest({
	method: 'GET',
	url: MetaCriticURL,
	onload: function(response) {


		var doc = document.createElement('div');
		doc.innerHTML = response.responseText;

		var findPattern = '//div[@id="metascore"]';
		var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


		var doc2 = document.createElement('div');
		doc2.innerHTML = response.responseText;

		var findPattern2 = '//span[@class="userscore"]';
		var results2 = document.evaluate(findPattern2, doc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );




		if (results.snapshotItem(0) == null)
		{

METACRITIC_rating_span.innerHTML = "Metacritic entry not found" + "<a href=\"http://www.metacritic.com/search/index.shtml\">...</a>"

METACRITIC_score_span.innerHTML = "" // rottenTomatoesName + title //


		}

		if (results.snapshotItem(0) != null)
		{
			var metascore_html = results.snapshotItem(0).innerHTML;

			var userscore_html = results2.snapshotItem(0).innerHTML;


					METACRITIC_rating_span.style.fontFamily='Arial,Helvetica,sans-serif';
					METACRITIC_rating_span.style.fontSize='18px';


					if (metascore_html >= 81) {
						METACRITIC_rating_span.style.backgroundColor='#33CC00';
					} // end if 81 - 100

					else if (metascore_html >= 61) {
						METACRITIC_rating_span.style.backgroundColor='#33CC00';
						//addedMetaCriticResult.title='Generally Favorable Reviews';
					} // end if 61 - 80

					else if (metascore_html >= 40) {
						METACRITIC_rating_span.style.backgroundColor='#FFFF00';
						//addedMetaCriticResult.title='Mixed or Average Reviews';
					} // end if 40 - 60

					else if (metascore_html >= 20) {
						METACRITIC_rating_span.style.color='#FFFFFF';
						METACRITIC_rating_span.style.backgroundColor='#FF0000';
						//addedMetaCriticResult.title='Generally Unfavorable Reviews';
					} // end if 20 - 39

					else {
						METACRITIC_rating_span.style.color='#FFFFFF';
						METACRITIC_rating_span.style.backgroundColor='#FF0000';
						//addedMetaCriticResult.title='Overwhelming Dislike';
					} // end if 0 - 19





METACRITIC_rating_span.innerHTML = "<B>" + metascore_html + "</B>" + "%" 

METACRITIC_score_span.innerHTML = "(User Score: " + userscore_html + "/10) " + "<a href=\"http://www.metacritic.com/film/titles/" + rottenTomatoesName + "/\">...</a>"




//METACRITIC_rating_span.innerHTML = average_html 


		} 


	}
});






//////////////////////////////
//METACRITIC CODE ENDS HERE//
//////////////////////////////

//////////////////////////////
//FLIXTER CODE STARTS HERE//
//////////////////////////////



var addedDiv_FLIXTER = document.createElement('div');


addedDiv_FLIXTER.innerHTML = '<div class="fl">\n<P> <img src="http://www.flixster.com/favicon.ico"> <B> Rating:</B> <span class=""content" id="FLIXTER_users"> checking... </span></p></div> <span class=""content" id="FLIXTER_critics"></span>'; 





addedDiv_FLIXTER.setAttribute('id','greaseTextFLIXTER');
addedDiv_FLIXTER.setAttribute('class','info');

document.getElementById('avgratings').appendChild(addedDiv_FLIXTER);


var FLIXTER_users_span = document.getElementById('FLIXTER_users');

var FLIXTER_critics_span = document.getElementById('FLIXTER_critics');




//titleNOspaces = rottenTomatoesName.replace(/_/g, '');

titleDashes = rottenTomatoesName.replace(/_/g, '-');


var FLIXTERURL = "http://www.flixster.com/movie/" + titleDashes ;


//http://www.flixster.com/movie/the-imaginarium-of-doctor-parnassus



//////////////////////////////

GM_xmlhttpRequest({
	method: 'GET',
	url: FLIXTERURL,
	onload: function(response) {


		var doc = document.createElement('div');
		doc.innerHTML = response.responseText;

		var findPattern = '//span[@class="rating percentage"]';
		var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


		var doc2 = document.createElement('div');
		doc2.innerHTML = response.responseText;

		var findPattern2 = '//span[@class="percentage"]';
		var results2 = document.evaluate(findPattern2, doc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );



		if (results.snapshotItem(0) == null)
		{

FLIXTER_users_span.innerHTML = "Flixter entry not found" + "<a href=\"http://www.flixster.com/search\">...</a>"

FLIXTER_critics_span.innerHTML = "" // rottenTomatoesName + title //


		}

		if (results.snapshotItem(0) != null)
		{
			var usersscore_html = results.snapshotItem(0).innerHTML;

			var criticsscore_html = results2.snapshotItem(0).innerHTML;

			/*
					FLIXTER_users_span.style.fontFamily='Arial,Helvetica,sans-serif';
					FLIXTER_users_span.style.fontSize='18px';


					if (usersscore_html >= 81) {
						FLIXTER_users_span.style.backgroundColor='#33CC00';
					} // end if 81 - 100

					else if (usersscore_html >= 61) {
						FLIXTER_users_span.style.backgroundColor='#33CC00';
						//addedMetaCriticResult.title='Generally Favorable Reviews';
					} // end if 61 - 80

					else if (usersscore_html >= 40) {
						FLIXTER_users_span.style.backgroundColor='#FFFF00';
						//addedMetaCriticResult.title='Mixed or Average Reviews';
					} // end if 40 - 60

					else if (usersscore_html >= 20) {
						FLIXTER_users_span.style.color='#FFFFFF';
						FLIXTER_users_span.style.backgroundColor='#FF0000';
						//addedMetaCriticResult.title='Generally Unfavorable Reviews';
					} // end if 20 - 39

					else {
						FLIXTER_users_span.style.color='#FFFFFF';
						FLIXTER_users_span.style.backgroundColor='#FF0000';
						//addedMetaCriticResult.title='Overwhelming Dislike';
					} // end if 0 - 19

			*/






FLIXTER_users_span.innerHTML = "(User Score: " + usersscore_html + ")" 

FLIXTER_critics_span.innerHTML = "(Critics Score: " + criticsscore_html + ")" + "<a href=\"http://www.flixster.com/movie/" + rottenTomatoesName + "/\">...</a>"




//METACRITIC_rating_span.innerHTML = average_html 


		} 


	}
});




//////////////////////////////
//FLIXTER CODE ENDS HERE//
//////////////////////////////




//////////////////////////////
//IMDB TECH CODE STARTS HERE//
//////////////////////////////


	var div = document.createElement("div");
	var wpLink1 = document.createElement("a");

	//wpLink1.href = 'http://www.imdb.com/search\'
	//wpLink1.style.marginRight = "70px";
	//wpLink1.title = "Technical Specs:";


	wpLink1.innerHTML = '<BR><BR> <P> <img src="' + IMDB_icon + '" alt="IMDB"> <span class="content" id="imdb_techspec"> <b>Technical Specs: </b> checking... </span> </p>';

	div.appendChild(wpLink1);


document.getElementById('avgratings').appendChild(div);

var imdb_techspec_span = document.getElementById('imdb_techspec');


url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + '+site:imdb.com';


//////////////////////////////

GM_xmlhttpRequest({
	method:"GET",
	url:url1,
	onload:function(details) {
		var res;
		res = eval('(' + details.responseText + ')');
		url2 = res.responseData.results[0].unescapedUrl;



		if (url2 == null) {

			imdb_techspec_span.innerHTML = "<a href=\"http://www.imdb.com/search\"> IMDB entry not found </a>";


		}

		if (url2 != null) {
			imdb_techspec_span.innerHTML = "<a href= '" + url2 + 'technical'+ "'> <b>Technical Specs: </b> </a>";

		}



	}
});




//////////////////////////////


//////////////////////////////
//IMDB TECH CODE ENDS HERE//
//////////////////////////////




//////////////////////////////
//WIKIPEDIA CODE STARTS HERE//
//////////////////////////////


	var wpLink2 = document.createElement("a");
	//wpLink2.href = 'http://en.wikipedia.org/wiki/Special:Search?search=' + title;

	//wpLink2.style.marginRight = "70px";
	//wpLink2.title = "Wikipedia";

	//wpLink2.innerHTML = '<P><img src="http://en.wikipedia.org/favicon.ico" > <a href= '" + url2 + 'technical'+ "'><b>Wikipedia: </b> checking... </a></P>';



	wpLink2.innerHTML = '<P> <img src="http://en.wikipedia.org/favicon.ico" > <span class="content" id="wiki_techspec"> <b>checking... </b> </span> </p>';


// "<a href=\"http://en.wikipedia.org/wiki/Special:Search?search=" + title + "/\">



	div.appendChild(wpLink2);


	document.getElementById('avgratings').appendChild(div);


	var wiki_techspec_span = document.getElementById('wiki_techspec');


	wiki_techspec_span.innerHTML = "<a href=\"http://en.wikipedia.org/wiki/Special:Search?search=" + title + "/\"> <b>Wikipedia:  </b> </a>";



//////////////////////////////
//WIKIPEDIA CODE ENDS HERE//
//////////////////////////////



//////////////////////////////
//BOX OFFICE MOJO CODE STARTS HERE//
//////////////////////////////


var addedDiv_BOXOFFICEMOJO = document.createElement('div');


addedDiv_BOXOFFICEMOJO.innerHTML = '<div class="fl">\n<P> <img src="http://www.boxofficemojo.com/favicon.ico" WIDTH=20 HEIGHT=20 > <span class="content" id="BOXOFFICEMOJO_users"> <B> Box Office Mojo:</B> </span></p></div>'; 





addedDiv_BOXOFFICEMOJO.setAttribute('id','greaseTextBOXOFFICEMOJO');
addedDiv_BOXOFFICEMOJO.setAttribute('class','info');

document.getElementById('avgratings').appendChild(addedDiv_BOXOFFICEMOJO);


var BOXOFFICEMOJO_users_span = document.getElementById('BOXOFFICEMOJO_users');




titleNOthe = rottenTomatoesName.replace(/the/g, '');


var BOXOFFICEMOJOURL = "http://boxofficemojo.com/movies/?id=" + titleNOthe + ".htm";


//BOXOFFICEMOJO_users_span.innerHTML = BOXOFFICEMOJOURL 


//<img src="http://www.boxofficemojo.com/favicon.ico">

	BOXOFFICEMOJO_users_span.innerHTML = "<a href = '" + BOXOFFICEMOJOURL + "'> <b>Box Office Mojo: </b> </a>";


//addedDiv_BOXOFFICEMOJO.href = BOXOFFICEMOJOURL

/*


//////////////////////////////

GM_xmlhttpRequest({
	method: 'GET',
	url: BOXOFFICEMOJOURL,
	onload: function(response) {


		var doc = document.createElement('div');
		doc.innerHTML = response.responseText;


	//	var innerFindPattern = "table//tr//td//table//tbody//tr//td//font//span";

		var findPattern = '//td[@width="35%"]';

//td width="35%"

	//	var findPattern = '//font[@size="1"]/text()';

	//	var findPattern = '//td[@bgcolor="#ffffff"] , font[@size="1"]/text()';
	//	var findPattern = '//td[@bgcolor="#ffffff" and font[@size="1"]';

		var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


// <td bgcolor="#ffffff">B-<font size=1> (3584 votes)</td>
//var findPattern = "//div[@id='friend_connect']//input[@class='inputbutton' and @value='Confirm']";


		//var doc2 = document.createElement('div');
		//doc2.innerHTML = response.responseText;

		//var findPattern2 = '//span[@class="percentage"]';
		//var results2 = document.evaluate(findPattern2, doc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );



		if (results.snapshotItem(0) == null)
		{

BOXOFFICEMOJO_users_span.innerHTML = "Box Office Mojo entry not found" + "<a href=\"http://boxofficemojo.com/movies/alphabetical.htm">...</a>"



		}

		if (results.snapshotItem(0) != null)
		{
			var usersscore_html = results.snapshotItem(0).innerHTML;

			//var criticsscore_html = results2.snapshotItem(0).innerHTML;




BOXOFFICEMOJO_users_span.innerHTML = usersscore_html


//BOXOFFICEMOJO_users_span.innerHTML = "(User Score: " + usersscore_html + ")" 

//FLIXTER_critics_span.innerHTML = "(Critics Score: " + criticsscore_html + ")" + "<a href=\"http://www.flixster.com/movie/" + rottenTomatoesName + "/\">...</a>"





		} 


	}
});



*/


//////////////////////////////
//BOX OFFICE MOJO CODE ENDS HERE//
//////////////////////////////










