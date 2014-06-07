// ==UserScript==
// @name            FeedlySkimThroughEntry
// @namespace       http://henohenomoheji-official.blogspot.com/
// @description     Feedlyのエントリーを読み流します。
// @require         http://code.jquery.com/jquery-2.1.0.min.js
// @include         http://feedly.tld/*
// @include         https://feedly.tld/*
// @downloadURL     http://userscripts.org/scripts/source/177148.user.js
// @updateURL       http://userscripts.org/scripts/source/177148.meta.js
// @version         1.7
// @author          Kocari
// ==/UserScript==

(function() {

    // Patch: Greasemonkey 1.0 + jQuery: Broken, with Workaround
    this.$ = this.jQuery = jQuery.noConflict(true);

    $(function() {

        function Entry() {
            this.selector = "";
            this.entry = {};
            this.getEntry = function() {return $(".selectedEntry");};
            this.last = false;
            this.detectLast = function() {}
        }

        function Title() {
            this.selector = "u0EntryList";
            this.detectLast = function() {

                this.entry = this.getEntry();
                if (this.entry.length == 0) {
                    return false;
                }

                this.last = false;

                // frame
                if (this.entry.get(0).tagName == "TABLE") {
                    if (this.entry.parent().next().next().length == 0
                        && this.entry.parent().parent().next().length == 0) {
                        this.last = true;
                    }
                    return true;
                }

                // list
                if (this.entry.next().length == 0
                    && this.entry.parent().next().length == 0) {
                    this.last = true;
                }
            }
        }

        function Magazine() {
            this.selector = "u4EntryList";
            this.detectLast = function() {

                this.entry = this.getEntry();
                if (this.entry.length == 0) {
                    return false;
                }

                this.last = false;

                // frame
                if (this.entry.get(0).tagName == "TABLE") {
                    if (this.entry.parent().closest("#timeline").length > 0
                        && this.entry.parent().next().next().length == 0
                        && this.entry.parent().parent().next().length == 0) {
                        this.last = true;
                    }
                    return true;
                }

                // list
                if (this.entry.hasClass("u4Entry")
                        && this.entry.next().length == 0
                        && this.entry.parent().next().length == 0) {
                    this.last = true;
                }
            }
        }

        var entry = new Entry();
        var title = new Title();
        var magazine = new Magazine();

        $.extend(entry, title);

        $(document).on("keyup", function(event) {
            if (event.target.type == "text") {
                return true;
            }

            // Saved, Organize, Index, History, Preferences, Themes では実行しない
            if (document.URL.match(/#(saved|contents|index|label|preferences|themes)/)
                    // no unread articles in this section or display reatured
                    || $("#noUpdatesMessage").css("display") == "block") {
                return true;
            }

            // [j], [n]
            if (event.keyCode == 74 || event.keyCode == 78) {
                if (entry.last) {
                    // [Shfit + j]
                    dispatchKeyBoadEvent($("#feedlyPart0.area").get(0), 74);
                    entry.last = false;
                    return false;
                }
            }

            if (entry.selector == title.selector) {
                $.extend(entry, title);
            }
            if (entry.selector == magazine.selector) {
                $.extend(entry, magazine);
            }
            entry.detectLast();
        });

        // observe load entries
        var mutation = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.id == "loadingEntries") {
                    entry.selector = $("#timeline").attr("class").match(/u[0-9]EntryList/).toString();
                    entry.last = false;
                }
            });
        });
        mutation.observe($("#box.home").get(0), {child: true, subtree: true, attributes: true});

        /**
         * キーボードイベントを発動します
         *
         * @param element
         *        charCode
         */
        function dispatchKeyBoadEvent(element, charCode) {
            var keyBoad = document.createEvent("KeyboardEvent", true, true);
            keyBoad.initKeyEvent(
                              "keypress",       // in DOMString typeArg,
                              true,             // in boolean canBubbleArg,
                              true,             // in boolean cancelableArg,
                              null,             // in nsIDOMAbstractView viewArg, Specifies UIEvent.view. This value may be null.
                              false,            // in boolean ctrlKeyArg,
                              false,            // in boolean altKeyArg,
                              true,             // in boolean shiftKeyArg,
                              false,            // in boolean metaKeyArg,
                              0,                // in unsigned long keyCodeArg,
                              charCode          // in unsigned long charCodeArg
            );
            element.dispatchEvent(keyBoad);
        }
    });
})();
