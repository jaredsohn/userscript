// ==UserScript==
// @name            Coursera EXT - Auto next video
// @description     Coursera Extension -- Automatically go to the next video upon reaching the end of the current one
// @namespace       http://sepczuk.com/
// @version         0.36
// @include         https://*.coursera.org/*/lecture/view*
// @match           https://*.coursera.org/*/lecture/view*
// @copyright       2012-2013, Damian Sepczuk, damian at sepczuk period delme com; loopkid
// @downloadURL     https://userscripts.org/scripts/source/126493.user.js
// @updateURL       https://userscripts.org/scripts/source/126493.meta.js
// ==/UserScript==

function mainWrapper(){
    var debug = false;
    var US_SHORT_NAME = 'CEXT-ANVid';
    var US_VERSION = 0.36;
    
  	function debugLog(msg) {
        if (!debug) return;
        console.log(US_SHORT_NAME + ": " + msg);
  	}

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
    
    function main(){
        debugLog("Running main!");
        if (window.QL_player === undefined) {
            var retryAfterTImeout = 300;
            debugLog("QL_player window not found. Setting timeout to " + retryAfterTImeout + "ms.");
            setTimeout(main, retryAfterTImeout);
            return;
        }
        
        var CEXT_cookieName = 'autoNextVideo___ByFireBiker';
        var isAutoNextEnabledC = $.cookie(CEXT_cookieName);
        
        if ( typeof(isAutoNextEnabledC) === 'undefined' ) {
            debugLog("Cookie " + CEXT_cookieName + " not found. Setting true.");
            isAutoNextEnabledC = true;
        } else {
            isAutoNextEnabledC = isAutoNextEnabledC == 'true';
            debugLog("Cookie " + CEXT_cookieName + " found. Setting " + isAutoNextEnabledC + ".");
        }
        // style="margin: 0; padding: 0; vertical-align: bottom; position: relative; top: -2px; left: -5px;"
        var autoNextEl = $('<input type="checkbox" id="autonext" name="autonext" style="width: 13px; height: 13px; margin-right: .6em; margin-bottom: 2px;"/>')
             .click( function(e) {
                         $.cookie(CEXT_cookieName, this.checked, {expires: 24*7*30*365*10, secure: true});
                         e.stopPropagation(); // don't click the underlying link
                     })
             .prependTo('.course-lecture-view-next-link')
             .prop('checked', isAutoNextEnabledC);       

        if(window.top.wasPlayerFullScreen) {
            var makeFullScreenInt = setInterval(function(){
                console.log("Testing full screen clickable... ")
                if($('.mejs-fullscreen-button button')){
                    console.log("... OK ")
                    $('.mejs-fullscreen-button button').click();
                    clearInterval(makeFullScreenInt);
                } else {
                    console.log("not yet!")
                }
             }, 10);
        }

        // Center frame on no-full screen
        /* // No more fancy box and centering on coursera site!
        $('.mejs-fullscreen-button button').click(function(){            
            var centerNonFullScreenItv = setInterval(function(){
                    if (!QL_player.mediaelement_handle.isFullScreen) {
                        console.log("Trying to center fancy-box... ")
                        window.parent.$.fancybox.center();
                        clearInterval(centerNonFullScreenItv);
                    }
                }, 100);
        });
        */

        window.top.wasPlayerFullScreen = undefined;
        
        QL_player.mediaelement_media.addEventListener("ended", function(){
            window.top.wasPlayerFullScreen = QL_player.mediaelement_handle.isFullScreen;
            
            var isAutoNextEnabled = autoNextEl[0].checked;
            if ( isAutoNextEnabled ) {
                $('.course-lecture-view-next-link').click();
            }
        });
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}