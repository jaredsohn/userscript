// ==UserScript==
// @name            Ad Skipper fark.com v4
// @namespace       http://userscripts.org/people/1368
// @description     Hides the right column on fark for a clean, uncluttered look. Rewritten for new Fark design
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
              this.injectCSS("#bodyRightSideContainer { display:none; }\n #bodyHeadlineContainer { width:100%;!important }\n");
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