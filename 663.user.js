/*
    Ad Skipper
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Ad Skipper GameSpot.com
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-04-28: Skips interstitial advertisements and disables the content area ads on GameSpot.com.
// @include         http://*gamespot.com*
// ==/UserScript==

(function() {

    var AdSkipper =
    {
        checkPage: function()
        {
            currentURL = location.href;
            currentDoc = document;

            if (currentURL.match(/^http:\/\/(www\.)?gamespot\.com\//))
            {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/If you see this ad more than once before GameSpot loads/i)
                    && !currentURL.match("gmRedir=1"))
                {
                    loc = currentURL.replace(/^http:\/\//, '');
                    loc += (currentURL.indexOf("?") != -1) ? "&" : "?";
                    loc += "gmRedir=1";
                    // alert(currentDoc.getElementsByTagName("body")[0].innerHTML.match(/click here to continue to GameSpot/i));
                    currentDoc.location.href = "http://chkpt.zdnet.com/chkpt/gs_skip_pre/" + loc;
                }
                else
                {
                    this.injectCSS("#newsstorympu, iframe[src^='http:\/\/altfarm'] { display: none; }");
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
        }
    }

    AdSkipper.checkPage();

})();
