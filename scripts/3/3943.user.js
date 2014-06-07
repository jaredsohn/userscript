/*
    Hightlight Google AdSense Ads
    A modification by Eric Giguere of "Hide Google AdSense Ads"
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Highlight Google Adsense Ads
// @namespace       http://www.memwg.com/greasemonkey
// @description     (2006-04-25) Highlights Google AdSense Ads iframes anywhere.
// @include         http://*
// @include         https://*
// ==/UserScript==

(function() {

    var HighlightGoogleAds =
    {
        checkPage: function()
        {
            currentDoc = document;

            try {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/google_ads_frame/i))
                {
                    this.injectCSS("iframe[name='google_ads_frame'] { border: 10px ridge red; }");
                }
            }
            catch(e) {}
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

    HighlightGoogleAds.checkPage();

})();
