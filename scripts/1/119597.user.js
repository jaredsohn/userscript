// ==UserScript==
// @name          AGOT Card Preview
// @namespace     google
// @author        smholloway
// @description   Simple userscript to hide the top banner bar in Google Reader
// @include       http://www.google.com/reader*
// @exclude       http://plus.google.com/*
// @version				001
// @require 	  http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

try {
    console.log("simple.user.js: Loading");

    // a function that loads jQuery and calls a callback function when jQuery has finished loading
    function addJQuery(callback) {
        console.log("simple.user.js: Adding jQuery to your browser instance.");

        var script = document.createElement("script");
        script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    // load jQuery and execute the main function
    addJQuery(main);

    // hide the black banner at the top of Google Reader
    function main() {
        console.log("simple.user.js: Hiding the black banner at the top of Google Reader");

        jQuery(document).ready(function ($) {
            if ($('#gb').length) {
                $('#gb').css("visibility", "hidden");
            }
        });

        console.log("simple.user.js: Loaded");
    }
} catch (e) {
    console.log("Failed loading simple.user.js");
}
