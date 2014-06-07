// ==UserScript==
// @name           Hulu++
// @namespace      http://userscripts.org
// @description    Enhances Hulu by adding links, ratings, and removing banner ad 
// @author         Bryan Burkholder
// @version        0.2a - 28th/dec/2008
// @include        http://www.hulu.com/*
// ==/UserScript==

ais=unsafeWindow.document.getElementsByTagName('a');
//alert(ais2.length);


function makeMovieUrl(movietitle) {
  return 'http://www.imdb.com/find?q='+ movietitle +';s=tt;site=aka';
}

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
	return { rating: match[1], index: index };
}

function getImdbUrl(mtitle, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + mtitle + '+site:imdb.com',
    onload:function(details) {
      var res = eval('(' + details.responseText + ')');
      url2 = res.responseData.results[0].unescapedUrl;
      callback(url2);
    }
  });
}

for (var i = 0; i < ais.length; i++) {
  if (ais[i].textContent!='' && (ais[i].textContent.replace("\"",'','g').length > 1) && (!ais[i].href.match(/#comments/))) {
    if ((/info_hover/.test(ais[i].className)) && !(ais[i].getAttribute('href').match(/\/watch\//)) && !(/ /.test(ais[i].className))) {
      var mtitle = encodeURIComponent(ais[i].textContent.replace("\"",'','g'));

      (function(i, mtitle, elem) {
        getImdbUrl(mtitle, function(url2) {
          var imdblinkspan = document.createElement('span');
          var imdblink=' <br />IMDB: <a target="_blank" href="' + url2 +'" target="_blank">' + 'Page'  + '</a>';
          imdblink += ' | <span id="imdb_rating_' + i + '">loading...<br></span>';
          imdblinkspan.innerHTML = imdblink;
          elem.parentNode.insertBefore(imdblinkspan, elem.nextSibling);
		
          if (findImdbID(url2) != null) {
            getMovieInfo(url2, i, function(rating) {
              var IMDB_rating_span = document.getElementById('imdb_rating_' + i);
              IMDB_rating_span.innerHTML = "Rating - <b>" + rating.rating + "</b>" + "<div  style=\"width: 60px; background: url(http://www.hulu.com/images/rating_empty.gif) 0 0 repeat-x;\"><div style=\"width:" + rating.rating*10 + "%; height: 12px; background: url(http://www.hulu.com/images/rating_full.gif) 0 0 repeat-x;\"></div></div>";
            });
          }
		  else {
		  imdblinkspan.innerHTML = "<br /> IMDB: <a target=\"_blank\" href=\"http://www.imdb.com/find?s=tt&q="+mtitle+"\">Not Found</a><br>";
		  }
		  imdblinkspan.innerHTML += " Amazon: <a target=\"_blank\" href=\"http://www.amazon.com/gp/search?ie=UTF8&keywords="+mtitle+"&tag=imdb-title-20&index=dvd\">Buy</a>";
		  imdblinkspan.innerHTML += " <br>RT: <a target=\"_blank\" href=\"http://www.rottentomatoes.com/search/movie.php?searchby=movies&page=0&search="+mtitle+"\">Search</a>";
        });
      })(i, mtitle, ais[i]);
//var link = document.evaluate("/html/body/div[2]/div/div/ul[2]/li[3]/a", document, null, XPathResult.ANY_TYPE, null);
//var thisLink = link.iterateNext();
//thisLink.innerHTML = '<a class="utility-link" href="http://userscripts.org/scripts/show/39338">Hulu++</a>';
    }
	var link = document.evaluate("/html/body/div[2]/div/div/ul[2]/li[3]/a", document, null, XPathResult.ANY_TYPE, null);
var thisLink = link.iterateNext();
thisLink.innerHTML = '<a class="utility-link" href="http://userscripts.org/scripts">Hulu++</a>';
  }
}

var headings = document.evaluate("/html/body/div[4]/div/div[2]/div/div/div/div[2]/span[2]", document, null, XPathResult.ANY_TYPE, null);
var thisHeading = headings.iterateNext();
var title = document.evaluate("/html/body/div[4]/div/div[2]/div/div/div/div/span/a", document, null, XPathResult.ANY_TYPE, null);
var mtitle = title.iterateNext().innerHTML;

(function(mtitle) {
        getImdbUrl(mtitle, function(url2) {
          //var imdblinkspan = document.createElement('span');
          var imdblink=' &nbsp;&nbsp;IMDB:&nbsp;&nbsp;<a target="_blank" href="' + url2 +'" target="_blank">' + 'Page'  + '</a>'+ ' &nbsp;&nbsp;';
          //imdblink += ' | <span id="imdb_rating_' + i + '">loading...</span>';
          
          //elem.parentNode.insertBefore(imdblinkspan, elem.nextSibling);
	
          if (findImdbID(url2) != null) {
            getMovieInfo(url2, 0, function(rating) {
				imdblink += '|&nbsp;&nbsp;&nbsp;IMDB Rating:&nbsp;&nbsp;' + rating.rating + '&nbsp;&nbsp;&nbsp;<br>';
				imdblink += "Amazon: <a target=\"_blank\" href=\"http://www.amazon.com/gp/search?ie=UTF8&keywords="+mtitle+"&tag=imdb-title-20&index=dvd\">&nbsp;&nbsp;Buy&nbsp;&nbsp;&nbsp;</a>|";
				imdblink += "&nbsp;&nbsp;&nbsp;RT: <a target=\"_blank\" href=\"http://www.rottentomatoes.com/search/movie.php?searchby=movies&page=0&search="+mtitle+"\">&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;</a>|";
		  
				thisHeading.innerHTML += imdblink;
              //var IMDB_rating_span = document.getElementById('imdb_rating_' + i);
              //IMDB_rating_span.innerHTML = "Rating - <b>" + rating.rating + "</b>" + "<div  style=\"width: 60px; background: url(http://www.hulu.com/images/rating_empty.gif) 0 0 repeat-x;\"><div style=\"width:" + rating.rating*10 + "%; height: 12px; background: url(http://www.hulu.com/images/rating_full.gif) 0 0 repeat-x;\"></div></div>";
            });
          }
		  else {
		  imdblink = "&nbsp;&nbsp;&nbsp;IMDB: <a target=\"_blank\" href=\"http://www.imdb.com/find?s=tt&q="+mtitle+"\">&nbsp;&nbsp;Not Found&nbsp;&nbsp;&nbsp;</a>|";
		  imdblink += "&nbsp;&nbsp;&nbsp;Amazon: <a target=\"_blank\" href=\"http://www.amazon.com/gp/search?ie=UTF8&keywords="+mtitle+"&tag=imdb-title-20&index=dvd\">&nbsp;&nbsp;Buy&nbsp;&nbsp;&nbsp;</a>|";
		  imdblink += "&nbsp;&nbsp;&nbsp;RT: <a target=\"_blank\" href=\"http://www.rottentomatoes.com/search/movie.php?searchby=movies&page=0&search="+mtitle+"\">&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;</a>|";
		  
		  thisHeading.innerHTML += imdblink;
		  }
		  
        });
      })(mtitle);
	 
var ad = document.evaluate("/html/body/div[4]/div/div[2]/div/div/div[2]", document, null, XPathResult.ANY_TYPE, null);
var thisAd = ad.iterateNext();
thisAd.innerHTML = '';

var link = document.evaluate("/html/body/div[2]/div/div/ul[2]/li[3]/a", document, null, XPathResult.ANY_TYPE, null);
var thisLink = link.iterateNext();
thisLink.innerHTML = '<a class="utility-link" href="http://userscripts.org/scripts/show/39338">Hulu++</a>';