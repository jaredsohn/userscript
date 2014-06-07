// ==UserScript==
// @name     _Video embed fun
// @include  http://scratchpad2.com/misc/video_player_test.htm
// @include  http://*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require  http://player.longtailvideo.com/jwplayer.js
// ==/UserScript==

//--- Find all hyperlinks to select video files.
var videoLinks  = $("a[href$='.mpg'], a[href$='.mp4'], a[href$='.wmv']");

//--- For each video link, activate our video player.
videoLinks.each ( function (J) {
    var jThis   = $(this);
    var vidURL  = jThis.attr ('href');
    var contID  = 'myVidContainer_' + J;

    jThis.after ('<div id="' + contID + '">Loading the player ...</div>');

    jwplayer (contID).setup ( {
        flashplayer:    "http://player.longtailvideo.com/player.swf",
        file:           vidURL,
        height:         344,
        width:          480
    } );
} );
