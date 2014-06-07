// ==UserScript==
// @name           stopTheScroll
// @namespace      stopTheScroll
// @include        https://music.sonyentertainmentnetwork.com/*
// ==/UserScript==
(function () {
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "window.jQuery=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    function main() {
        function p(a) {
            console.log(a);
        }

        function f() {
            var jQ = jQuery; //to avoid conflict
            var header = jQ("#centeredSite div:first div:first");
            jQ("img:first", header).hide(); //logo
            jQ("div:first", header).css("width", "900px");

            var view = jQ("div:first div:first div:first", header);
            view.css("width", "410px");
            jQ("> div:eq(0)", view).css("width", "410px");
            jQ("> div:eq(2)", view).css("width", "410px");
            jQ("> div:eq(0) > div > div > div:gt(0)", view).hide(); //album, artist
        }

        for (var i = 100; i < 100000; i *= 2) {
            setTimeout(f, i);
        }
    }
    addJQuery(main);
})();