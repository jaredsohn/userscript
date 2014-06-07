// ==UserScript==
// @name          Internet Soul Portraits
// @namespace     http://d.hatena.ne.jp/youpy
// @include       *
// ==/UserScript==

(function() {
    GM_addStyle("* { white-space: normal !important; text-align: left !important; text-indent: -2000em !important; }");
    document.body.innerHTML = document.body.innerHTML.replace(/<br[^>]*>/g, '<p>');
})();
