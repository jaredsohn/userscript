// ==UserScript==
// @name            Ad Skipper fark.com
// @namespace       http://csclub.uwaterloo.ca/~tshaynes/javascript/greasemonkey
// @description     2005-04-01: Disables the ads column on fark.com.  Based on the Ad Skipper for Eurogamer.net, written by Carlo Zottman.
// @include         http://*.fark.com*
// ==/UserScript==

(function() {

    var AdSkipper =
    {
        checkPage: function()
        {
            currentURL = window._content.location.href;
            currentDoc = window._content.document;

            if (currentURL.match(/^http:\/\/((www|forums)\.)?fark\.com\//))
            {
                this.injectCSS(".entirerighttoolbar, .entirerighttoolbar { display: none; }\n");
                this.injectCSS(".entirelefttoolbar, .entirelefttoolbar { display: none; }\n");
            }
        },


        injectCSS: function(css)
        {
            head = window._content.document.getElementsByTagName("head")[0];
            style = window._content.document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        },



    }

    AdSkipper.checkPage();

})();

