// Digg - Hide Buried Comments
// version 0.4 beta
// 2007-04-11 (last updated 2007-07-30)
// Author: Aaron McBride (http://www.apejet.org/aaron/)
// License: public domain (attribution appreciated)
// Description: Hides buried comments (and their children) on digg.
//
// Changes:
// 0.1 Initial release.  Just the basic function.
// 0.2 Added Show/Hide Buried link to comment tray in page.
// 0.3 Updated for the new AJAX comments (2007-06-18)
// 0.4 added  http://www.digg.com/* to the include list (2007-07-30)
//
// ==UserScript==
// @name           Digg Hide Buried Comments
// @namespace      http://www.apejet.org/aaron/
// @description    Hides buried comments (and their children) on digg.
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==


(function() {

    //modify the style for buried comments
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = "div.c-disabled { display: none;}";
    document.body.appendChild(style);
    
    //create Show/Hide Buried link next to options link
    var commentOptions = document.getElementById("c-options");
    
    if(commentOptions)
    {
        //create toggle link
        var anchor = document.createElement("a");
        anchor.href = "#";
        anchor.className = "c-tool-block";
        anchor.addEventListener('click', function (event) {
            if(this.innerHTML == "Show Buried")
            {
                var style = document.createElement("style");
                style.setAttribute("type", "text/css");
                style.innerHTML = "div.c-disabled { display: block;}";
                document.body.appendChild(style);
                this.innerHTML = "Hide Buried";
            }
            else
            {
                var style = document.createElement("style");
                style.setAttribute("type", "text/css");
                style.innerHTML = "div.c-disabled { display: none;}";
                document.body.appendChild(style);
                this.innerHTML = "Show Buried";
            }
            event.preventDefault();
        }, true);
        anchor.innerHTML = "Show Buried";
        commentOptions.appendChild(anchor);
    }
})();
