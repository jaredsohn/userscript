// ==UserScript==
// @name        IMDB for PublicDomainFlicks
// @description Adds IMDB links to PublicDomainFlicks
// @namespace   example.com
// @include     http://*.publicdomainflicks.com/*
// @author      John Woods
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js
// @require     http://datatables.net/download/build/jquery.dataTables.min.js
// @version     0.0.1
// ==/UserScript==

// Images
var loadingImg = "data:image/gif;base64,R0lGODlhEAAQAPQAAPbx7pmZmfPu662sq8jGxJqamqampefj4NXS0KCfn8PAv727uuvn5NDNy+Dc2rKxsLi2tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==";
var timeout = 1;
var target_popup = 'imdb';

function processMovieInfo(content, index, title) {
  var bestColor = "red";
  var poorColor = "gray";
  var otherColor = "green";
  var movieInfo = content[0];
  var element = $('#loading_'+index);

  if (content.code == 404) {
    $('#loading_'+index).html('<em>Could not find <a style="color:#dd0000;" href="http://www.imdb.com/find?q='+title+'&s=tt&ttype=ft" target="'+target_popup+'">IMDB</a> info</em>');
  } else {
    if (movieInfo.rating_count >= 12 && parseFloat(movieInfo.rating) >= 7.0 ) {
      element.css('color', bestColor);
    } else if (movieInfo.rating_count >= 12 && parseFloat(movieInfo.rating) <= 3.5 ) {
      element.css('color', poorColor);
    } else {
      element.css('color', otherColor);
    }
    $('#loading_'+index).html('&raquo;&nbsp;<a href="'+movieInfo.imdb_url+
      '" target="'+target_popup+'">IMDB: </a>'+movieInfo.rating+' &raquo; '+movieInfo.actors);
  }
}

function getImdbInfo(title, index, year) {
  if (title == '') {
    return null;
  }
  var t = title.replace(/\s/g, '+');
  var url = 'http://imdbapi.org/?title='+t+'&type=json&plot=simple&episode=0&limit=1&year='+year+'&yg=1&mt=M&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0'
  $.getJSON(url,
    function(data, textStatus) {
      processMovieInfo(data, index, title);
  });
}

function processDetails(data, title, index) {
  var m = data.match(/<h1 [^>]+>[^\(]+\((\d+)\)/);
  var year = m[1];
  getImdbInfo(title, index, year);
  return true;
}

function sanitizeTitle(title) {
  // Use (aka)
  var m = title.match(/\(aka (.+)\)$/)
  if (m != null) {
    title = m[1];
  }
  title = title.replace(/!/, '')
  return title;
}

$(document).ready(function() {
  var links = $("td td span a");
  var url1;
  $(links).each(function(i) {
    var parent = $(this).parent();
    parent.append("&nbsp;<span id='loading_"+i+"'><img src='" + loadingImg + "' alt='Loading...'></span>");
    title = sanitizeTitle($(this).text());
    url1 = $(this).attr('href');

    var re = new RegExp(title+'.+Year: (\\d\\d\\d\\d)');
    var m = document.body.textContent.match(re);
    if (m == null) {
      $('#loading_'+i).html('<em>Could not find <a style="color:red" href="http://www.imdb.com/find?q='+title+'&s=tt&ttype=ft" target="'+target_popup+'">IMDB</a> info</em>');
    } else {
      getImdbInfo(title, i, m[1]);
    }
  });

});
