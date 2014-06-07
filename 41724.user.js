// ==UserScript==
// @name           IMDB Ratings on Tesco DVD Rental
// @namespace      www.georgenixon.co.uk
// @description    Adds ratings from IMDB to films in Tesco DVD Rental
// @include        http://www.tescodvdrental.com/*
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

//main
//list mode
checkedULs = new Array();
ULs = document.getElementsByTagName("UL");
for (i = 0; i < ULs.length; i++){
	//Tesco DVD Rental.com sometimes displays divs with the same ID twice on a page... naughty!
	var checkedBefore = false;
	if (ULs[i].id.search(/ajaxItemRow/) == 0) {
		for (j = 0; j < checkedULs.length; j++){
			if (checkedULs[j] == ULs[i].id){
				checkedBefore = true;
			}
		}
		if (checkedBefore == false) {
			checkedULs.push(ULs[i].id);
			currentTitle = ULs[i].childNodes[3].childNodes[3].textContent;
			currentYear = ULs[i].childNodes[3].childNodes[5].innerHTML.substr(1, 4);
			  url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + currentTitle + "%20" + "(" + currentYear + ")" + '+site:imdb.com';
			
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
						title = document.getElementById(rating.index).childNodes[3].childNodes[3].firstChild;
						title.textContent = "(IMDB: " + rating.rating + ") " + title.textContent;
					});
				  }
			  }
			});
		}
	}
} 
//film profile page mode
H1 = document.getElementsByTagName("H1")[1];
currentTitle = H1.firstChild.nodeValue;
currentYear = H1.childNodes[1].innerHTML.substr(1, 4);
url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + currentTitle + "%20" + "(" + currentYear + ")" +'+site:imdb.com';
			
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
						title = document.getElementsByTagName("H1")[1].firstChild;
						title.nodeValue = "(IMDB: " + rating.rating + ") " + title.nodeValue;
						TitleBaseNode = document.getElementsByTagName("H1")[1];
						link = document.createElement('A');
						link.innerHTML='Go to IMDB profile >>';
						link.href= url2;
						TitleBaseNode.appendChild(link);
					});
				  }
			  }
			});