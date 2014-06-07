// ==UserScript==
// @name            HoT or NoT Ad Remover
// @description     (2007-04-26) Removes ads from Hotornot.com.  Copy of Google Adsense remover.
// @include         http://*.hotornot.com
// @include         https://*.hotornot.com
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