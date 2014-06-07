// ==UserScript==
// @name       SearchOnZippy DirectLink hax0r
// @namespace  searchonzippy
// @version    0.1
// @description  Converts the links in results on searchonzippy.eu to direct-links to zippyshare.com
// @match      http://www.searchonzippy.eu/results.php*
// @copyright  2013+, Michael Nowak
// ==/UserScript==


var hax0r_run = null;
var hax0r_func = null;

document.addEventListener('DOMContentLoaded',function() {
    hax0r_func = function () {
        if (unsafeWindow.display) {
            unsafeWindow.eval(unsafeWindow.display.toString().replace(/var newLink.+/, 'var newLink = ["http://www", serverID, ".zippyshare.com/v/", key, "/file.html"].join("");'));
            clearInterval(hax0r_run);
            return true;
        } else {
            return false;
        };
    };
    
    hax0r_run = setInterval(hax0r_func, 100);
});