// ==UserScript==
// @name           IMDB Omnipresent Ratings
// @namespace      *
// @description    Add ratings on artists page at the cost of one http request
// @include        http://imdb.tld/name/nm*/
// @include        http://*.imdb.tld/name/nm*/
// ==/UserScript==

// ==UserVariables==
var goodMovie  = 8 // Minimum rating for a bold font display
// ==/UserVariables==

var ratingsUrl = window.location.href + "filmorate"
var hostUrl    = "http://" + window.location.host

// Associative array to contain all ratings; indexed by movie absolute url
var ratings = new Object()

GM_xmlhttpRequest({
   method: 'get',
   headers: {'Referer': 2.0, Version: 2.0, 'Accept': 'text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
   url: ratingsUrl,
   onload: function(responseDetails) {
      if (responseDetails.status == 200) {
	     var regex = /<li>.?(\d{1,2}[\.,]\d)\d.? - <a href="(\/title\/tt\d{7}\/)">/gi
		 while ((m = regex.exec(responseDetails.responseText)) != null) {
		    ratings[hostUrl + m[2]] = m[1]
	     }
		 displayRatings()
      }
   }
});

function displayRatings() {
	var links = document.links;
	for (i = 0; i < links.length; i++) {
	   if (/\/title\/tt\d{7}\/$/.test(links[i].href) && links[i].textContent != "") {
	      var rating = ratings[links[i].href]
		  var element
		  parseFloat(rating)>=goodMovie ? element="b" : element="span"
		  links[i].parentNode.insertBefore(document.createElement(element), links[i]).innerHTML = rating ? "[" + rating + "] " : ""
	   }
	}
}