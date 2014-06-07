// ==UserScript==
// @name           BetterMoviepilot
// @namespace      http://userscripts.org/users/109132 
// @description    some upgrades for moviepilot.de
// @include        http://www.moviepilot.de/*
// ==/UserScript==


// please report if it is slow and glitchy
var fetchAllChannels = true;
// do not fetch these tv channel pages
var blackList = [4, 5, 6];
// moviepilot api key
var apiKey = '62acb03f94bd8352884f01bf1ca8a690f2e5ec2';

// Add jQuery
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js',
  onload: function (response) {
    eval(response.responseText);
    betterMoviepilot();
  }
});

function setupTv() {
  // open all segments
  $('.tv-guide tr').show();

  // hide all non-movie stuff
  $('td li').each(function () {
    if($('.icons-tv-movie', this).size() < 1) {
      $(this).hide();
    }
  });

  $('tr:contains("20:15")').css('background-color', '#ffc');

  $('tr.separator').hide();
}

function betterMoviepilot() {

  // search movies by default
  $('#search_top').append('<input name="type" value="movies" type="hidden" />');

  if(location.href.match(/tv\/fernsehprogramm/)) {

    if(fetchAllChannels && location.href.match(/tv\/fernsehprogramm$/)) { 
      jQuery.ajaxSetup({async: false});

      var url = $('.tv-station-groups .current a').attr('href');

      for(var i = 1; i <= 8; i++) {
        if(jQuery.inArray(i, blackList) !== -1) continue;

        $('div.main')
          .append('<div id="content-' + i + '"></div>');
        $('#content-' + i).load(url + '/' + i + ' table.tv-guide');
      }
    }
    setupTv();
  }

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
            appendRatingFromImdb(responseDetails.responseText);
          },
        });
      }
    });
  }
}

function appendRatingFromImdb(content) {
  var url    = content.match(/<link rel="[^"]+" href="([^"]*)" \/>/)[1];
  var rating = content.match(/<b>(\d.\d)\/10<\/b>/)[1];

  $('div.movie.rating-landscape').append(
    '<p><a href="' + url + '">IMDB: ' + rating.replace(/,/, '.') + '</a></p>'
  );
}
