// ==UserScript==
// @name           Google_Redirection_Remover
// @namespace      http://userscripts.org/scripts/show/105070
// @description    1. To Prevent Google search result links from turning into redirection links when clicked to avoid the whole Google from being blocked frequently in China because of the redirection of some search results; 2. To Open image search links directly(optional in code).
// @version        0.5.2
// @author         redWoods
// @include        http://www.google.com.*
// @include        http://news.google.com.*
// ==/UserScript==

/***************************************
Style Options of openning image search results:
    true  -- open image website directly
    false -- use google default
****************************************/
var image = true;

var allLinks = document.getElementsByTagName("a");
window.addEventListener("mouseover", function() {
    for (var i in allLinks)
    {
        if (allLinks[i].id == null || (allLinks[i].id.indexOf("gb_") == -1 && allLinks[i].id.indexOf("gbztm") == -1))
        {
            allLinks[i].removeAttribute('onmousedown');                     // for search
            if (image == true && allLinks[i].href.indexOf("imgres") != -1)  // for image
            {
                start = allLinks[i].href.indexOf("imgrefurl=");
                if (start == -1)    continue;
                start = start + 10;
                tmStr = allLinks[i].href.substring(start);
                stop  = tmStr.indexOf("&");
                tmStr = tmStr.substring(0, stop);
                allLinks[i].href = decodeURIComponent(tmStr);
            }
        }
    }
}, false);
