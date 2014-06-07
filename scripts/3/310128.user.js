// ==UserScript==
// @name            SelectInputOnFocus
// @namespace       http://henohenomoheji-official.blogspot.com/
// @description     フォーカス時に入力値を選択します。
// @require         http://code.jquery.com/jquery-2.1.0.min.js
// @include         *
// @downloadURL     http://userscripts.org/scripts/source/310128.user.js
// @updateURL       http://userscripts.org/scripts/source/310128.meta.js
// @version         0.1
// @author          Kocari
// ==/UserScript==

(function() {

    // Patch: Greasemonkey 1.0 + jQuery: Broken, with Workaround
    this.$ = this.jQuery = jQuery.noConflict(true);

    $(function() {
        $("input, textarea").on("focus", function(event) {
            $(this).select();
        });
    });
})();
