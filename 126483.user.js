// ==UserScript==
// @name            Coursera EXT - Custom video speed
// @description     Coursera Extension -- enables setting custom video speed in 10% increments by pressing [ and ] keys.
// @namespace       http://sepczuk.com/
// @version         0.32
// @include         https://*.coursera.org/*/lecture/view*
// @match           https://*.coursera.org/*/lecture/view*
// @copyright       2012-2013, Damian Sepczuk, damian at sepczuk period delme com
// @downloadURL     https://userscripts.org/scripts/source/126483.user.js
// @updateURL       https://userscripts.org/scripts/source/126483.meta.js
// ==/UserScript==

function mainWrapper(){
    var debug = false;
    var US_SHORT_NAME = 'CourseraEXT';
    var US_VERSION = 0.32;
    
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
    
    function roundToNthDigit(v, n) {
        return parseFloat((v).toFixed(n));
    }
    
   
    function getRoundedVideoSpeed() {
        return roundToNthDigit(QL_player.get_speed(), 2);
    }
    
    function updateInterface() {
        $('.course-lecture-view-speed-label').text(getRoundedVideoSpeed() + 'x');
    }
    
    function main(){
        debugLog("Running main!");
        if (window.QL_player === undefined) {
            var retryAfterTImeout = 300;
            debugLog("QL_player window not found. Setting timeout to " + retryAfterTImeout + "ms.");
            setTimeout(main, retryAfterTImeout);
            return;
        }
             
        //debugLog("QL_player window not found!");
        
        // ======================== <modify standard code>
        // get rid of bounds!
        debugLog("Registering new increase_speed function... ");
        QL_player.increase_speed = function(deltaSpeed){
            var currentSpeed = getRoundedVideoSpeed();
            var newSpeed = roundToNthDigit(currentSpeed + deltaSpeed, 2);
            debugLog("QL_player.increase_speed: current speed = " + currentSpeed + "; delta = " + deltaSpeed + "; new rounded speed = " + newSpeed + ". Setting...");
            QL_player.set_speed(newSpeed);
            debugLog("QL_player.increase_speed: DEBUG check of current speed. Current EXACT speed = " + QL_player.get_speed());
        }
        debugLog("Registering new increase_speed function... DONE.");
            
        // change the way, video speed is saved
        debugLog("Overriding update_speed_preference function... ");
        var old_update_speed_preference = update_speed_preference;
        update_speed_preference = function(){
            debugLog("update_speed_preference: invoking old function...");
            old_update_speed_preference();
            debugLog("update_speed_preference: DONE.");
            debugLog("update_speed_preference: Saving new speed in a cookie customVideoSpeed___ByFireBiker.");
            $.cookie('customVideoSpeed___ByFireBiker', getRoundedVideoSpeed(), {expires: 24*7*30*365*10, secure: true});
        }
        debugLog("Overriding update_speed_preference function... DONE.");
        // ======================== </modify standard code>
            
        // set video speed to previously cookied one (if available)
        var cookiedSpeed = $.cookie('customVideoSpeed___ByFireBiker');
        debugLog("Video speed from customVideoSpeed___ByFireBiker cookie: " + cookiedSpeed);
        if (null !== cookiedSpeed ) {
            debugLog("Not null, so update speed!");
            QL_player.set_speed(cookiedSpeed);
            updateInterface();
        }

        // Add full-screen bubble
        var mediaStatusBubble = $('<div id="player_state" aria-live="assertive" role="alert" style="display: block; position: absolute; top: 10px; right: 10px; z-index: 10000; padding: 10px 20px; background-color: #eee; display: none; border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px;">Player state</div>').appendTo('#lecture_view_dialog');
        var isShowingMediaBubble = false;
        var mediaBubbleTimeout = null;
        function showMediaStatusBubble(t) {
            debugLog("showMediaStatusBubble: showing the bubble!");
            if (isShowingMediaBubble) clearTimeout(mediaBubbleTimeout);            
            else mediaStatusBubble.fadeIn(300);
            
            isShowingMediaBubble = true;
            mediaStatusBubble.html(t);
            mediaBubbleTimeout = setTimeout(function(){mediaStatusBubble.fadeOut(200); isShowingMediaBubble = false;}, 800);
        }
        
        // Define speed actions
        var decSpeed = function(e){
            debugLog("decSpeed");
            var newRate = getRoundedVideoSpeed() - 0.1;
            
            if(newRate > 0) {
                QL_player.set_speed(newRate);
            }
        };
        
        var incSpeed = function(e){
            debugLog("incSpeed");
            var newRate = getRoundedVideoSpeed() + 0.1;
            QL_player.set_speed(newRate);
        };
        
        // Add keyboard shortcuts
        LBRACKET_KEY = 219;
        RBRACKET_KEY = 221;
        NUM0_KEY = 96;
        ALNUM_0 = 48;
            
        QL_player.mediaelement_handle.options.keyActions.push({keys: [LBRACKET_KEY], action: function(player, media){decSpeed();}});
        QL_player.mediaelement_handle.options.keyActions.push({keys: [RBRACKET_KEY], action: function(player, media){incSpeed();}});
        QL_player.mediaelement_handle.options.keyActions.push({keys: [NUM0_KEY, ALNUM_0], action: function(player, media){QL_player.set_speed(1);}});
        // Add entries to the legend ([?]-key)
        $('.course-lecture-view-shortcuts-block li').eq(7).append('<li><strong>[:</strong> Decrease speed by 10%</li>\n' +
                                             '<li><strong>]:</strong> Increase speed by 10%</li>\n' +
                                             '<li><strong>Num0:</strong> Set speed to 100%</li>\n');
        
        // Respond to speed change (from any source!) by updating user interface
        QL_player.mediaelement_media.addEventListener('ratechange', function(){
            debugLog("Speed change detected! Update the interface.");
            updateInterface();
            debugLog("... and store the new speed.");
            update_speed();
            
            debugLog("Show bubble if full screen.");
            // Show bubble only on full-screen. When in window mode, there's a button showing current speed.
            if (QL_player.mediaelement_handle.isFullScreen) {
                debugLog("YES, full screen! Showing bubble.");
                var s = QL_player.mediaelement_media.playbackRate.toFixed(2);
                showMediaStatusBubble("Video speed: &#215;" + s);
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