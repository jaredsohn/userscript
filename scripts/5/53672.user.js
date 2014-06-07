// ==UserScript==
// @name			IMDB - add Metacritic ratings
// @description    Add Metacritic ratings to IMDB page
// @author         Curtis Gibby
// @namespace		http://userscripts.org/users/6623/scripts
// @version			1.0
// @include			http://*.imdb.com/title/*/
// @include			http://*.imdb.com/title/*/#*
// @include			http://*.imdb.com/title/*/combined*
// @include			http://*.imdb.com/title/*/maindetails*
// @include			http://imdb.com/title/*/
// @include			http://imdb.com/title/*/#*
// @include			http://imdb.com/title/*/combined*
// @include			http://imdb.com/title/*/maindetails*
// ==/UserScript==

// ==User-Defined Variables==

//useMetaCriticColors = false;
useMetaCriticColors = true;

// ==/User-Defined Variables==

insertMCBase();
getResults(getMovieName(),0);

function getMovieAKA(){
	var findPattern = '//div[@class="info" and contains(.,"Also Known As")]';
	var results = document.evaluate(findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	if (results.snapshotItem(0) !== null) {
		var first_split = results.snapshotItem(0).innerHTML.split("</h5>");
		var second_split = first_split[1].split("(");
		var third_split = second_split[0].split("<br>");
		var movieAKA = third_split[0].trim();

		return movieAKA;	
	} //  not null
	else
		return "";
	
} // end function getMovieAKA

function getMovieName(includeYear) {
	
	if(includeYear == 1) {
		return encodeURIComponent(document.title);
	} // end if include year
	else {
		const $xpath = '//div[@id="tn15title"]/h1/text()';
		var $nodes = document.evaluate($xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return encodeURIComponent($nodes.singleNodeValue.data.replace(/\s+$/, ''));
	}// end else (! include year)
	
}

function getResults(movieName, alreadyTryingAKAs) {
	if(movieName != "") {
	
	GoogleAJAXURL = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site%3Ametacritic.com%3A%20" + movieName;
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: GoogleAJAXURL,
			onload: function(responseDetails) {
				var json = eval("(" +responseDetails.responseText+")");
				if(json.responseData.results[0])
					getMCRating(json.responseData.results[0].url, alreadyTryingAKAs);
				else if(alreadyTryingAKAs == 1) {
					ultimateFailure();
				}
				else
					getResults(getMovieAKA(), 1);
			}
		});
	
	} // end if movieName != ""
	else
		ultimateFailure();

} // end function getResults

function getMCRating(MC_url, alreadyTryingAKAs) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: MC_url,
		onload: function (response) {
			var addedMetaCriticResult = document.getElementById('greaseTextMetaCriticResult');
			var addedMCDiv = document.getElementById('greaseTextMetaCritic');
			
			doc = document.createElement('div');
			doc.innerHTML = response.responseText;
			
			findPattern = "//img[starts-with(@alt, 'Metascore')]";
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			
			if (results.snapshotItem(0) !== null) {			
				var theRating = results.snapshotItem(0).alt.split(": ");


				var metaCriticResult = parseInt(theRating[1]);
				
				if(useMetaCriticColors == true) {

					addedMetaCriticResult.style.fontWeight = 'bold';
					addedMetaCriticResult.style.paddingLeft = '3px';
					addedMetaCriticResult.style.paddingRight = '3px';
					addedMetaCriticResult.style.fontFamily='Arial,Helvetica,sans-serif';
					addedMetaCriticResult.style.fontSize='11px';

					if (metaCriticResult >= 81) {
						addedMetaCriticResult.style.backgroundColor='#33CC00';
						addedMetaCriticResult.title='Universal Acclaim';
					} // end if 81 - 100
					else if (metaCriticResult >= 61) {
						addedMetaCriticResult.style.backgroundColor='#33CC00';
						addedMetaCriticResult.title='Generally Favorable Reviews';
					} // end if 61 - 80
					else if (metaCriticResult >= 40) {
						addedMetaCriticResult.style.backgroundColor='#FFFF00';
						addedMetaCriticResult.title='Mixed or Average Reviews';
					} // end if 40 - 60
					else if (metaCriticResult >= 20) {
						addedMetaCriticResult.style.color='#FFFFFF';
						addedMetaCriticResult.style.backgroundColor='#FF0000';
						addedMetaCriticResult.title='Generally Unfavorable Reviews';
					} // end if 20 - 39
					else {
						addedMetaCriticResult.style.color='#FFFFFF';
						addedMetaCriticResult.style.backgroundColor='#FF0000';
						addedMetaCriticResult.title='Overwhelming Dislike';
					} // end if 0 - 19
					
				} // end if useMetaCriticColors
				addedMetaCriticResult.innerHTML = metaCriticResult;
				addedMCDiv.innerHTML = addedMCDiv.innerHTML+" <a class='tn15more inline' href='"+MC_url+"' title='metacritic link'>more</a>";
				
			} // end if (! null)
			else {
				if(alreadyTryingAKAs == 1) {
					ultimateFailure();
				}
				else
					getResults(getMovieAKA(), 1);
					// one more time!
					
			} //end else
			
		}
	});

} // end function getMCRating

function ultimateFailure() {
	var addedMetaCriticResult = document.getElementById('greaseTextMetaCriticResult');
	var addedMCDiv = document.getElementById('greaseTextMetaCritic');
	addedMetaCriticResult.innerHTML = "Unable to find";
	googleMetaCriticFallbackURL = "http://www.google.com/search?q=inurl%3Awww.metacritic.com/video/titles%20"+getMovieName(1);
	addedMCDiv.innerHTML = addedMCDiv.innerHTML+" <a class='tn15more inline' href='"+googleMetaCriticFallbackURL+"' title='Google search link'>more</a>";
} // end function ultimateFailure

function insertMCBase() {

	findPattern = "//div[@class='info']";
	results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	addedDivMetaCritic = document.createElement('div');
	addedDivMetaCritic.innerHTML = '<H5>metacritic:</H5>\n<span id="greaseTextMetaCriticResult">checking <img src="'+'data:image/gif;base64,'+
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
    'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'+'" alt ="checking"></span>';
	addedDivMetaCritic.setAttribute('id','greaseTextMetaCritic');
	addedDivMetaCritic.setAttribute('class','info');
	results.snapshotItem(0).parentNode.insertBefore(addedDivMetaCritic, results.snapshotItem(0));

} // end function insertMCBase