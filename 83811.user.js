// ==UserScript==
// @name           IMDB Ratings in norwegian Lovefilm
// @namespace      Lovefilm
// @description    Adds ratings from IMDB to films in norwegian Lovefilm.no
// @include        http://www.lovefilm.no/*
// @version        1.0
//
// Based on the script named "IMDB ratings in Lovefilm", that is based on Keyvan Minoukadeh's Imdb Rating on Pirate Bay and NfoHump (http://userscripts.org/scripts/show/38682),
// which itself borrows from Julien Couvreur's Inline IMDB Ratings (http://userscripts.org/scripts/show/11360)
// It also differentiate films of the same name by year, and adds a link to imdb profile on a dvd's main page
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

TDs = document.getElementsByTagName("td");
for (i = 0; i < TDs.length; i++){

	if (TDs[i].className != null && TDs[i].className.search(/movieListCellText/) == 0) {
		
		currentTitleChunk = TDs[i].childNodes[1];
		TDs[i].id = "titletd_" + i;
		currentTitle = currentTitleChunk.innerHTML;
		currentYear = TDs[i].innerHTML.substr(TDs[i].innerHTML.search(/\(\d{4}\)/)+1, 4);
		
		url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + currentTitle + "%20" + "(" + currentYear + ")" +'+site:imdb.com';
		
		GM_xmlhttpRequest({
		  method:"GET",
		  index:TDs[i].id,
		  url:url1,
		  onload:function(details) {
			  var res;
			  res = eval('(' + details.responseText + ')');
			  url2 = res.responseData.results[0].unescapedUrl;
			  if (findImdbID(url2) != null) {
				  getMovieInfo(url2, this.index, function(rating) {
					title = document.getElementById(rating.index).childNodes[1];
					title.innerHTML = "(IMDB: " + rating.rating + ") " + title.innerHTML;
				
				});
			  }
		  }
		});
	}

} 

movieView = document.getElementById("movieView");
if (movieView != null)
{
	title = movieView.childNodes[1].childNodes[0];
	currentTitle = title.innerHTML;
	text = movieView.childNodes[1].childNodes[2].innerHTML;
	currentYear = text.substr(text.search(/\d{4}/), 4);

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
				title.innerHTML = "(IMDB: " + rating.rating + ") " + title.innerHTML;
				TitleBaseNode = title.parentNode;
				link = document.createElement('A');
				link.innerHTML=' Go to IMDB profile >>';
				link.href= url2;
				TitleBaseNode.appendChild(link);
			});
		  }
	  }
	});
	
}