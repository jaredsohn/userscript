// ==UserScript==
// @name       Remove fb pub
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @match      https://www.facebook.com/*
// @updateURL      http://userscripts.org/scripts/show/385035
// @download       http://userscripts.org/scripts/show/385035
// @copyright  2014+, Pirlouwi
// ==/UserScript==

(function () {
    var url;
    function removeFacebookPub(e) {
        var tags = null, i;
        
        tags = document.body.getElementsByClassName("ego_column");
        for (i=0; i<tags.length; i++) {
            tags[i].style.display = 'none';
        }
    }
    
    document.addEventListener('DOMNodeInserted', removeFacebookPub);
})();