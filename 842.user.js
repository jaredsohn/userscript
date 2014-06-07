// ==UserScript==
// @name          Michael Jackson Related Reuters Stories Remover
// @author        Jonas Galvez <http://jonasgalvez.com/>
// @namespace     http://sharedobject.org/greasemonkey
// @include       http://www.bloglines.com/myblogs_display?sub=1447119*
// @include       http://bloglines.com/myblogs_display?sub=1447119*

// ==/UserScript==

(function() {

    var divs = document.getElementsByTagName("div");
    for(var i = 0; i < divs.length; i++) {
        if(divs[i].id.match(/siteItem\.\d+\.\d+/)) {
            if(divs[i].innerHTML.match(/(?:Michael )?Jackson(?:'s)?/i)) {
                divs[i].style["display"] = "none";
            }
        }
    }

})();
