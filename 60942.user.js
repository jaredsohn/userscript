// ==UserScript==
// @name        ROT13
// @namespace   tag:4ntti.koskinen@gmail.com,2009:GM
// @description A simple ROT13 encoder/decoder
// @copyright   2009, Antti Koskinen
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version     1.0.0
// @include     *
// ==/UserScript==


function rot13(txt) {
    function rotate(char) {
        var c = char.charCodeAt(0);
        var limit = c > 90 ? 109 : 77; // After M/m go backwards
        c += c <= limit ? 13 : -13;
        return String.fromCharCode(c);
    }
    return txt.toString().replace(/[a-zA-Z]/g, rotate);
}

// A Range object look-a-like.
// Used when rotating inside a textarea.
function TARange() {
    this.elm = null;
    this.start = 0;
    this.end = 0;
}

TARange.prototype.toString = function () {
    if (this.elm) {
        return this.elm.value.substring(this.start, this.end);
    }
    return "";
};

TARange.prototype.deleteContents = function () { /* nop */ };

TARange.prototype.insertNode = function (node) {
    var orig = this.elm.value;
    this.elm.value = orig.substring(0, this.start) + node.nodeValue +
        orig.substring(this.end, orig.length);
};

function getRange() {
    function fromTextarea() {
        var tas, range, i, starts, ends;
        tas = document.getElementsByTagName('textarea');
        range = new TARange();
        for (i = 0; i < tas.length; i++) {
            try {
                range.start = tas[i].selectionStart;
                range.end = tas[i].selectionEnd;
                range.elm = tas[i];
                if (range.start != range.end) {
                    return range;
                }
            }
            catch (e) { }
        }
    }
    var sel = window.getSelection();
    // If getRangeAt fails, selected text should be inside a textarea.
    try {
        return sel.getRangeAt(0);
    } catch (e) {
        return fromTextarea();
    }
}

function rotateSelection() {
    var range, rot;
    range = getRange();
    if (!range) {
        return;
    }
    rot = document.createTextNode(rot13(range));
    range.deleteContents();
    range.insertNode(rot);
}

GM_registerMenuCommand("ROT13 encode/decode", rotateSelection);

