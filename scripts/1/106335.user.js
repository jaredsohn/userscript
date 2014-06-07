// ==UserScript==
// @name        Google Calendar Simplifier
// @namespace   http://userscripts.org/users/360423
// @description Allows more space to display calendar contents by collapsing search box.
// @include     http*://www.google.com/calendar/*render*
// @version     0.0.5
// @author      kaz_at_33
// ==/UserScript==

(function() {
    function $(id) { return document.getElementById(id); }

    // toggle showing/hiding search box
    function toggleHeader() {
        var header = $("vr-header");
        var value = header.style.display;
        header.style.display = (value == "none") ? "block" : "none";
    }

    (function setup() {
        // hide header area
        toggleHeader();

        // move Google logo to navigation area
        var header = $("vr-header");
        var nav = $("vr-nav");
        if (header && nav) {
            var logo = header.firstChild;
            logo.style.top = "-10px";
            nav.replaceChild(logo, nav.firstChild.nextSibling);
        }

        // add a toggle button to show/hide search box
        var viewMode = $("topRightNavigation").firstChild;
        var printButton = $("mg-print");
        if (viewMode && printButton) {
            var toggleButton = printButton.cloneNode();
            toggleButton.id = "toggleSearchBoxButton";
            toggleButton.title = "Toggle search box";
            toggleButton.innerHTML = "Search";
            toggleButton.onclick = toggleHeader;

            viewMode.appendChild(viewMode.firstChild.cloneNode());
            viewMode.appendChild(toggleButton);
        }
    })();
})();
