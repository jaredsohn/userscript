// ==UserScript==
// @name           quaz moviepilot
// @description    displays your and user rating from IMDb on moviepilot.de
// @namespace      http://userscripts.org/users/quaz
// @include        http://www.moviepilot.de/movies/*
// @require    	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==

var apiKey = '48c0c1269d02722cb5b2203e5f0e0e31'; // moviepilot api key
betterMoviepilot();

function betterMoviepilot() {
  // add imdb rating to movie page
  var match = null;
  if(match = location.href.match(/movies\/(.*)\/?/)) {
    GM_xmlhttpRequest({
      method: 'GET',
      url:    'http://www.moviepilot.de/movies/' + match[1] + '.json?api_key=' + apiKey,
      onload: function (r) {
	var data = eval('(' + r.responseText + ')');
        GM_xmlhttpRequest({
          method: "GET",
          url: 'http://www.imdb.de/title/tt' + data.alternative_identifiers.imdb,
          onload: function(responseDetails) {
            appendRatingFromImdb(responseDetails.responseText, data.alternative_identifiers.imdb);
          },
        });
      }
    });
  }
}

function appendRatingFromImdb(content, id) {
  url    = content.match(/<link rel="[^"]+" href="([^"]*)" \/>/)[1];
  
  m2= /<b>(\d.\d)\/10<\/b>/
  rating = content.match(m2)[1];
  m3= /voteuser.>(\d{1,2})</
  if (content.search(m3)==-1){ur=''} else {ur=(content.match(m3)[1]);} 

  t1='title="IMDb.com <<< >>> IMDb.de"';
  t2='title="weighted average <<< >>> your rating"';
  f='<div style="margin: 0 10px 0 5px;font-size: 14px;display:inline-block;padding:0;">';
  l1='<a href="http://imdb.com/title/tt' + id + '"'+ t1 + '>IMDb</a>';
  l2='<a href="' + url + '"' + t1 +'> .de</a><br>';
  l3='<a href="http://imdb.com/title/tt' + id + '/ratings" ' + t2 + '>' + rating + '    </a>'

  $('div.contentcount').after(f + l1 + l2 + l3 + ur + '</div>' ); //+ '</p>'
  $('.criticscount').css('margin','0 0 0 10px');
}
