// ==UserScript==
// @name            Now Listening Parser Tool v2
// @namespace       #Fourthzone
// @description     Script parses artist and track and saves them to the browsers title
// @copyright       2013, Fourthzone.si
// @homepageURL     http://fourthzone.si
// @license         Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon            http://fourthzone.si/wp-content/uploads/2012/12/droidko.png
// @include         /https?:\/\/(www\.)?grooveshark.com/*/
// @include         /https?:\/\/(www\.)?977music.com/*/
// @include         /https?:\/\/(www\.)?sky.fm/play/*/
// @include         /https?:\/\/(www\.)?iheart.com/*/
// @include         /https?:\/\/(www\.)?live365.com/*/
// @include         /https?:\/\/(www\.)?youtube.com/*/
// @include         /https?:\/\/(www\.)?pandora.com/*/
// @include         /https?:\/\/(play\.)?spotify.com/*/
// @include         /https?:\/\/(www\.)?1.fm/*/
// @version         1.1.0
// @grant           none
// ==/UserScript==

// Start wrapper.
(function wrapper(window, injectNeeded, undefined) {
    'use strict';

    //
    // Script injection if needed.
    //
    if (injectNeeded) {
        var script = document.createElement('script');
        script.textContent = '(' + wrapper + ')(window, false)';
        document.body.appendChild(script);
        document.body.removeChild(script);
        return;
    }

    //
    // Script-wide variables.
    //
    var title,
        $,
        jQuery;

    function appendjQuery() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    //
    // Check for jQuery
    //
    (function init(time) {
        var frequency = 50,
            objectsLoaded = (
                window.jQuery !== undefined
            );

        if (!objectsLoaded) {
            appendjQuery();
            //timeout for loading script
            setTimeout(init, frequency, time + frequency);
            return;
        }
        setup();
    })(0);


    // Start of functions.
    //--------------------
    //
    
    //
    // Runs initial setup of DOM and variables.
    //
    function setup() {
        $ = jQuery = window.jQuery;

        title = $('title');

        
        // Sets updated title every ~5000ms.
        //--------------------
        (function runTimer() {
            setTimeout(function () {
                setTitle();
                runTimer();
            }, 5000);
        })();
    }

    //
    // Classes
    //
    // Abstract class that serves as interface
    var WebsiteParser = function () {};

    WebsiteParser.prototype.parseTrack = function () {
        throw new Error('WebsiteParser#parseTrack needs to be overridden.')
    };

    // Subclass
    var GroovesharkWebsiteParser = function () {};
    GroovesharkWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    // Method override
    GroovesharkWebsiteParser.prototype.parseTrack = function () {
        if (window.Grooveshark !== undefined)
            var currentSong = window.Grooveshark.getCurrentSongStatus().song;

        return (currentSong) ? currentSong.artistName + ' - ' + currentSong.songName + ' - Grooveshark' : 'Grooveshark - Listen to Free Music Online - Internet Radio - Free MP3 Streaming - Grooveshark';
    };

    // Youtube
    var YoutubeWebsiteParser = function () {};
    YoutubeWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    YoutubeWebsiteParser.prototype.parseTrack = function () {
        var artist = $('#eow-title').attr('title');
        return (artist) ? artist + ' - YouTube' : 'No song selected - YouTube';
    };

    // 977music
    var NineSevenSevenMusicWebsiteParser = function () {};
    NineSevenSevenMusicWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    NineSevenSevenMusicWebsiteParser.prototype.parseTrack = function () {
        var artist = $('#now_playing .data:first-child').clone().children("strong").remove().end().text();
        var song = $('#now_playing').find('.descr').find('h3').text();
        return (artist) ? artist + ' - ' + song + ' - 977 Music' : 'Internet Radio Station, Free Online Music | 977 Music - 977 Music';
    };

    // Sky.fm
    var SkyfmWebsiteParser = function () {};
    SkyfmWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    SkyfmWebsiteParser.prototype.parseTrack = function () {
        var track = $('#track').text();
        return (track) ? track + ' - Sky.FM' : 'SKY.FM Radio | Enjoy amazing Free Internet Radio stations - Sky.FM';
    };

    // iHeart
    var IheartWebsiteParser = function () {};
    IheartWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    IheartWebsiteParser.prototype.parseTrack = function () {
        var artist = $('#player .spots .artist a').attr('title');
        var title = $('#player .spots .title a').attr('title');
        var thanks;

        if ($('.song').css('display') != 'block') {
            thanks = $('.stationThanks').text().slice(0, -1);
            artist = undefined;
        }
        return (artist) ? artist + ' - ' + title + ' - iHeart' : 'iHeartRadio | Real & Custom Radio Stations - Listen Free Online - iHeart';
    };

    // Live365
    var LiveThreeSixFiveWebsiteParser = function () {};
    LiveThreeSixFiveWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    LiveThreeSixFiveWebsiteParser.prototype.parseTrack = function () {
        var artist = $('#currentTrack span.artist').text();
        var title = $('#currentTrack span.title').text();

        return (artist) ? artist + ' - ' + title + ' - Live365' : 'Live365 Internet Radio - Live365';
    };

    // Pandora
    var PandoraWebsiteParser = function () {};
    PandoraWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    PandoraWebsiteParser.prototype.parseTrack = function () {
        var artist = $('#playerBar .playerBarArtist').text();
        var title = $('#playerBar .playerBarSong').text();
        return (artist) ? artist + ' - ' + title + ' - Pandora' : 'Pandora Internet Radio - Listen to Free Music You\'ll Love - Pandora';
    };

    // Spotify
    var SpotifyWebsiteParser = function () {};
    SpotifyWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    SpotifyWebsiteParser.prototype.parseTrack = function () {
        var artist;
        var title;

        if ($('#app-player').length > 0) {
            artist = $('#app-player').contents().find("#player").find("#track-artist").text();
            title = $('#app-player').contents().find("#player").find("#track-name").text();
        }
        return (artist) ? artist + ' - ' + title + ' - Spotify' : 'Music for every moment - Spotify';
    };

    // 1.FM
    var OnefmWebsiteParser = function () {};
    OnefmWebsiteParser.prototype = Object.create(WebsiteParser.prototype);

    OnefmWebsiteParser.prototype.parseTrack = function () {
        var track = $('#onefmplaytrk').text();
        return (track) ? track + ' - 1.FM' : '1.FM | The music starts here';
    };

    //
    // Object literal for website strategies
    //
    var fetchingStrategies = {
        'grooveshark.com': function () {
            return new GroovesharkWebsiteParser();
        },
        'youtube.com': function () {
            return new YoutubeWebsiteParser();
        },
        '977music.com': function () {
            return new NineSevenSevenMusicWebsiteParser();
        },
        'sky.fm': function () {
            return new SkyfmWebsiteParser();
        },
        'iheart.com': function () {
            return new IheartWebsiteParser();
        },
        'live365.com': function () {
            return new LiveThreeSixFiveWebsiteParser();
        },
        'pandora.com': function () {
            return new PandoraWebsiteParser();
        },
        'play.spotify.com': function () {
            return new SpotifyWebsiteParser();
        },
        '1.fm': function () {
            return new OnefmWebsiteParser();
        }
    };

    //
    // Call proper function for each website
    //
    function getWebsite() {
        var parser = fetchingStrategies[location.host.replace('www.', '')]();
        return parser.parseTrack;
    }

    //
    // Sets the title of the page for the current song data.
    //
    function setTitle() {
        title.text(getWebsite());
    }

    // End wrapper.
})(this.unsafeWindow || window, window.chrome ? true : false);
