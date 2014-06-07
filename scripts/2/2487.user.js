// ==UserScript==
// @name            Ad Skipper fark.com v3
// @namespace       http://userscripts.org/people/1368
// @description     Hides the left and right columns on fark for a clean, uncluttered look. Rewritten for FF1.5/GM0.6.4.
// @include         http://*.fark.com*
// ==/UserScript==

(function() {

    var AdSkipper =
    {
        checkPage: function()
        {
			currentURL = document.location.href;
            if (currentURL.match(/^http:\/\/((www|forums)\.)?fark\.com\//))
            {
				this.injectCSS(".newtoolbar { display:none; }\n");
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
    }
    AdSkipper.checkPage();
})();