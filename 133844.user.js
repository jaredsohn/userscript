// ==UserScript==
// @name        IMDB+
// @description Add external links to IMDb. Every feature can be enabled/disabled in settings.
// @namespace   http://n-e-s.info/
// @include     http://www.imdb.com/title/tt*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/133844.meta.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @version     4.0.5
// ==/UserScript==

jQuery(document).ready(function ($) {
  var m  = {};
  m.Id   = getMovieId();
  m.Tt   = getMovieTt();
  m.TtYr = getMovieTt() + "+" + getMovieYr();

  var l = {};
  // l.ex  = ["name", "link url", "title or alt text", "image url"];
  l.tmd  = ["Torrentsmd", "http://torrentsmd.com/browse.php?imdb=" + m.Id, "tmd.ico"];
  l.rut  = ["Rutracker", "http://rutracker.org/forum/tracker.php?nm=" + m.TtYr, "rutracker.ico"];
  l.tz   = ["Torrentz", "http://torrentz.eu/search?f=" + m.TtYr, "torrentz.ico"];
  l.tpb  = ["The Pirate Bay", "http://thepiratebay.sx/search/" +  m.TtYr + "/0/99/200", "tpb.ico"];
  l.yt   = ["Youtube", "https://www.youtube.com/results?search_query=" + m.TtYr, "youtube.ico"];
  l.mpdb = ["MoviePosterDB", "http://www.movieposterdb.com/movie/" + m.Id, "mpdb.ico"];
  l.kp   = ["Kinopoisk", "http://www.kinopoisk.ru/index.php?first=yes&kp_query=" + m.Tt, "kinopoisk.ico"];
  l.cmg  = ["Cinemagia", "http://www.cinemagia.ro/cauta/?q=" + m.TtYr, "cinemagia.jpg"];
  l.crx  = ["CinemaRx", "http://www.cinemarx.ro/cauta/filme/" + m.TtYr, "cinemarx.ico"];
  l.allm = ["allMovie", "http://www.allmovie.com/search/movies/" + m.TtYr, "allm.ico"];
  l.rt   = ["Rotten Tomatoes", "http://www.rottentomatoes.com/alias?type=imdbid&s=" + m.Id, "rt.ico"];
  l.wiki = ["Wikipedia", "http://en.wikipedia.org/wiki/" + m.Tt, "wikipedia.ico"];
  l.osub = ["OpenSubs", "http://www.opensubtitles.org/en/search/sublanguageid-all/imdbid-" + m.Id, "opensubs.ico"];
  l.ssc  = ["Subscene", "http://subscene.com/s.aspx?q=" + m.TtYr, "subscene.ico"];
  l.ggl  = ["Google", "http://www.google.md/search?q=" + m.TtYr, "google.ico"];

  // Functions
  function getMovieTt() {
    var title = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$1');
    return encodeURIComponent(title);
  }

  function getMovieYr() {
    var title = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$3');
    return encodeURIComponent(title);
  }

  function getMovieId() {
    var id = location.pathname.match(/title\/tt(.*?)\//i)[1];
    return id;
  }

  function IMDbPlusStyle() {
    var s = 
      '#title-overview-widget #IMDbPlus { padding: 5px 0 0 230px; }'+
      '#title-overview-widget #IMDbPlus a { margin: 5px 1px; }'+
      '#title-overview-widget #IMDbPlus #IMDbPlus-Feature-Settings { margin-left: 10px; }'+
      '#action-box #IMDbPlus #IMDbPlus-Feature-Settings { margin-top: 10px; }'+

      '#IMDbPlus-SettingsBox { display: none; margin-left: -404px; padding: 20px; position: fixed; top: 10%; left: 50%; width: 768px; z-index: 999; }'+
      '#IMDbPlus-SettingsBox > h2 { font-size: 21px }'+
      '#IMDbPlus-SettingsBox > h4 { font-size: 15px }'+
      '#IMDbPlus-SettingsBox #IMDbPlus-Options { margin: 20px 0;}'+
      '#IMDbPlus-SettingsBox #IMDbPlus-Options .IMDbPlus-OptionField label { display: inline-block; width: 150px; }'+
      '#IMDbPlus-SettingsBox button { margin: 8px 0 0; }'+
      '#IMDbPlus-SettingsBox #IMDbPlus-SettingsBox-Close { float: right; }'+
      '.IMDbPlus-Button img { height: 16px; width: 16px; }';
    GM_addStyle(s);
  }

  function IMDbPlusInit() {
    var fh, oh, dh;
    fh = '<div id="IMDbPlus"><hr><h4>IMDB+ Features:</h4>';
    dh = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" style="float: right;">'+
    '<input type="hidden" name="cmd" value="_s-xclick">'+
    '<input type="hidden" name="hosted_button_id" value="YSRE94S484DAA">'+
    '<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">'+
    '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">'+
    '</form>';
    oh = '<div id="IMDbPlus-SettingsBox" class="aux-content-widget-2">' + dh + '<h2>IMDb+ Options</h2><h4>Control the features you want to show</h4><ul id="IMDbPlus-Options">';

    $.each(l, function (key,val) {
      if (GM_getValue("IMDbPlus-Option-" + val[0], 1)) {
        fh += '<a class="IMDbPlus-Button linkasbutton-secondary" id="IMDbPlus-Feature-' + val[0] + '" href="' + val[1] + '" target="_blank" title="On ' + val[0] + '"><img alt="On ' + val[0] + '" src="http://img.n-e-s.info/imdbplus/' + val[2] + '"></a>';
      }
      oh += '<li id="IMDbPlus-Option-' + val[0] + '-Field" class="IMDbPlus-OptionField"><label for="IMDbPlus-Option-' + val[0] + '">' + val[0] + '</label> <input id="IMDbPlus-Option-' + val[0] + '" type="checkbox"' + ((GM_getValue("IMDbPlus-Option-" + val[0], 1)) ? ' checked' : '') + '></li>';
    });

    fh += '<a class="IMDbPlus-Button linkasbutton-secondary" id="IMDbPlus-Feature-Settings" title="Open settings frame"><img alt="Settings" src="http://img.n-e-s.info/imdbplus/settings.ico"></a></div>';
    oh +=
    '</ul><hr>'+
    '<button id="IMDbPlus-SettingsBox-Save" class="primary">Save</button>'+
    '<button id="IMDbPlus-SettingsBox-Close" class="primary">Close</button>'+
    '</div>';

    IMDbPlusStyle();

    $((location.pathname.match(/combined/)) ? '#action-box' : '#title-overview-widget').append(fh);
    $('body').append(oh);

  }

  IMDbPlusInit();

  function showOpts() {
    $('#wrapper').css('visibility', 'hidden').animate({ opacity: 0 }, 500);
    $('#IMDbPlus-SettingsBox').show(500);
  }

  function hideOpts() {
    $('#IMDbPlus-SettingsBox').hide(500);
    $('#wrapper').css('visibility', 'visible').animate({ opacity: 1 }, 500);
  }

  function saveOpts() {
    $('.IMDbPlus-OptionField').each(function () {
      var
      inputElm = $('input', this),
      inputId  = inputElm.attr('id');
      GM_setValue(inputId, (inputElm.is(":checked") ? 1 : 0))
    });
    hideOpts();
    window.location.reload();
  }

  // Interactions
  $('#IMDbPlus-Feature-Settings').on("click", showOpts);
  $('#IMDbPlus-SettingsBox-Close').on("click", hideOpts);
  $('#IMDbPlus-SettingsBox-Save').on("click", saveOpts);

  $(document).keyup(function (e) {
    if(e.keyCode == 27) hideOpts();
  });
});

// The MIT License (MIT)

// Copyright (c) 2013 Sergiu Negara

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
