// ==UserScript==
// @name        Backspace Means Backspace
// @namespace   https://github.com/infofarmer
// @version     0.1
// @description Prevents Back action on Backspace key
// @include     *
// @copyright   2014+, nollegcraft/playswithlife
// ==/UserScript==

window.addEventListener('keydown', function(e) {
    if (e.keyIdentifier == 'U+0008' || e.keyIdentifier == 'Backspace') {
        if (e.target == document.body) {
            e.preventDefault();
        }
    }
}, true);
