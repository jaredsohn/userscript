// ==UserScript==
// @name           Rotten Tomatoes on VCDQuality
// @namespace      http://userscripts.org/users/77913
// @description    Adds the Rotten Tomatoes Tomatometer score to VCDQuality movie listings.
// @version        1.2
// @include        http://vcdquality.*
// @include        http://*.vcdquality.*
// @include        http://vcdq.*
// @include        http://*.vcdq.*
// ==/UserScript==

function getTomatometer(link) {
    var linkStr = link.toString();
    var linkSpl = linkStr.split("?");
    var movieID = linkSpl[1];
    var rottenTomatoesURL = "http://www.rottentomatoes.com/alias?type=imdbid&s=" + movieID;
    
    GM_xmlhttpRequest({ 
    	method: 'GET', url: rottenTomatoesURL, onload: 
    	function(responseDetails) {
            var search_string_start = "tomatometer_score";
            var match = responseDetails.responseText.search(search_string_start);
            var rotten_rating = responseDetails.responseText.substring(match + 91, match + 96);
            var number_rotten_rating = parseInt(rotten_rating, 10);
            var rotten_rating_image_url, rotten_rating_text;

            if (number_rotten_rating.toString() == "NaN") {
                rotten_rating = "N/A";
            } else if (number_rotten_rating < 10) {
                rotten_rating = " " + number_rotten_rating + "%";
            } else {
                rotten_rating = number_rotten_rating + "%";
            }
            // the title is fresh
            if (number_rotten_rating >= 60) { 			
                rotten_rating_image_url = 'data:image/gif;base64,R0lGODlhCAAIANU3APAXIvlXL/EQIvtSLv+8XMxHQPYaI+0XI1OBOvf18fIYJeM+Ov+HPvP48LIxNXiDPO82P+pXYs6urs2YRsrVwJSnff8BH78bIC19NvZOVf/e4Pu/wvSBOoMMD/FRVeEbJeYgKLlCLPQfJc0yKpNNTcgmL/BJLKEjJoVkLvng4PQiIV2jUfEcIvJyNWeGO9E6KPm4u+wmJefm3cu4uNgeJcC+mvJQLP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADcALAAAAAAIAAgAAAYywJuwIizeVhhErbhAuR6hws0TmAxeI0smxiEwVAIRCGJq2QwKmuN2YAE+l04xUjqRhEEAOw==';
                rotten_rating_text = "Fresh";
            } 
            // the title is rotten
            else if (number_rotten_rating < 60) { 	
                rotten_rating_image_url = 'data:image/gif;base64,R0lGODlhCAAIANU4AF3bAFHmAIfwAP3+/Fm+JrDRrfv9+9/u24nxANz/AEy/B27aEi2xADGqFO/51PP83VfDN4voKGbhAFbeAI/Tg9Xxq8/lo5vlPnW7S5TkHZjzBLjobcroxWvUH4LHeFzbAK/Qp0LHB2mlYH3nAF26NZbClrTvTVuOSJmpmYClgNru2WrYAErPAHTZB9L/AEq6LcDxOtrk2tPtrle7Luz7sdXr1VTFAHqvdf///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAIAAgAAAYxQBwOlhEacSGG0IS7rHAvnCZww0E6C0BDJNx8WBOCUCBRjEitRMQjdGFwCJtxdjIGAQA7';
                rotten_rating_text = "Rotten";
            } 
            // the tomatometer score is unavailable
            else {
                rotten_rating_image_url = 'data:image/gif;base64,R0lGODlhCAAIANUuAHNzc2tra3V1dW5ubpOTk15eXnZ2dvT09I2NjW9vb8vLy2lpaXJycoODg5mZmdPT05aWluTk5Orq6lZWVoSEhD09PYeHh9jY2GhoaGZmZnh4eIaGhpWVlXFxcb+/v3l5eZKSknx8fLGxsba2tltbW+zs7GdnZ3R0dGpqaru7u4yMjHBwcE1NTYCAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC4ALAAAAAAIAAgAAAYyQJcQJCy6GCySqBgqmAKLj4tgQWwSAw1HQBg5BCsDgNJSNQynQMbVAQAGhUoRgppghEEAOw==';
                rotten_rating_text = "N/A";
            }
            link.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML += '&nbsp;&nbsp;&nbsp;' + rotten_rating + ' \n<a href="' + rottenTomatoesURL + '"><IMG SRC="' + rotten_rating_image_url + '" HEIGHT=9 ALT="' + rotten_rating_text + '" title="' + rotten_rating_text + '"></A>';
        }
    });
}

var allElements,thisElement;
var pattern = "//td[@class='no']/a";
allElements = document.evaluate(pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    var exp = new RegExp("^http:\/\/.+.imdb.com\/.itle.+[0-9]+$");
    if (exp.test(thisElement.href)) {
        getTomatometer(thisElement);
    }
}