/*
 Hide Google Redirects 1.0:
 -  Hide Google Redirects from view so that you can see the true URL you're
    visiting (and easily copy/paste it). Fully compatible with Google Personal
    Search History. 

 (c) 2005 David James
  james@cs.toronto.edu
  http://www.cs.toronto.edu/~james
 
*/ 

// ==UserScript==
// @name    Hide Google Redirects
// @namespace   http://www.cs.toronto.edu/~james/google
// @description Hide the Google Redirects from view so you can see the true URL you're visiting. Fully compatible with Google Personal Search History.
// @include http://*.google.*/*
// ==/UserScript==

/* THE PLAN:

1. Goal:     We want users to be able to copy URLs from search results and
             see the true URL they're visiting
   Solution: Get rid of Google's redirects.

2. Goal:     We want Google's personal search history to still work.
   Solution: Notify Google in the background using an XMLHttpRequest when you
             left click, right click, or use the keyboard to select a search
             result.

3. Goal:     We don't want to mess with Google's Revenue Model
   Solution: Don't mess with the redirects for Google ads. Instead, we do some
             sneaky tricks to play with the address bar. This doesn't fix
             copy/paste for Google ads, but it's the best we can do without 
             messing with Google's Revenue Model. As Sergei says, 
             Don't Be Evil. ;)

*/

(function() {

    // Get a URL using GM_xmlhttpRequest
    function GM_get(href) {
        GM_xmlhttpRequest({
            method:"GET",
            url: href,
            onload:function(result) { }
        });
    }

    // Loop through all the links
    for (var i = 0; i < document.links.length; i++) {
        
        // Create a new variable scope for each iteration of the loop
        (function() {
    
            // The link
            var elem = document.links[i];
        
            // Look for 'javascript' redirects
            // constructed by Google's personal history logger
            if (elem.onmousedown != null) {

                // Save and get rid of Google's javascript redirect --
                // we can do a better job using xmlHttpRequest
                elem._onmousedown = elem.onmousedown;
                elem.onmousedown = null;

                // Overwrite the onclick function
                elem.onclick = elem.onmouseup = function() {
                    // Notify Google that this link has been clicked
                    this._href = this.href;
                    this._onmousedown();
                    GM_get(this.href);
                    this.href = this._href;

                    // Don't notify Google twice if the user happens
                    // to right click the link twice
                    this.onclick = this.onmouseup = null;
                    return true;
                };

            // Look for Google Ads
            } else if (elem.href.match(/^http:\/\/[a-z.]+google.[a-z.]+\/pagead\/iclk\?adurl=([^&$]+)/i) ||
                    elem.href.match(/^http:\/\/[a-z.]+google.[a-z.]+\/url\?sa=l&q=([^&$]+)/i)) {


                var real_href = decodeURIComponent(RegExp.$1);
                var google_href = elem.href;

                // When the mouse is hovering over the link,
                // set the status bar to contain the link.
                elem.onmouseover = function() {
                    window.status = real_href;
                    this.href = real_href;
                    return true;
                };

                // When the mouse is moved away from the link,
                // set the status back to normal.
                elem.onmouseout = function() {
                    window.status = window.defaultStatus;
                    return true;
                };


                // When the user clicks on a link (left or right click),
                // set the href to point to the google version of the link
                elem.onmouseup = function() {
                    this.href = google_href;
                    return true;
                };

                // Save the old Click Handler if we have one around
                elem._onclick = elem.onclick;

                // When the user clicks on a link,
                // set the href to point to the google
                // version of the link
                elem.onclick = function() {
                    this.href = google_href;

                    // Delegate to the old click handler if it exists
                    if (this._onclick == null) {
                        return true;
                    } else {
                        return this._onclick();
                    }
                };

            // Look for other Google redirects (e.g. Google news)
            } else if (elem.href.match(/^http:\/\/[a-z\.]+google\.[a-z\.]+\/url\?sa=.+&q=([^&$]+)/i)) {
                var google_href = elem.href;
                elem.href = decodeURIComponent(RegExp.$1);
                elem.onclick = elem.onmouseup = function() {
                    // Notify Google that this link has been clicked
                    GM_get(google_href);

                    // Don't notify Google twice if the user happens
                    // to right click the link twice
                    this.onclick = this.onmouseup = null;
                    return true;
                };
            }
        })();
    }
})();
