// ==UserScript==
// @name    Automatic Page Refresh
// @namespace   refresh
// @description   Refreshes the page periodically.
// @author      Steve Heyes - http://steveheyes.co.uk @mrsteveheyes
// ==/UserScript==

(function () {
    if (window.fluid) {
        // The number of minutes you wait untill refresh
        var numberOfMin = 10;
        
        setTimeout(function(){
            window.location.reload();
        }, 1000*60*numberOfMin);
    }
})();