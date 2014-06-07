// ==UserScript==
// @name            Bloglines target="_blank" eliminator
// @namespace       http://xurble.org/userscripts
// @description     Stops bloglines from opening every goddamnded link in a new window
// @include         http://www.bloglines.com/*
// ==/UserScript==

(function () {

    var candidates = document.getElementsByTagName("a");

    for (var cand = null, i = 0; (cand = candidates[i]); i++) 
    {
        if (cand.getAttribute("target") != null)
        {
        	cand.setAttribute("target","");
        }
    }

})();