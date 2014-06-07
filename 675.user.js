/*
    Hide Google Adsense Ads
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Hide Google Adsense Ads
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     (2005-03-30) Hides Google Adsense Ads iframes anywhere.
// @include         http://*
// @include         https://*
// ==/UserScript==

(function() {

    var RemoveGoogleAds =
    {
        checkPage: function()
        {
            currentDoc = document;

            try {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/google_ads_frame/i))
                {
                    this.injectCSS("iframe[name='google_ads_frame'] { display: none; }");
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

    RemoveGoogleAds.checkPage();

})();
