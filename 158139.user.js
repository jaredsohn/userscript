// ==UserScript==
// @name        Wikia SpellChecker
// @namespace   Wikia SpellChecker
// @description Enables spell checker on Wikia.com sites
// @include     http://*.wikia.com/*
// @include     http://*.wikia-inc.com/*
// @include     https://*.wikia.com/*
// @include     https://*.wikia-inc.com/*
// @version     1
// ==/UserScript==

(function() {
    var enable = function() {
        try {
            unsafeWindow.$('div.editpage-editarea iframe')[0].contentDocument.body.spellcheck = true;
        } catch (e) {
            setTimeout(enable, 2000);
        }
    };
    enable();
}());
