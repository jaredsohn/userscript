// ==UserScript==
// @name        IMDB++
// @namespace   http://n-e-s.info/
// @description Add external links to IMDb. Every feature can be enabled/disabled in settings. Fork of IMDB+ by NeS.
// @author		sestina
// @homepage	http://userscripts.org/scripts/show/180804
// @include     http://www.imdb.com/title/tt*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/180804.meta.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @version     4.0.7
// ==/UserScript==

//this is a fork of IMDB+ v3.0.4 by NeS
// http://userscripts.org/scripts/show/133844 by 

jQuery(document).ready(function($) {
    var m	= {};
    m.Id	= getMovieId();
    m.Tt	= getMovieTt();
    m.TtYr	= "%22" + getMovieTt() + "%22+" + getMovieYr();
    
    var l = {};
    // l.ex  = ["site name", "link url", "image url"];
    
    //torrents
    l.tz	= ["Torrentz", "http://torrentz.eu/search?f=" + m.TtYr, "http://torrentz.eu/favicon.ico"];
    l.tpb	= ["The Pirate Bay", "http://194.71.107.80/search/" +  m.TtYr + "/0/7/200", "http://194.71.107.80/favicon.ico"];
	l.rut	= ["RuTracker", "http://rutracker.org/forum/tracker.php?nm=" + m.TtYr, "http://rutracker.org/favicon.ico"];
    
    //info
    l.yt	= ["Youtube", "http://www.youtube.com/results?search_query=" + m.TtYr, "http://www.youtube.com/favicon.ico"];
    l.wiki	= ["Wikipedia", "http://en.wikipedia.org/wiki/" + m.Tt, "http://en.wikipedia.org/favicon.ico"];
    l.icm	= ["iCheckMovies", "http://www.icheckmovies.com/search/movies/?query=tt" + m.Id, "http://www.icheckmovies.com/favicon.ico"];
    l.mpdb  = ["MoviePosterDB", "http://www.movieposterdb.com/movie/" + m.Id, "http://www.movieposterdb.com/favicon.ico"];
    
    //reviews
    l.all	= ["allMovie", "http://www.allmovie.com/search/movies/" + m.TtYr, "http://www.allmovie.com/favicon.ico"];
    l.rt	= ["Rotten Tomatoes", "http://www.rottentomatoes.com/alias?type=imdbid&s=" + m.Id, "http://images.rottentomatoescdn.com/images/icons/favicon.ico"];

    //subtitles
    l.osub = ["OpenSubtitles", "http://www.opensubtitles.org/en/search/imdbid-" + m.Id + "/sublanguageid-eng/", "http://www.opensubtitles.org/favicon.ico"];
    l.ssc  = ["Subscene", "http://subscene.com/subtitles/title.aspx?q=" + m.Tt, "http://subscene.com/favicon.ico"];
    l.pod  = ["podnapisi", "http://www.podnapisi.net/en/ppodnapisi/search?sT=0&sJ=2&sK=" + m.Tt, "http://www.podnapisi.net/favicon.ico"];
    
    
    // Functions
    function getMovieId() {
        var id = location.pathname.match(/title\/tt(.*?)\//i)[1];
        return id;
    }
    
    function getMovieTt() {
        var title = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$1');
        return encodeURIComponent(title);
    }
    
    function getMovieYr() {
        var year = document.title.replace(/^(.+) \((.*)([0-9]{4})(.*)$/gi, '$3');
        return encodeURIComponent(year);
    }
    
    function IMDbPlusStyle() {
        var s = 
            '#title-overview-widget #IMDbPlus { padding: 5px 0 0 230px; }' +
            '#title-overview-widget #IMDbPlus a { margin: 5px 1px; }' +
            '#title-overview-widget #IMDbPlus #IMDbPlus-Feature-Settings { margin-left: 10px; }' +
            '#action-box #IMDbPlus #IMDbPlus-Feature-Settings { margin-top: 10px; }' +
            
            '#IMDbPlus-SettingsBox { display: none; margin-left: -404px; padding: 20px; position: fixed; top: 10%; left: 50%; width: 768px; z-index: 999; }' +
            '#IMDbPlus-SettingsBox > h2 { font-size: 21px }' +
            '#IMDbPlus-SettingsBox > h4 { font-size: 15px }' +
            '#IMDbPlus-SettingsBox #IMDbPlus-Options { margin: 20px 0;}' +
            '#IMDbPlus-SettingsBox #IMDbPlus-Options .IMDbPlus-OptionField label { display: inline-block; width: 150px; }' +
            '#IMDbPlus-SettingsBox button { margin: 8px 0 0; }' +
            '#IMDbPlus-SettingsBox #IMDbPlus-SettingsBox-Close { float: right; }';
        GM_addStyle(s);
    }
    
    function IMDbPlusInit() {
        var fh, oh;
        fh = '<div id="IMDbPlus"><hr><h4>IMDB++ Features:</h4>';
        oh = '<div id="IMDbPlus-SettingsBox" class="aux-content-widget-2"><h2>IMDb++ Options</h2><h4>Control the features you want to show</h4><ul id="IMDbPlus-Options">';
        
        $.each(l, function(key,val) {
            if (GM_getValue("IMDbPlus-Option-" + val[0], 1)) {
                fh += '<a class="IMDbPlus-Button linkasbutton-secondary" id="IMDbPlus-Feature-' + val[0] + '" href="' + val[1] + '" target="_blank" title="' + val[0] + '"><img alt="' + val[0] + '" src="' + val[2] + '" width="16" height="16"></a>';
            }
            oh += '<li id="IMDbPlus-Option-' + val[0] + '-Field" class="IMDbPlus-OptionField"><label for="IMDbPlus-Option-' + val[0] + '">' + val[0] + '</label> <input id="IMDbPlus-Option-' + val[0] + '" type="checkbox"' + ((GM_getValue("IMDbPlus-Option-" + val[0], 1)) ? ' checked' : '') + '></li>';
        });
        
        fh += '<a class="IMDbPlus-Button linkasbutton-secondary" id="IMDbPlus-Feature-Settings" title="Open settings frame"><img alt="Settings" src="http://img.n-e-s.info/imdbplus/settings.ico"></a></div>';
        oh +=
            '</ul><hr>' +
            '<button id="IMDbPlus-SettingsBox-Save" class="primary">Save</button>' +
            '<button id="IMDbPlus-SettingsBox-Close" class="primary">Close</button>' +
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
    
    function hideOpts()     {
        $('#IMDbPlus-SettingsBox').hide(500);
        $('#wrapper').css('visibility', 'visible').animate({ opacity: 1 }, 500);
    }
    
    function saveOpts() {
        $('.IMDbPlus-OptionField').each(function() {
            var 
            inputElm = $('input', this),inputId  = inputElm.attr('id');
            GM_setValue(inputId, (inputElm.is(":checked") ? 1 : 0));
        });
        hideOpts();
        window.location.reload();
    }
    
    // Interactions
    $('#IMDbPlus-Feature-Settings').click(showOpts);
    $('#IMDbPlus-SettingsBox-Close').click(hideOpts);
    $('#IMDbPlus-SettingsBox-Save').click(saveOpts);
    
    $(document).keyup(function(e) {
        if(e.keyCode == 27) {
            hideOpts();
        }
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