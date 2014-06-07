/*
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Ad Hide Weather.com
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-06-20: Hides ads and iframes on Weather.com.
// @include         http://*weather.com*
// ==/UserScript==

(function() {

    var AdHide =
    {
        checkPage: function()
        {
            currentURL = location.href;

            if (currentURL.match(/^http:\/\/www\.(w[0-9]+\.)?weather\.com\//i))
            {
                this.injectCSS('IMG[src^="http:\/\/image\.weather\.com\/RealMedia"], IFRAME { display: none; }\nIFRAME[src^="/maps/"] { display: block; }\n');
            }
        },


        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    AdHide.checkPage();

})();
