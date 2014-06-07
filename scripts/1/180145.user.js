// ==UserScript==
// @name          PolyFixuś
// @description   Przedefiniowuje domyślny skrót alt-s na alt-w.
// @include       http://forum.polygamia.pl/*
// @grant         none
// ==/UserScript==


if (typeof oEditorHandle_message != 'undefined') {

    var newSendKey = 'w';

    for (var i = 0, n = oEditorHandle_message.aKeyboardShortcuts.length; i < n; i++) {
        if (oEditorHandle_message.aKeyboardShortcuts[i].code  == 'submit') {
            oEditorHandle_message.aKeyboardShortcuts[i].key = newSendKey.toUpperCase().charCodeAt(0);
            break;
        }
    }

}