// ==UserScript==
// @name           Add Draft Save Links
// @version        1.2.2
// @namespace      http://stackoverflow.com/users/390278
// #description    Adds Save links for the post editor
// @include        http://stackoverflow.com/*
// @include        http://*.stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://*.superuser.com/*
// @include        http://serverfault.com/*
// @include        http://*.serverfault.com/*
// @include        http://stackapps.com/*
// @include        http://*.stackapps.com/*
// @include        http://askubuntu.com/*
// @include        http://*.askubuntu.com/*
// @include        http://*.stackexchange.com/*
// @updateURL      http://userscripts.org/scripts/source/102056.meta.js
// ==/UserScript==

(function() {
    function embedScript(id, main, globalFunctions) {
        var scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.id = id;
        var content = "";
        if (globalFunctions) {
            for (var name in globalFunctions) {
                content = content+name+"=("+globalFunctions[name].toString()+")();\n";
            }
        }
        content = content+"("+main.toString()+")();";
        scriptElement.textContent = content;
        document.getElementsByTagName("head")[0].appendChild(scriptElement);
        return scriptElement;
    }
    
    if (document.getElementById("post-editor") && !document.getElementById("show-editor-button")) {
        var name = "add-save-links";
        var addSaveLinks = function() {
            function saveDraft(delay) {
                if (!$(this).attr("disabled")) {
                    heartbeat.keypress({ which: null });
                    window.setTimeout(function() {
                        heartbeat.ping();
                        $("#save-links>a")
                            .attr("disabled", "disabled")
                            .fadeTo("fast", 0.2);
                        window.setTimeout(function() {
                            $("#save-links>a")
                                .fadeTo("slow", 1.0)
                                .removeAttr("disabled");
                        }, 10000);
                    }, delay||100);
                }
            }
            function clearDraft(delay) {
                if (!$(this).attr("disabled")) {
                    $("#wmd-input").val(" ");
                    $("#wmd-preview").html("");
                    $("#draft-saved").hide();
                    saveDraft.call(this, delay||1000);
                }
            }
            function checkHotkeys(e) {
                var pressedSave = e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode == 83;
                var pressedClear = e.ctrlKey && !e.altKey && !e.shiftKey && (e.keyCode == 8 || e.keyCode == 46);
                //console.log("ctrlKey="+e.ctrlKey+",altKey="+e.altKey+",shiftKey="+e.shiftKey+",keyCode="+e.keyCode+",which="+e.which+",pressedSave="+pressedSave+",pressedClear="+pressedClear);
                if (pressedSave) {
                    $("#save-links>a:first").each(function() {
                        saveDraft.call(this);
                    });
                } else if (pressedClear) {
                    $("#save-links>a:eq(1)").each(function() {
                        clearDraft.call(this);
                    });
                }
                return !pressedSave && !pressedClear;
            }
            var saveHotkey = "Ctrl+S";
            var clearHotkey = "Ctrl+Backspace";

            var $save = $("<a>Save</a>").attr({
                "id":    "save-draft",
                "title": "Save Draft "+saveHotkey,
            }).click(saveDraft);
            var $span = $("<span>")
                .css({"margin-right":"4px","float":"left"})
                .attr("id", "save-links").append($save);

            if ($("input[name='is-current']").length) {
                // is a post edit
                $save.text("Check for updates").attr({
                    "id": "check-update",
                    "title": "Check for updates "+saveHotkey,
                });

                $("#title").each(function() {
                    // add a return link for question edits
                    $("<div>").addClass("subheader").append(
                        $("<h1>").append(
                            $("<a>Return to Question</a>").attr({
                                "class": "question-hyperlink",
                                "href":  location.pathname.replace(/^\/posts\/(\d+)\/edit.*/, "/questions/$1"),
                            })
                        )
                    ).prependTo("#mainbar");
                });
            } else {
                // is a new question/answer
                var sep = "<span class='lsep'>|</span>";
                $("<a>Clear</a>").attr({
                    "id": "clear-draft",
                    "title": "Clear Draft "+clearHotkey,
                }).click(clearDraft).appendTo($span.append(sep));
            }

            $("#post-editor>.fl").append($span);
            $("#wmd-input").keydown(checkHotkeys);
        };
        embedScript(name, addSaveLinks);
    }
})();
