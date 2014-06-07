/*
    Hide Iframes
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Hide Iframes
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-04-28: Hides all Iframes.
// @include         *
// ==/UserScript==

(function() {

    var HideIframes =
    {
        go: function()
        {
            this.injectCSS("IFRAME { display: none; }\n");
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

    HideIframes.go();

})();

