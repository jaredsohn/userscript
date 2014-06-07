// ==UserScript==
// @name            FocusTextElement
// @namespace       http://henohenomoheji-official.blogspot.com/
// @description     [Ctrl + Shift + F] でテキスト要素にフォーカスを移動します。選択文字も設定します。(MouseUpでも選択文字を設定します。)
// @require         http://code.jquery.com/jquery-2.1.0.min.js
// @include         *
// @downloadURL     https://userscripts.org/scripts/source/138804.user.js
// @updateURL       https://userscripts.org/scripts/source/138804.meta.js
// @version         3.1
// @author          Kocari
// ==/UserScript==

(function() {

    // Patch: Greasemonkey 1.0 + jQuery: Broken, with Workaround
    this.$ = this.jQuery = jQuery.noConflict(true);

    $(function() {
        var index = 0;
        var textElements = $("input[type='text'], input[type='search']");

        if (textElements.length >= 5) {
            return false;
        }

        $(window).on("keypress mouseup", function(event) {

            // [Ctrl + Shift + f], [mouseup]
            if ((event.ctrlKey == true && event.shiftKey == true && event.charCode == 70)
                    || event.type == "mouseup") {

                if (!(event.target.type == "text" || event.target.type == "search")
                        && document.getSelection().toString() != "") {
                    textElements.val(document.getSelection().toString());
                }
                if (event.type == "mouseup") {
                    return true;
                }
                textElements.eq(index).blur().focus().select();
                index++;
                // last text element
                if (textElements.length <= index) {
                    index = 0;
                }
                return false;
            }
        });
    });
})();
