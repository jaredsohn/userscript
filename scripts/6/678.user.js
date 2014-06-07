/*
    (c) Carlo Zottmann, carlo@g-blog.net
    http://G-Spotting.net/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Spurl.net Tweaks
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-05-30: Changes link styles, shifts focus from folders to tags.
// @include         http://*spurl.net/*
// @author          Carlo Zottmann <carlo@g-blog.net>
// @note            Copy, use, modify, spread as you see fit.
// ==/UserScript==

(function() {

    var Cleanup =
    {
        go: function()
        {
            this.injectCSS('A { text-decoration: none; }');
            document.getElementById("topnav").getElementsByTagName("a")[1].href = "http://www.spurl.net/myspurls/library.php";
            try {
                tabShow('tags');
            }
            catch (e) {}
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

    Cleanup.go();

})();
