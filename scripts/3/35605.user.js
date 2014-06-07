// ==UserScript==
// @name            katz IMDB ratings
// @namespace       by borisz@itheaven.co.il
// @description     Inserts rating values next to the download links. (Takes a few sec to appear after the page is fully loaded).
// @include         http://movies.katz.cd/*
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

    imdbNode.innerHTML = '[' + movieInfo.rating + '/10 ' + '<a href="' +makeMovieUrl(linkz.textContent) +'" target="_blank">IMDB</a>]';
    imdbNode.style.paddingLeft = "5px";
    imdbNode.style.paddingRight = "5px";
    linkz.parentNode.insertBefore(imdbNode, linkz.nextSibling); 
  });
}


function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
	if (doc_links[i].href.match(/download\b/))
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
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var rat = content.match(/<b>(\d.\d)\/10<\/b>/);

  return { rating: rat[1] };
}


scanLinks();

