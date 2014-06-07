// ==UserScript==
// @name           Dollar to Rupee Converter
// @namespace      http://www.techmonk.com
// @description    Converts rupee to dollar


// ==/UserScript==

$('body').mouseup(function() {
    alert(getSelectedText());
});

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}​