/*
    Ad Skipper
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Ad Skipper GameSpy.com
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-04-28: Skips interstitial advertisements and disables the content area ads on GameSpy.com.
// @include         http://*gamespy.com*
// ==/UserScript==

(function() {

    var AdSkipper =
    {
        checkPage: function()
        {
            currentURL = location.href;
            currentDoc = document;

            if (currentURL.match(/^http:\/\/[a-z0-9]+\.gamespy\.com\//i))
            {
                if (currentDoc.title.match(/Advertisement/i))
                {
                    this.ignSkipAd();
                }
                else
                {
                    this.injectCSS("IFRAME, #SkyscraperAd, #MiniSkyscraperAd, #BillboardAd, #nointelliTXT, #boxzillabox, .advertisementCenterer { display: none; }\n");
                    this.injectCSS(".article { text-align: justify; }\n");
                }
            }
        },


        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        },



        ignSkipAd: function()
        {
            document.forward_form.submit();
        }
    }

    AdSkipper.checkPage();

})();
