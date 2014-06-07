// ==UserScript==
// @name            Ad Skipper Indiatimes.com
// @namespace       http://www.thejo.in/code/greasemonkey
// @description     Disables the content area ads on Indiatimes.com. A minor modification of the Ad Skipper scripts from Carlo Zottman.
// @include         http://*indiatimes.com*
// ==/UserScript==

(function() {

    var AdSkipper =
    {
        checkPage: function()
        {
            currentURL = window._content.location.href;
            currentDoc = window._content.document;

            if (currentURL.match(/^http:\/\/[a-z0-9]+\.indiatimes\.com\//i))
            {
                this.injectCSS("IFRAME { display: none; }\nIMG[alt^='hier k'] { display: none; }");
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
