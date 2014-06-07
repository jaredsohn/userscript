// ==UserScript==
// @name           NoFocus
// @namespace      http://kevinlocke.name
// @description    Prevent web pages from changing your focus.
//                 Optionally, prevent focus only during page load (+1 second),
//                 or prevent focus for the life of the page.
// ==/UserScript==

(function() {
    var focusafterload = true;  // Set to false to prevent focus permanently
    var originalfocus = {};
    var elementnames = [ "Anchor", "Button", "Input", "Select", "TextArea" ];
    var ename, i;

    function nofocus() {
        GM_log("Focus not permitted" + (focusafterload ? " during load" : ""),
            1 /* warning */);
    }

    function resetFocus() {
        var ename, i;
        for (i=0; i<elementnames.length; ++i) {
            ename = elementnames[i];
            unsafeWindow["HTML"+ename+"Element"].prototype.focus =
                originalfocus[ename];
        }
    }

    for (i=0; i<elementnames.length; ++i) {
        ename = elementnames[i];
        originalfocus[ename] =
            unsafeWindow["HTML"+ename+"Element"].prototype.focus;
        unsafeWindow["HTML"+ename+"Element"].prototype.focus = nofocus;
    }

    if (focusafterload) {
        window.addEventListener('load',
            function(e) { setTimeout(resetFocus, 1000); },
            false);
    }
}());
