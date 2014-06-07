// ==UserScript==
// @name           Remove Print Friendly
// @namespace      rpf@kw.com
// @description    Removes the "Print Friendly" link from Roosterteeth forums
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// ==/UserScript==

(function() {
    if(document.URL.match("viewTopic.php") == "viewTopic.php") {
        var fBLP;
        var forumBox = document.getElementById("Forum");
        if(forumBox == null)
            forumBox = document.getElementById("Group Forum");
        var forumBoxLinks = forumBox.getElementsByTagName("a");
        for(i in forumBoxLinks) {
            if(forumBoxLinks[i].innerHTML == "<b>Print Friendly</b>") {
                fBLP = forumBoxLinks[i].parentNode;
                forumBoxLinks[i].parentNode.removeChild(forumBoxLinks[i]);
                break;
            }
            
        }
    }
    fBLP.innerHTML = fBLP.innerHTML.replace(/\[(.*?)\]/, "");
})();