// ==UserScript==
// @name        Coursera video player UX improvements
// @description Extensions for coursera.org to improve UX of html video player - play/pause video on mouse click and space bar, and auto-play next video 
// @namespace   http://zihotki.com/
// @include     https://*.coursera.org/*/lecture/*
// @match       https://*.coursera.org/*/lecture/* 
// @version     0.1
// @grant       none

// @license     MIT License
// ==/UserScript==

function mainWrapper(){
    /*!
     * jQuery Cookie Plugin
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2011, Klaus Hartl
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.opensource.org/licenses/GPL-2.0
     */
    (function($) {
        $.cookie = function(key, value, options) {
    
            // key and at least value given, set cookie...
            if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
                options = $.extend({}, options);
    
                if (value === null || value === undefined) {
                    options.expires = -1;
                }
    
                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
    
                value = String(value);
    
                return (document.cookie = [
                    encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path    ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                ].join(''));
            }
    
            // key and possibly options given, get cookie...
            options = value || {};
            var decode = options.raw ? function(s) { return s; } : decodeURIComponent;
    
            var pairs = document.cookie.split('; ');
            for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
                if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
            }
            return null;
        };
    })(jQuery);
    
    
    
    function setupAutoplay(){
        if (window.QL_player === undefined) {
            setTimeout(setupAutoplay, 300);
            return;
        }
        
        var isAutoNextEnabledC = $.cookie('___autoNextVideo___');
        
        if ( typeof(isAutoNextEnabledC) === 'undefined' ) {
            isAutoNextEnabledC = true;
        } else {
            isAutoNextEnabledC = isAutoNextEnabledC == 'true';
        }
        
        var autoNextEl = $('<input type="checkbox" id="autonext" name="autonext" title="Automatically start next video" style="margin: 0; padding: 0; position: relative; left: -5px; height:inherit;" />')
             .click( function(e) {
                         $.cookie('___autoNextVideo___', this.checked, {expires: 24*7*30*365*10, secure: true});
                         e.stopPropagation(); // don't click the underlying link
                     })
             .prependTo('.course-lecture-view-next-link')
             .prop('checked', isAutoNextEnabledC);

        if(window.top.wasPlayerFullScreen) {
            var makeFullScreenInt = setInterval(function(){
                    var fullscreenButton = $('.mejs-fullscreen-button button');
                    if(fullscreenButton){
                        fullscreenButton.click();
                        clearInterval(makeFullScreenInt);
                    } 
                 }, 20);
        }

        window.top.wasPlayerFullScreen = undefined;
        
        QL_player.mediaelement_media.addEventListener("ended", function(){
            window.top.wasPlayerFullScreen = QL_player.mediaelement_handle.isFullScreen;
            
            var isAutoNextEnabled = autoNextEl[0].checked;
            if ( isAutoNextEnabled ) {
                $('.course-lecture-view-next-link').click();
            }
        });
    };
    
    function enhanceVideoControls(){
    
        if (window.QL_player === undefined) {
            setTimeout(enhanceVideoControls, 300);
            return;
        }
    
        var videoTags = window.QL_player.elements.video_element;
        
        if (!videoTags) return;
        
        var tag = videoTags[0];
        var oldOnclick = tag.onclick, oldOnkeyup = tag.onkeyup;
        tag.style.cursor ='pointer';
        
        tag.onclick = function(){
            if (tag.paused){
                tag.play();
            } else {
                tag.pause();
            }
            
            if (oldOnclick) oldOnclick();
        };
        
        tag.onkeyup = function(e){
            if (e.keyCode === 32 /* space */) {
               if (tag.paused){
                    tag.play();
                } else {
                    tag.pause();
                }
            }
            
            if (oldOnkeyup) oldOnkeyup(e);
        }
    }

    setupAutoplay();
    
    enhanceVideoControls();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}