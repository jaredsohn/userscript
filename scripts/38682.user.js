// ==UserScript==
// @name           Imdb Rating on Pirate Bay and NfoHump
// @description Displays Imdb ratings and highlights the best movies
// @namespace  http://www.keyvan.net/2008/10/greasemonkey-jquery
// @include        http://thepiratebay.org/*
// @include        http://www.nfohump.com/*
// @include        http://nfohump.com/*
// @author         Frosty (original author : Keyvan Minoukadeh)
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
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

$(document).ready(function() {
		var elementName = ".detLink";
		var bestColor = "red";
		var otherColor = "green";
		$processElement = $(elementName);
		if(location.href.match("nfohump"))
		{
			elementName = ".nfoLineRelease";
			bestColor = "Magenta";
			otherColor = "lightGreen";
			$processElement = $(elementName).children();
		}
		var title, re, found, url1, url2, res;
		$(elementName).each(function(i) {
			title = $(this).text();
			// get rid of irrelevant text
			re = /([^\(\[]+)/i;
			found = title.match(re);
			title = found[0].replace(/\./g, "+");
			title = title.replace(/(NTSC|DVDR|PROPER|DVDSCR|unrated|XviD|contempt|cam|kingben|bulldozer|FxM|aXXo|AKCPE|r3|dvdrip|PUKKA|r5|ltt|LINE Xvid)/gi, '');
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
					  getMovieInfo(url2, this.index, function(rating) {
						
						if(rating.votecount.length >= 12 && parseFloat(rating.rating) >= 7.5 )
						{
							$processElement.eq(rating.index).css('color', bestColor);
							$processElement.eq(rating.index).html(rating.rating + " " + $(elementName).eq(rating.index).text() + "    (" + rating.votecount + ")");
						}
						else
						{
							$processElement.eq(rating.index).css('color', otherColor);
							$processElement.eq(rating.index).html(rating.rating + " " + $(elementName).eq(rating.index).text() + "    (" + rating.votecount + ")");
						}
					  });
				  }
			  }
			});
		});
});