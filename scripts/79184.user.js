// ==UserScript==
// @name            PassthePopcorn - IMDB ratings
// @author    applebananas
// @description    Inserts rating values next to all the imdb links that it finds.
// @include        http://*passthepopcorn.me/*
// @include        https://*passthepopcorn.me/*
// @exclude        http://www.imdb.com/title/*
// @exclude        http://akas.imdb.com/title/*
// @exclude        http://imdb.com/title/*
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
  getMovieInfo(imdbID, function(movieInfo) {
    var imdbNode = unsafeWindow.document.createElement('span');

    imdbNode.innerHTML = "<b>IMDb Rating</b>: " + movieInfo.rating + "/10" + " (" + movieInfo.votes + " votes)";
    imdbNode.style.paddingLeft = "5px";
    imdbNode.style.paddingRight = "5px";
    link.parentNode.insertBefore(imdbNode, link.nextSibling); 
  });
}

function findImdbID(url) {
  var m = url.match(/^http:\/\/(www.|akas.)?imdb.com\/title\/(tt\d*)/i);

  if (m) return m[2];
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

function extractMovieInfo(content) {
  
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var match = content.match(/<b>(\d.\d)\/10<\/b>/);
  var votesMatch = content.match(/<a href="ratings" class="tn15more">(.*) votes/);
  //return { rating: match[1] };
  return { rating: match[1], votes: votesMatch[1] };
}

scanLinks();