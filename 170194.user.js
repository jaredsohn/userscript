// ==UserScript==
//
// @name           YouTube: no history.pushState
// @description    Removes Javascript-mediated loading (via history.pushState()) for related videos on YouTube and restores normal browser page loads to unbreak extensions
//
// @namespace      http://mathrick.org/userscripts/youtube-nopushstate.user.js
// @author         Maciej Katafiasz (http://mathrick.org)
// @license        MIT
//
// @version        1.1.1
// @changelog      1.1.1 Minor code cleanup
// @changelog      1.1 Handle Flash endscreen navigation as well as the HTML links
// @changelog      1.0 Initial version
//
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
//
// ==/UserScript==


(function(){
    var handler = function(event) { event.stopPropagation() }
    var links = document.querySelectorAll("a.spf-link")
    for (var i = 0; i < links.length; i++)
    {
        links[i].addEventListener("click", handler);
    }

    // Since the flash end screen also invokes history functions, we need to override pushState()

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = "history.pushState = function (a, b, url) { location.href = url; }";
    document.querySelector("body").appendChild(script);
})();
