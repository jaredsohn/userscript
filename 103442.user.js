// ==UserScript==
// @name           The Pirate Bay + IMDB Ratings
// @description Adapted from http://userscripts.org/scripts/show/35126

// @include        http://thepiratebay.org/top/201
// @author         Joe Gonzalez
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @require        http://autobahn.tablesorter.com/jquery.tablesorter.min.js
// ==/UserScript==

// the three functions below have been borrowed from Julien Couvreur's 
// Inline IMDB Ratings: http://userscripts.org/scripts/review/11360
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
      callback(extractMovieInfo(details.responseText, index, url));
    }
  });
}

function extractMovieInfo(content, index, url) {
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var match = content.match(/<b>(\d.\d)\/10<\/b>/);
  var title = content.match(/<title>([^<]+)<\/title>/);
  return { rating: match[1], index: index, url: url, title: title[1] };
}

$(document).ready(function() {
		var title, re, found, url1, url2, res;
		$("#tableHead tr.header th").eq(0).html('<a id="sortButton" style="cursor: pointer;" title="sort by rating">IMDB</a>');
		$("#sortButton").click(function() {
			$("#searchResult").tablesorter({sortList: [[0,0],[5,0]]});
		});
		$("td.vertTh").text('...');
		$("td.vertTh + td").each(function(i) {
			$(this).parent().attr('id', 'row'+i);
			$(this).css('white-space', 'nowrap');
			title = $(this).text();
			// get rid of irrelevant text
			re = /([^\(\[]+)/i;
			found = title.match(re);
			title = found[0].replace(/\./g, "+");
			title = title.replace(/(PROPER|DVDSCR|unrated|XviD|screener|contempt|cam|kingben|bulldozer|FxM|aXXo|AKCPE|r3|dvdrip|PUKKA|r5|ltt|LINE Xvid)/gi, '');
			title = title.replace(/ /g, "+");
			url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + '+site:imdb.com';
			
			GM_xmlhttpRequest({
			  method:"GET",
			  index:i,
			  url:url1,
			  onload:function(details) {
				  var res;
				  res = eval('(' + details.responseText + ')');
				  url2 = res.responseData.results[0].unescapedUrl;
				  if (findImdbID(url2) != null) {
					  getMovieInfo(url2, this.index, function(imdb) { 
						$("#row"+imdb.index+" td.vertTh + td > a").css('color', 'red').animate({fontSize: (imdb.rating*20)+'%'}, 500);
						$("#row"+imdb.index+" td.vertTh").html('<a href="'+imdb.url+'" title="'+imdb.title+'">'+imdb.rating+'</a>');
					  });
				  } else {
					$("#row"+this.index+" td.vertTh").text(':(');
				  }
			  }
			});
		});
});