// ==UserScript==
// @name            Hack Forums - Bold, italic and underline quick add
// @namespace       Snorlax
// @description     Makes text bold, underlined and italic when using CTRL+b, CTRL+u and CTRL+i.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hackforums.net/showthread.php?tid=*
// @include         *hackforums.net/newreply.php?tid=*
// @include         *hackforums.net/editpost.php?pid=*
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
    value = value.replace(str,"[b]"+str+"[/b]");
    $("textarea:focus").val(value);
});

shortcut.add("Ctrl+I",function() {
    str = getSelectionText();
    var value = $("textarea:focus").val();
    value = value.replace(str,"[i]"+str+"[/i]");
    $("textarea:focus").val(value);
});

shortcut.add("Ctrl+U",function() {
    str = getSelectionText();
    var value = $("textarea:focus").val();
    value = value.replace(str,"[u]"+str+"[/u]");
    $("textarea:focus").val(value);
});  