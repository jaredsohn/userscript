// ==UserScript==
// @name            Hack Forums - Clique color
// @namespace       Snorlax
// @description     Colors
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hackforums.net/showthread.php?tid=*
// @include         *hackforums.net/newreply.php?tid=*
// @include         *hackforums.net/newthread.php?tid=*
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

shortcut.add("Ctrl+B",function() {
    str = getSelectionText();
    var value = $("textarea:focus").val();
    value = value.replace(str,"[color=#ffffff]"+str+"[/color]");
    $("textarea:focus").val(value);
});