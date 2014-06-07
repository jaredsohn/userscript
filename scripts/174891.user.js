// ==UserScript==
// @name       TurnTable Autobop
// @namespace  turntable-autobop
// @version    1.0
// @description  automatically clicks awesome button (does not override lame button)
// @match      http://turntable.fm/*
// @copyright  2013+, Tyler W.R. Cole
// ==/UserScript==

// turntable depends on jquery already
var $ = unsafeWindow.jQuery;
// establish dom-check interval
setInterval( function() {
    // if no button has been clicked this song, awesome it.
    if( !$('#scene .awesome-button').hasClass('selected')
    &&  !$('#scene .lame-button').hasClass('selected') ) {
        $('#scene .awesome-button').click();
    }
}, 808 );
