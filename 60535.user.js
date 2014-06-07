// ==UserScript==
// @name            Dreamwidth Site Skin Detector
// @namespace       http://userscripts.org/scripts/show/60535
// @description     Add classes to BODY when site-skin-specific selectors are detected. Works for Tropospherical, Celerity and Gradation.
// @include         http://*.dreamwidth.org/*
// @license         (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

(function() {
    var bodytag = document.getElementsByTagName("body")[0];
    var alpha = document.getElementById("shim-alpha");
    var deco = document.getElementById("page-decoration");
    var horizontal = document.getElementsByClassName("horizontal-nav");
    var vertical = document.getElementsByClassName("vertical-nav");
        if (alpha) { bodytag.className += " " + "tropo"; }
        else if (deco) { bodytag.className += " " + "celerity"; }
        else if (horizontal) { bodytag.className += " " + "gradation-horizontal"; }
        else if (vertical) { bodytag.className += " " + "gradation-vertical"; }

    var loggedout = document.getElementById("login-table");
        if (loggedout) { bodytag.className += " " + "loggedout"; }

    var editprofile = document.getElementById("page_manageprofile");
        if (editprofile) { bodytag.className += " " + "editprofile"; }

    var comments = document.getElementById("page_talkread");
        if (comments) { bodytag.className += " " + "comments"; }

    var inbox = document.getElementById("page_inbox");
        if (inbox) { bodytag.className += " " + "inbox"; }

})();