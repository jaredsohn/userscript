// ==UserScript==
// @name           Tatoeba plaintext sentences
// @description    Tatoeba sentences are selected when clicked. To follow a link, click on the arrow to the sentence's left.
// @author         FlamingTofu
// @include        http://tatoeba.org/*
// @version        0.1
// ==/UserScript==
(function () {
    var els, i;
    els = document.querySelectorAll(".sentenceContent .text");
    for (i = 0; i < els.length; i += 1) {
        els[i].removeAttribute("href");
        els[i].addEventListener("click", function (e) {
            var range = document.createRange();
            range.selectNode(this);
            window.getSelection().addRange(range);
        });
    }
}());