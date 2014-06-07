// ==UserScript==
// @name           Newsvine Highlight Satire
// @namespace      http://adamkemp.newsvine.com
// @description    Makes the satire tag more obvious.
// @include        http://*.newsvine.com/*
// @version        0.1
// ==/UserScript==
// $Id: newsvinehighlightsatire.user.js,v 1.1 2007/01/27 06:08:27 adam Exp $

(function() {
    function isTagsDiv(div)
    {
        return ( div.getAttribute("class") && div.getAttribute("class").indexOf("tags") != -1 );
    }

    function getTagsDiv()
    {
        var divs = document.getElementsByTagName("div");
        for(var i=0; i < divs.length; i++)
        {
            if(isTagsDiv(divs.item(i)))
                return divs.item(i);
        }

        return null;
    }

    function highlightSatire(tagsDiv)
    {
        tagsDiv.innerHTML = tagsDiv.innerHTML.replace(/\>satire\</,"><span style=\"font-size: 2em !important;\">satire</span><");
    }

    var tagsDiv = getTagsDiv();
    if( tagsDiv )
        highlightSatire(tagsDiv);

})();

// 0.1 - First version.
