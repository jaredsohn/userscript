// ==UserScript==
// @name            Hack Forums - Quick spoiler
// @namespace       Snorlax
// @description     Make a quick spoiler tag around your text when making a new thread or post.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
	return text;
}
shortcut.add("ALT+M",function() {
    str = getSelectionText();
    var value = $("textarea:focus").val();
    value = value.replace(str,"[sp]"+str+"[/sp]");
    $("textarea:focus").val(value);
});