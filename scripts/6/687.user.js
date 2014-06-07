/*
Fark Butler
1.0
2005-03-07
Released under the BSD license
http://www.opensource.org/licenses/bsd-license.php

--------------------------------------------------------------------

This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
select "Basecamp CSS", and click Uninstall.
*/

// ==UserScript==
// @name            Fark Butler
// @description     strip down fark, just the links, thanks.
// @include         http://www.fark.com/*
// ==/UserScript==

(function() {

    var fark =
    {
        injectCSS: function(css)
        {
            head = window.document.getElementsByTagName("head")[0];
            style = window.document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        },

    	searchforlinks: function()
        {
			var allLinks = window._content.document.getElementsByTagName("a");

			for (i = 0; i < allLinks.length; i++)
			{
				if(allLinks[i].href.match(/go.fark.com/i) && allLinks[i].getAttribute("onmouseover"))
				{
					link = allLinks[i].getAttribute("onmouseover").split("'");
					allLinks[i].setAttribute("href",link[1]);
					allLinks[i].setAttribute("onmouseout","");
					allLinks[i].setAttribute("onmouseover","");
				}
			}
        }
    }

	fark.injectCSS("body { margin: 1em; padding-top: 108px; background: url(http://img.fark.com/images/com000.jpg) no-repeat 50% 5px; color: #333333; }");
	fark.injectCSS(".banhead { display: none;}");
	fark.injectCSS("form, .entirelefttoolbar, .entirerighttoolbar, .howto, .footnote, .topsubmit { display: none; }");
	fark.injectCSS(".dateheader { margin-top: 3em; background: #FFF; border-bottom: 1px solid #666666; font-weight: bold; font-size: 120%; }");
	fark.injectCSS(".nilink { margin: 0 5em; }");
	fark.searchforlinks();

})();