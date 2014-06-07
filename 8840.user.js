// ==UserScript==
// @name            Fark Redesign Layout Fixer
// @namespace       http://userscripts.org/people/26476
// @description     Takes away that ugly right hand container, expands headlines/comments/profiles to fill in space, makes TF headings same color as nonTF.
// @include         http://*.fark.com*
// ==/UserScript==

(function() {

    var AdSkipper =
    {
        checkPage: function()
        {
			currentURL = document.location.href;
            if (currentURL.match(/^http:\/\/((www|forums|cgi)\.)?fark\.com\//))
            {
				this.injectCSS("#bodyRightSideContainer { display:none; }\n");
				this.injectCSS("#bodyMainContainer {width:986px;}");
				this.injectCSS("#bodyTabContainer {width:986px;}");
                                this.injectCSS("#bodyHeadlineContainer {width:100%;}");
                                this.injectCSS("#accordionExample {width:100%;}");
                                this.injectCSS("#commentsArea .ctableTF {background:#dfdfff;color:#3d3d3d;border:1px solid #3d3d3d;}");
                                this.injectCSS("#commentsArea .ctableTF a {color:#3d3d3d !important;}");
                                this.injectCSS("#commentsArea .ctableTF a:visited {color:#669 !important;}");
                                this.injectCSS("#commentsArea .ctableTF a:hover {color:#669 !important;}");
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
