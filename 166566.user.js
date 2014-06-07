// ==UserScript==
// @name           Tatoeba: Select sentences
// @description    By left-clicking and dragging, you can select parts of sentences on tatoeba.org. Right-click to use a sentence as a link.
// @author         FlamingTofu
// @include        http://tatoeba.org/*
// @version        0.1
// ==/UserScript==
(function () {
    var els;
    els = document.querySelectorAll(".sentenceContent .text");
    [].forEach.call(els, function (el) {
        var href = el.getAttribute("href");
        el.removeAttribute("href");
        el.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            location.href = href;
        });
    });
}());