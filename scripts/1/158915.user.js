// ==UserScript==
// @name            Onliner hide comments
// @version         1.0
// @description     Hides comments block from onliner.by
// @include         *://onliner.by/*
// @include         *://*.onliner.by/*
// @copyright       2013, ffoxin <ffoxin@gmail>
// ==/UserScript==

;(function() {
    window.setTimeout(function check() {
        if (/^.*onliner\.by.*$/.test(document.URL)) {
            main();
        }
        window.setTimeout(check, 250);
    }, 250);

    function main() {
        var comments = document.getElementById('onliner_comments');
        if (comments) {
            comments.style.display = 'none';
        }
    }
})();
