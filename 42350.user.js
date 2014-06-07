// ==UserScript==
// @name           Hide Stop Watching
// @namespace      hsw@kwierso.com
// @description    Hides all "Stop Watching" links on the watchlist page.
// @include        http://*.roosterteeth.com/members/watchlist.php*
// ==/UserScript==

(function() {
var debug = false;
try {
    var allLinks = document.getElementsByTagName("a");
    for(i=allLinks.length-1;i>=0;i--) {
        if(allLinks[i].href.search("deleteWatch.php") != -1) {
            allLinks[i].parentNode.innerHTML = allLinks[i].parentNode.innerHTML.split("[")[0];
        }
        else if(allLinks[i].href.search("watchComments.php") != -1 || 
                allLinks[i].href.search("watch.php") != -1) {
            allLinks[i].parentNode.innerHTML = allLinks[i].parentNode.innerHTML.split("<br>")[0];
        }
    }
} catch(e) {if(debug) console.log(e);}
})();