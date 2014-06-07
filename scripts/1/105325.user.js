// ==UserScript==
// @id             GitHub: remove comment and close button on github issues
// @name           GitHub: remove comment and close button on github issues
// @namespace      http://coapp.org/
// @description    remove Github's comment and close button
// @include        https://github.com/*/*
// ==/UserScript==

(function() {
        var btn = document.querySelector('button[name="comment_and_close"]');
         if (btn) {
             btn.parentNode.removeChild(link);
        }
})();