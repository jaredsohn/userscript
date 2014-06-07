// ==UserScript==
// @name	IMDB Expert Ratings
// @namespace	szkolnik.com
// @description	Extract expert ratings and display them inline to imdb links, based on the excellent script by Julien Couvreur  (http://userscripts.org/scripts/review/11360 - Inline IMDB ratings (from Aug 14, 2008))
// @include	*
// @exclude	http://*imdb.com/*
// ==/UserScript==

function scanLinks() {
  var links = getLinks();
  for (var i=0; i < links.length; i++){
      var link = links[i];
      var imdbID = findImdbID(link.href)
      if (imdbID) {
          insertImdbNode(link, imdbID);
      }
  }
}

function insertImdbNode(link, imdbID) {
  getMovieRatingInfo(imdbID, function(movieInfo) {
    var imdbNode = unsafeWindow.document.createElement('span');

//	var imdbLogoImage = "http://www.imdb.com/favicon.ico"

	var msg = "[";
//	msg += "<img src=\"" + imdbLogoImage + "\"/>"
	if( movieInfo.msg )
	{
		msg += "<a href=\"http://www.imdb.com/title/" + imdbID + "/\">";
		msg += movieInfo.msg;
		msg += "</a>";
	}
	else
	{
		msg += "<a href=\"http://www.imdb.com/title/" + imdbID + "/\">";
		msg += movieInfo.rating;
		msg	+= " by " + movieInfo.votes;
		msg += "</a>";
		msg += " ";
		msg += "<a href=\"http://www.imdb.com/title/" + imdbID + "/ratings/\">";
		msg	+= "(" + movieInfo.mean;
		msg	+= "|" + movieInfo.median + ")";
		msg += "</a>";
	}
	msg += "]";
	imdbNode.innerHTML = msg;
    imdbNode.style.paddingLeft = "5px";
    imdbNode.style.paddingRight = "5px";
    link.parentNode.insertBefore(imdbNode, link.nextSibling);
  });
}

function findImdbID(url) {
  var m = url.match(/http:\/\/(?:.+\.)?imdb\.(?:com|co\.\w\w)\/title\/(tt\d*)/i);

  if (m) return m[1];
  return null;
}

function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
       links.push(doc_links[i]);
   }
   return links;

   }

function makeMovieUrl(imdbID) {
  return "http://www.imdb.com/title/" + imdbID;
}

function makeMovieRatingUrl(imdbID) {
  return "http://www.imdb.com/title/" + imdbID + "/ratings";
}

function getMovieInfo(imdbID, callback) {
  var url = makeMovieUrl(imdbID);

  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(details) {
      callback(extractMovieInfo(details.responseText));
    }
  });
}

function getMovieRatingInfo(imdbID, callback) {
  var url = makeMovieRatingUrl(imdbID);

  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(details) {
      callback(extractMovieRatingInfo(details.responseText));
    }
  });
}

function extractMovieInfo(content) {
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var match = cont
  ent.match(/<b>(\d.\d)\/10<\/b>/);
  return { rating: match[1] };
}

function extractMovieRatingInfo(content) {
  var match = content.match(/<\/form><\/div><p>(\d{1,3}(?:,\d{3})*) IMDb users have given a <a.*>(\d{1,2}(?:\.\d){0,1})<\/a> \/ 10<\/p>.*<p>Arithmetic mean = (\d{1,2}(?:\.\d){0,1})\..+Median = (\d{1,2}(?:\.\d){0,1})<\/p>/);
  if( match )
	return { rating: match[2], votes: match[1], mean: match[3], median: match[4] };
	
  match = content.match(/5 or more/);
  if( match ) return { msg: "N/A" };
  return { msg: "err" };
}

scanLinks();