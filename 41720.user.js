// ==UserScript==
// @name           IMDB Ratings in Lovefilm
// @namespace      www.georgenixon.co.uk
// @description    Adds ratings from IMDB to films in Lovefilm
// @include        http://www.lovefilm.com/*
//
// Based on Keyvan Minoukadeh's Imdb Rating on Pirate Bay and NfoHump (http://userscripts.org/scripts/show/38682),
// which itself borrows from Julien Couvreur's Inline IMDB Ratings (http://userscripts.org/scripts/show/11360)
// v1.2 Now can differentiate films of the same name by year, and adds a link to imdb profile on a dvd's main page
// v1 first release
// ==/UserScript==

function findImdbID(url) {
  var m = url.match(/^http:\/\/(.*\.)?imdb.com\/title\/(tt\d*)/i);
  if (m) return m[2];
  return null;
}

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

function extractMovieInfo(content, index) {
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var match = content.match(/<b>(\d.\d)\/10<\/b>/);
  var match2 = content.match(/([\d,]+ votes)/);
  return { rating: match[1], index: index, votecount: ""+match2[1] };
}

ULs = document.getElementsByTagName("UL");
for (i = 0; i < ULs.length; i++){

	if (ULs[i].id.search(/ajaxItemRow/) == 0) {
		currentTitleChunk = ULs[i].childNodes[3].childNodes[1].childNodes[1];
		if (currentTitleChunk.tagName != "STRONG"){
			currentTitle = currentTitleChunk.innerHTML;
			currentYear = ULs[i].childNodes[3].childNodes[1].childNodes[3].innerHTML.substr(1, 4);
			  url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + currentTitle + "%20" + "(" + currentYear + ")" +'+site:imdb.com';
			
			GM_xmlhttpRequest({
			  method:"GET",
			  index:ULs[i].id,
			  url:url1,
			  onload:function(details) {
				  var res;
				  res = eval('(' + details.responseText + ')');
				  url2 = res.responseData.results[0].unescapedUrl;
				  if (findImdbID(url2) != null) {
					  getMovieInfo(url2, this.index, function(rating) {
						title = document.getElementById(rating.index).childNodes[3].childNodes[1].childNodes[1];
						title.innerHTML = "(IMDB: " + rating.rating + ") " + title.innerHTML;
					
					});
				  }
			  }
			});
		}
	}
} 

H1 = document.getElementsByTagName("H1")[0];
currentTitle = H1.firstChild.nodeValue.replace(/on DVD/, '');
currentYear = H1.childNodes[1].innerHTML.substr(1, 4);
//alert(currentTitle + " " + currentYear);
url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + currentTitle + "%20" + "(" + currentYear + ")" + '+site:imdb.com';
			
			GM_xmlhttpRequest({
			  method:"GET",
			  index:"",
			  url:url1,
			  onload:function(details) {
				  var res;
				  res = eval('(' + details.responseText + ')');
				  url2 = res.responseData.results[0].unescapedUrl;
				  if (findImdbID(url2) != null) {
					  getMovieInfo(url2, this.index, function(rating) {
						title = document.getElementsByTagName("H1")[0].firstChild;
						title.nodeValue = "(IMDB: " + rating.rating + ") " + title.nodeValue;
						TitleBaseNode = document.getElementsByTagName("H1")[0];
						link = document.createElement('A');
						link.innerHTML='Go to IMDB profile >>';
						link.href= url2;
						TitleBaseNode.appendChild(link);
					});
				  }
			  }
			});