// ==UserScript==
// @name        Kanji.koohii Stroke Order Adder
// @namespace   faleij
// @description Adds Kanjis Stroke Order
// @include     http://www.kanji.koohii.com/study/kanji/*
// @include     https://www.kanji.koohii.com/study/kanji/*
// @version     1.0
// @updateURL   http://userscripts.org/scripts/source/169652.meta.js
// ==/UserScript==

var stroke_container = ".k-sod";
var inject_container = document.createElement("div");
document.querySelector("#my-story .right").appendChild(inject_container);
GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.ig.gmodules.com/gadgets/proxy/refresh=31556926&container=ig/http://tangorin.com/kanji/"+document.querySelector(".kanji>span").textContent,
    onload: function(response) {
        var responseHTML = new DOMParser().parseFromString(response.responseText, "text/html");
        inject_container.appendChild(responseHTML.documentElement.querySelector(stroke_container));
    }
});