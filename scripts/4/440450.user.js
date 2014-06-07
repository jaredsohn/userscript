// ==UserScript==
// @name        Unicoin Autofire Mode
// @namespace   http://vyznev.net
// @description Makes Unicoin mining easier on Stack Exchange
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.askubuntu.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

$(document).one( 'mouseover', '#uc-rockcanvas', function () {
    var autofire = false, posX = 0, posY = 0, elem = $('#uc-rockcanvas');
    elem.on( 'mousemove mousedown mouseup mouseout', function (e) {
        posX = e.pageX; posY = e.pageY;
        if ( e.type == 'mousedown' ) {
            autofire = true;
            setTimeout( function () {
                if (!autofire) return;
                var e2 = $.Event('mousedown');
                e2.pageX = posX; e2.pageY = posY;
                elem.trigger(e2);
            }, 20 );
        } else if ( e.type == 'mouseup' || e.type == 'mouseout' ) {
            autofire = false;
        }
    } );
} );