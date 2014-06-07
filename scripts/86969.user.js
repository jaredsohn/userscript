// ==UserScript==
// @name        Set Dock Badge for Twitter
// @namespace   http://fluidapp.com
// @description Sets the dock badge when a new tweet arrives.
// @include     *
// @author      Darian Shimy <dshimy@gmail.com>
// ==/UserScript==

function updateTweetCount() {
    if ($('div.new-tweets-bar').length == 0) {
        window.fluid.dockBadge = "";    
    } else {
        window.fluid.dockBadge = $('div.new-tweets-bar').text().split(" ")[0];
    }
    setTimeout(updateTweetCount, 2000);
}

function jQueryIsReady($) {
    setTimeout(updateTweetCount, 2000);   
}

(function () {
    if (window.fluid) {   
        // -----------------------------------------------------------------
        // Greasemonkey/GreaseKit compatibility
        // -----------------------------------------------------------------
        if (typeof(unsafeWindow) === 'undefined') {
            unsafeWindow = window;
        }

        // -----------------------------------------------------------------
        // Import the jQuery Library
        // -----------------------------------------------------------------
        var script = document.createElement('script');
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
        script.type = 'text/javascript';
        script.addEventListener("load", function() {
            unsafeWindow.jQuery.noConflict();
            jQueryIsReady(unsafeWindow.jQuery);
        }, false);
        document.getElementsByTagName('head')[0].appendChild(script);
    }
})();