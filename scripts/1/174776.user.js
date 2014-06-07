// ==UserScript==
// @name            Quick Links
// @namespace       QuickLinks
// @description     Can make quick links
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *swiftforums.net/showthread.php?tid=*
// @include         *swiftforums.net/newreply.php?tid=*
// @include         *swiftforums.net/editpost.php?pid=*
// @include			*swiftforums.net/newthread.php?fid=*
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

shortcut.add("Ctrl+I",function() {
    str = getSelectionText();
    var value = $("textarea:focus").val();
    value = value.replace(str,"[img]"+str+"[/img]");
    $("textarea:focus").val(value);
});

shortcut.add("Ctrl+U",function() {
    str = getSelectionText();
    var value = $("textarea:focus").val();
    value = value.replace(str,"[url=http://www.example.com/]"+str+"[/url]");
    $("textarea:focus").val(value);
});
