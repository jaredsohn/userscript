// ==UserScript==
// @name           Reddit - Edit friend notes on user pages
// @namespace      http://userscripts.org/users/115800
// @description    Allows you to edit Friends with Benefits notes on user pages
// @include        http://*.reddit.com/user/*
// @exclude        *comscore*
// ==/UserScript==

(function() {
    $ = unsafeWindow.jQuery;
    if ($) {
        // Get note if it exists
        note = /\((.*)\)/.exec($(".author").attr("title"));
        if (!note) {
            note = "";
        }
        else {
            note = note[1];
        }

        // Add note form
        $(".fancy-toggle-button").after("\
<form id=\"noteForm\">\
<label for=\"noteText\">Note: </label>\
<input id=\"noteText\" type=\"text\" name=\"note\" maxlength=\"300\" value=\"" + note.replace(/"/g, "&quot;") + "\"/>\
<input id=\"noteSubmit\" type=\"submit\" value=\"save\"/>\
</form>");

        noteForm = $("#noteForm");
        noteText = $("#noteText");
        noteSubmit = $("#noteSubmit");

        // Hide form if user is not a friend
        if (!$(".remove.active").length) {
            noteForm.hide();
        }

        // Style form
        noteForm.css("margin-bottom", "7px");
        noteText.css("width", "296px");
        noteSubmit.hide();
        noteSubmit.css("float", "right");

        // Show submit button on focus
        noteText.focus(function() {
            noteSubmit.show();
        });

        // Submit
        noteForm.submit(function() {
            noteSubmit.val("saving...");
            noteSubmit.get(0).disabled = true;
            $.ajax({
                type: "POST",
                url: "http://www.reddit.com/api/friendnote",
                data: "name=" + $("h1").eq(0).text() + "&note=" + escape(noteText.val()),
                success: function(msg) {
                    noteSubmit.get(0).disabled = false;
                    noteSubmit.val("save");
                }
            });
            return false;
        });

        // Show form when friend added
        $(".add").click(function() {
            // Use refer(r)er if it exists
            noteText.val("" || document.referrer);
            noteForm.show();
        });

        // Hide form when friend removed
        $(".remove").click(function() {
            noteForm.hide();
        });
    }
})();
