// ==UserScript==
// @name            GoodBye Google AdSense!
// @description     It hides the announcements of Google AdSense 
// @include         http://*.com/*
// @include         http://*.com.ar/*
// @include         http://*.es/*
// @include         http://*.blogspot.com/
// @include         http://*.wordpress.com/*
// @include         http://*.net/*
// @include         http://*.org/*
// @include         http://*.us/*
// @include         http://*.com.es/*
// @include         http://*.info/*
// @include         http://*.gov/*
// @include         http://*.gob/*
// @include         http://*.name/*
// @include         http://*.org/*
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