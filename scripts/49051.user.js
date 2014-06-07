// ==UserScript==
// @name           The Flick Zone - IMDB ratings
// @namespace      !Unreal
// @description    Finds IMDB ratings for movies on The Flick Zone
// @include        http://www.theflickzone.com/2008-2009-newest-movies/*
// @include        http://www.theflickzone.com/2006-2007/*
// @include        http://www.theflickzone.com/2005-2004/*
// @include        http://www.theflickzone.com/2003-earlier/*
// ==/UserScript==
function scanLinks() {
  var links = getLinks();
  for (var i=0; i < links.length; i++){
          insertImdbNode(links[i]);
   }
}

function insertImdbNode(linkz) {
  getMovieInfo(linkz, function(movieInfo) {
    var imdbNode = unsafeWindow.document.createElement('span');

    imdbNode.innerHTML = '(' + movieInfo.rating + '/10 ' + '<a href="' +makeMovieUrl(linkz.textContent) +'" target="_blank"><img src="http://i41.tinypic.com/2m6jq6w.png" alt="Go to IMDB page.." border="0"/></a>)';
    imdbNode.style.paddingLeft = "5px";
    imdbNode.style.paddingRight = "5px";
    linkz.parentNode.insertBefore(imdbNode, linkz.nextSibling); 
  });
}


function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
	if (doc_links[i].href.match(/theflickzone/))
		links.push(doc_links[i]);
   }

   return links;
}

function makeMovieUrl(movietitle) {
  return 'http://www.imdb.com/find?q='+ movietitle +';s=tt;site=aka';
}

function getMovieInfo(lnk, callback) {
  var url = makeMovieUrl(lnk.textContent);

  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(details) {
      callback(extractMovieInfo(details.responseText));
    }
  });
}

function extractMovieInfo(content) {
  var rat = content.match(/<b>(\d.\d)\/10<\/b>/);

  return { rating: rat[1] };
}


scanLinks();