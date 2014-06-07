// ==UserScript==
// @name            FeedlyFlickEntry
// @namespace       http://henohenomoheji-official.blogspot.com/
// @description     Feedlyの無関心なエントリーを既読にします。
// @require         http://code.jquery.com/jquery-2.1.0.min.js
// @require         http://code.jquery.com/ui/1.10.4/jquery-ui.min.js
// @include         http://feedly.tld/*
// @include         https://feedly.tld/*
// @downloadURL     https://userscripts.org/scripts/source/176103.user.js
// @updateURL       https://userscripts.org/scripts/source/176103.meta.js
// @grant           GM_getValue
// @grant           GM_setValue
// @version         3.0
// @author          Kocari
// ==/UserScript==

(function() {

    // Patch: Greasemonkey 1.0 + jQuery: Broken, with Workaround
    this.$ = this.jQuery = jQuery.noConflict(true);

    $(function() {

        // indifferent entry value store
        var indifferent = {
            value: {
                advertisement: "((^|\\[|［|【)(AD|PR)(:|：|\\]|］|】))"
            },
            key: {
                container: "flickEntryContainer",
                pattern: "indifferentEntryPattern",
                summary: "indifferentSummary",
                word: "indifferentWord",
                hilight: "indifferentHilight"
            }
        }

        var flickEntry = {
            styles: {
                hilight: ["<style id='hilightStyle'>"
                            , ".indifferent {background-color:#D9D9D9;}"
                        , "</style>"
                        , "<style id='feedlyStyleHelper'>"
                            , ".quicklisted {background-color:#F3FAF2 !important;}"
                            , ".selectedEntry {background-color:#FFFCDF !important;}"
                        , "</style>"
                ].join("\n"),
                container: ["<style id='containerStyle'>"
                                , "#draggable {position:fixed; cursor:default;}"
                                , "label {margin-right: 5px;}"
                                , "." + indifferent.key.container + " {font-family:consolas; padding:5px 10px; color:#F7F6F5; width:-moz-fit-content; z-index:100000; background-color:#111111; border-radius:4px; box-shadow:0 2px 4px rgba(0,0,0,0.2)}"
                                , ".check {margin-top:0px; vertical-align:middle;}"
                                , ".explanation {color:#727171;}"
                                , ".hilight {font-weight:bold; color:#3EB370; margin: 0 5px;}"
                                , "#" + indifferent.key.pattern + " {font-family:consolas; font-size:100%; width:100%; height:111px; margin:5px 0 5px 0;}"
                                , ".flickEntryButton {color:#727171; border-radius:2px; border:solid 1px #F0F0F0; margin: 0 2px; padding:0 30px; background:-moz-linear-gradient(center top,#FAFAF8,#EFEFEF);}"
                                , ".flickEntryButton:hover {color:#202020; border:solid 1px #DDDDDD; cursor:pointer;}"
                            , "</style>"
                ].join("\n")
            },
            container: "<div id='draggable' class='flickEntryContainer'>"
                            + "<header><span class='explanation'>Regular Expression Delimiter</span><span class='hilight'>|</span>[example: comment|advertisement]</header>"
                            + "<div>"
                                + "<textarea id='" + indifferent.key.pattern + "' placeholder='" + indifferent.value.advertisement + "' /></textarea>"
                            + "</div>"
                            + "<div>"
                                + "<label><input type='checkbox' class='check' id='" + indifferent.key.summary + "'>Contains Summary</label>"
                                + "<label><input type='checkbox' class='check' id='" + indifferent.key.word + "'>Word Boundary</label>"
                                + "<label><input type='checkbox' class='check' id='" + indifferent.key.hilight + "'>Hilight</label>"
                                + "<input type='button' class='flickEntryButton' id='save' value='Save'>"
                                + "<input type='button' class='flickEntryButton' id='cancel' value='Cancel'>"
                            + "</div>"
                    + "</div>"
        }

        /**
         * FlickEntry Settings Container
         */
        function FlickEntryContainer(styles, container) {
            this.styles = styles;
            this.container = container;
            this.complete = {load: false};
        }

        FlickEntryContainer.prototype = {

            load: function() {
                if (this.complete.load == false) {
                    $("head").append(this.styles);
                    $("body").append(this.container);
                    $('#draggable').draggable();

                    bindAction(this);

                    this.complete.load = true;
                }
            },

            display: function() {
                var documentSelection = escapeRexExp(document.getSelection().toString());
                var indifferentPattern = GMSession(indifferent.key.pattern);
                if (indifferentPattern == "") {
                    indifferentPattern = documentSelection;
                } else {
                    indifferentPattern = indifferentPattern + "|" + documentSelection;
                }
                $("#" + indifferent.key.pattern).val(indifferentPattern);
                $("#" + indifferent.key.summary).prop("checked", GMSession(indifferent.key.summary));
                $("#" + indifferent.key.word).prop("checked", GMSession(indifferent.key.word));
                $("#" + indifferent.key.hilight).prop("checked", GMSession(indifferent.key.hilight));
                $("." + indifferent.key.container).show();
                $("#" + indifferent.key.pattern).focus();
            },

            close: function() {
                $("." + indifferent.key.container).hide();
            },

            save: function() {
                // word
                isWordBoundary = Boolean($("#" + indifferent.key.word + ":checked").val());
                GMSession(indifferent.key.word, isWordBoundary);

                // pattern
                indifferentPattern = rectifyRegExp($("#" + indifferent.key.pattern).val());
                GM_setValue(indifferent.key.pattern, indifferentPattern);
                if (isWordBoundary) {
                    indifferentPattern = wrapWord(indifferentPattern, "|", "\\b");
                }
                indifferentPattern = new RegExp(indifferent.value.advertisement + indifferentPattern, "ig");

                // summary
                isContainSummary = Boolean($("#" + indifferent.key.summary + ":checked").val());
                GMSession(indifferent.key.summary, isContainSummary);

                // hilight
                isHilight = Boolean($("#" + indifferent.key.hilight + ":checked").val());
                GMSession(indifferent.key.hilight, isHilight);

                this.savePosition();
                this.close();
                $("#pageActionRefresh").click();
            },

            savePosition: function() {
                var container = $("." + indifferent.key.container);
                if (container.length > 0) {
                    var position = {};
                    position["top"] = container.css("top");
                    position["bottom"] = container.css("bottom");
                    position["left"] = container.css("left");
                    position["right"] = container.css("right");

                    var textarea = container.find("#" + indifferent.key.pattern);
                    position["height"] = textarea.css("height");
                    position["width"] = textarea.css("width");
                    GMSession(indifferent.key.container, JSON.stringify(position));
                }
            },

            loadPosition: function() {
                var container = $("." + indifferent.key.container);

                // initial
                if (GMSession(indifferent.key.container) == "") {
                    container.css("top", window.innerHeight - container.innerHeight());
                    container.css("left", document.documentElement.clientWidth - container.innerWidth());
                    return false;
                }

                // disappear
                var position = $.parseJSON(GMSession(indifferent.key.container));
                if (window.innerHeight < rejectUnit(position["top"])
                        || window.innerHeight < rejectUnit(position["bottom"])
                        || document.documentElement.clientWidth < rejectUnit(position["left"])
                        || document.documentElement.clientWidth < rejectUnit(position["right"])) {

                    container.css("top", window.innerHeight - container.innerHeight());
                    container.css("left", document.documentElement.clientWidth - container.innerWidth());
                    return false;
                }

                // approximate
                var approximate = 10;
                var textarea = container.find("#" + indifferent.key.pattern);
                if (rejectUnit(position["width"]) < rejectUnit(textarea.css("width")) + approximate
                        && rejectUnit(position["height"]) < rejectUnit(textarea.css("height")) + approximate
                        && rejectUnit(position["bottom"]) < approximate
                        && rejectUnit(position["right"]) < approximate) {

                    container.css("top", window.innerHeight - container.innerHeight());
                    container.css("left", document.documentElement.clientWidth - container.innerWidth());
                    return false;
                }

                // set position
                container.css("top", position["top"]);
                container.css("left", position["left"]);
                textarea.css("height", position["height"]);
                textarea.css("width", position["width"]);
            }
        }

        /**
         * bindAction
         * @param container
         */
        function bindAction(container) {
            $("#save").on("click", function() {
                container.save();
            });
            $("#cancel").on("click", function() {
                container.savePosition();
                container.close();
            });
            $(window).on("keypress", function(event) {
                // [esc]
                if (event.keyCode == 27) {
                    container.savePosition();
                    container.close();
                }
            });
        }

        // 無関心なエントリーを既読
        var mutation = new MutationObserver(function(mutations) {
                                // Saved, Organize, Index, History, Preferences, Themes では実行しない
                                if (/#(saved|contents|index|label|preferences|themes)/.test(document.URL)) {
                                    return false;
                                }

                                mutations.forEach(function(mutation) {

                                    // Settings
                                    if (mutation.target.id == "popupPart") {
                                        $(mutation.target).find("#listViewOldestFirst").after("<div id='settings' class='listViewCustomizerLabel'><div class='action'>Flick Entry Settings</div></div>");
                                        $("#settings").click(function() {
                                            flickEntryContainer.load();
                                            flickEntryContainer.display();
                                            flickEntryContainer.loadPosition();
                                            $(mutation.target).children().remove();
                                        });
                                    }

                                    // Flick Entry FEATURED
                                    if (/headline/.test(mutation.target.id)) {
                                        $(mutation.addedNodes).each(function (index, node) {
                                            if (node.id == "recommentationAreaHeadlines") {
                                                $(node).children("div[id$='_recommendation_holder']").each(function() {
                                                    var entry = $(this);
                                                    if (indifferentPattern.test(entry.find("a[id$='_main_title']").text())
                                                            || (isContainSummary && indifferentPattern.test(entry.find("div[id$='_main_summary']").children(":last").text()))) {

                                                        entry.find(".action").first().click();
                                                    }
                                                });
                                            }
                                        });
                                    }

                                    // Flick Entry
                                    if (/section\d_column\d/.test(mutation.target.id)
                                            // Exists unread articles
                                            && !/^No/.test($.trim($("span[class$='UnreadCountHint']").eq(0).text()))) {

                                        var entry = $(mutation.addedNodes);

                                        // There are no unread articles in this section
                                        if (entry.closest("#mainArea").children("#noUpdatesMessage").css("display") == "block") {
                                            return false;
                                        }

                                        // Titles
                                        if (entry.hasClass("u0Entry")) {
                                            if (indifferentPattern.test(entry.attr("data-title"))
                                                    || (isContainSummary && indifferentPattern.test(entry.find("span.u0Summary").text()))) {

                                                if (isHilight) {
                                                    var title = entry.find("a[id$='_main_title']").text();
                                                    var indifferentArray = title.match(indifferentPattern);
                                                    if (indifferentArray) {
                                                        $.each(indifferentArray, function(index, value) {
                                                            title = title.replace(value, "<span class='indifferent'>" + value + "</span>");
                                                        });
                                                        entry.find("a[id$='_main_title']").html(title);
                                                    }

                                                    if (isContainSummary) {
                                                        var summary = entry.find("span.u0Summary").text();
                                                        indifferentArray = summary.match(indifferentPattern)
                                                        if (indifferentArray) {
                                                            $.each(indifferentArray, function(index, value) {
                                                                summary = summary.replace(value, "<span class='indifferent'>" + value + "</span>");
                                                            });
                                                        };
                                                    }
                                                    entry.find("span.u0Summary").html(summary);
                                                }
                                                entry.click();
                                                entry.prev().remove();
                                                entry.attr("id", entry.attr("id").replace(/_abstract/, ""));
                                                entry.show();
                                            }
                                        }

                                        // Magazine, Card
                                        if (entry.hasClass("u4Entry") || entry.hasClass("u5Entry")) {
                                            if (indifferentPattern.test(entry.attr("data-title"))
                                                    || (isContainSummary && indifferentPattern.test(entry.find("div.summary > span").last().text()))) {
                                                entry.find(".action").first().click();
                                            }
                                        }
                                    }
                                });
                            });
        mutation.observe($("#box.home").get(0), {childList: true, subtree: true});

        /**
         * GM Session Accessor
         * (auto create key)
         *
         * @param key
         *        value
         */
        function GMSession(key, value) {
            if (arguments.length == 0) {
                return undefined;
            }
            if (arguments.length == 2) {
                GM_setValue(key, value);
            } else {
                if (GM_getValue(key) == undefined) {
                    GM_setValue(key, "");
                }
                return GM_getValue(key);
            }
        }

        /**
         * 正規表現であるかを判断します ([|]は除外)
         *
         * @oaram value
         */
        function isRegExp(value) {
            if (/\(|\)|\[|\]|\.|\?|\*|\^|\$/.test(value)) {
                return true;
            }
            return false;
        }

        /**
         * 正規表現を補正します
         *
         * @oaram value
         */
        function rectifyRegExp(value) {
            // 区切り文字を補正
            var rectifiedValue = value.replace(/\n/g, "").replace(/^\|*/, "|").replace(/\|+$/, "").replace(/\|\|+/, "|");

            // 正規表現を使用している場合はソートしない
            if (isRegExp(value)) {
                return rectifiedValue;
            }
            var array = rectifiedValue.split('|');
            return array.sort().join('|');
        }

        /**
         * 正規表現をエスケープします
         *
         * @oaram value
         */
        function escapeRexExp(value) {
            if (isRegExp(value) || /\|/.test(value)) {
                return value.replace(/\(/g, "\\(")
                            .replace(/\)/g, "\\)")
                            .replace(/\[/g, "\\[")
                            .replace(/\]/g, "\\]")
                            .replace(/\./g, "\\.")
                            .replace(/\?/g, "\\?")
                            .replace(/\*/g, "\\*")
                            .replace(/\^/g, "\\^")
                            .replace(/\$/g, "\\$")
                            .replace(/\|/g, "\\|");
            }
            return value;
        }

        /**
         * 単位を除去します
         *
         * @oaram value
         */
        function rejectUnit(value) {
            return Number(value.match(/[\-0-9]+/));
        }

        /**
         * 単語を包含します
         *
         * @param sentence
         *        delimiter
         *        wrapper
         */
        function wrapWord(sentence, delimiter, wrapper) {
            var wordArray = sentence.split(delimiter);
            var wrappedWordArray = [];
            $.each(wordArray, function(index, value) {
                if (value == "") {
                    wrappedWordArray.push(value);
                } else {
                    wrappedWordArray.push(wrapper + value + wrapper);
                }
            });
            return wrappedWordArray.join(delimiter);
        }

        /**
         * キーボードイベントを発動します
         *
         * @param element
         *        typeArg
         *        shiftKeyArg
         *        charCode
         */
        function dispatchKeyBoadEvent(element, typeArg, shiftKeyArg, charCode) {
            var keyBoad = document.createEvent("KeyboardEvent", true, true);
            keyBoad.initKeyEvent(
                            typeArg,        // in DOMString typeArg,
                            true,           // in boolean canBubbleArg,
                            true,           // in boolean cancelableArg,
                            null,           // in nsIDOMAbstractView viewArg, Specifies UIEvent.view. This value may be null.
                            false,          // in boolean ctrlKeyArg,
                            false,          // in boolean altKeyArg,
                            shiftKeyArg,    // in boolean shiftKeyArg,
                            false,          // in boolean metaKeyArg,
                            0,              // in unsigned long keyCodeArg,
                            charCode        // in unsigned long charCodeArg
            );
            element.dispatchEvent(keyBoad);
        }

        // initialize
        var indifferentPattern = GMSession(indifferent.key.pattern);
        var isContainSummary = GMSession(indifferent.key.summary);
        var isWordBoundary = GMSession(indifferent.key.word);
        var isHilight = GMSession(indifferent.key.hilight);

        if (isWordBoundary) {
            indifferentPattern = wrapWord(indifferentPattern, "|", "\\b");
        }
        indifferentPattern = new RegExp(indifferent.value.advertisement + indifferentPattern, "ig");

        var flickEntryContainer = new FlickEntryContainer(flickEntry.styles.container, flickEntry.container)
        $("head").append(flickEntry.styles.hilight);

        $(window).on("keydown keypress", function(event) {
            if (event.target.type == "text" || event.target.type == "textarea" || event.ctrlKey) {
                return true;
            }
            // [f] display settings
            if (event.keyCode == 70) {
                flickEntryContainer.load();
                flickEntryContainer.display();
                flickEntryContainer.loadPosition();
                return false;
            }
            // [i]preview
            if (event.charCode == 105) {
                // [Shift + v]
                dispatchKeyBoadEvent($("#box.home").get(0), "keypress", true, 86);
            }
        });

    });
})();
