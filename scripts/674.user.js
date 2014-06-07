// ==UserScript==
// @name            Greasemonkey Wiki: Souped-up Fixed footer
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-04-28: Keep the footer at a fixed position, in the background. If I want to edit, I want to edit, I don't want to scroll around to find it. Hover the mouse over it to make it visible.
// @include         http://*.dunck.us/collab/*
// @include         http://dunck.us/collab/*
// ==/UserScript==

/*
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

(function() {

    var GreasemonkeyFooter =
    {
        go: function()
        {
            if (document.getElementById("footer"))
            {
                this.injectCSS("body { padding-bottom: 150px; } #footer { position: fixed; bottom: 0px; right: 5px; width: 50%;  -moz-opacity: 0.2; font-size: 70%; font-family: Arial, Helvetica, sans-serif; border: 3px solid black; } #footer INPUT { font-size: 80%; } #footer A { font-weight: bold; }");
                document.getElementById("footer").setAttribute("onMouseOver", "this.style.opacity = 1.0");
                document.getElementById("footer").setAttribute("onMouseOut", "this.style.opacity = 0.2");
            }
        },

        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    GreasemonkeyFooter.go();

})();
