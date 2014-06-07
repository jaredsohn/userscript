// ==UserScript==
// @name           Strip tab headers
// @namespace      http://hvrauhal.blogspot.com/
// @description    Strip the site prefix
// @include        *
// ==/UserScript==
(function () { 
    function stripUpTo(delimiter, next) {
        GM_log("Stripping away " + delimiter);
        t = document.title;
        i = t.indexOf(delimiter);
        if (i > 0) {
	    document.title = t.substring(i + delimiter.length);
        } else {
	    next();
        }
    }
    
    stripUpTo(" - ", function () {
        stripUpTo(": ", function() {});
    });
}());
