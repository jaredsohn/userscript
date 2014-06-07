// ==UserScript==
// @name       The HyperG I Almost Was
// @namespace  http://nop.com/
// @version    0.1
// @description  Oh sure, 404 makes the web work, but linking to people's SVN repositories isn't so hot.
// @match      http://www.electricsheepcomix.com/almostguy/
// @copyright  2013, Jay Carlson (nop@nop.com) CC0 1.0 license; all rights waived.
// ==/UserScript==

(function() {
 
    // this would be the other thing to jam in
    // jquerycolor.src = "http://code.jquery.com/color/jquery.color-2.1.0.js";
    
    var script = document.createElement('script');
    script.type="text/javascript";
    script.src="http://place.org/~nop/jquery.tabSlideOut.v1.3.js";
    (document.body || document.head || document.documentElement).appendChild(script);
    
}());

    