// ==UserScript==
// @name           Fitnesse Hotkeys
// @description    Adding intellij-like hotkeys to fitnesse
// @author         Jeremy Carlsten
// @include        http://*FrontPage*edit
// @version        1.2
// ==/UserScript==


var REFORMAT_HOTKEY = "alt+shift+o";
var REFORMAT_ALTERNATE_HOTKEY = "ctrl+shift+f";
var DUPLICATE_HOTKEY = "ctrl+d";
var DUPLICATE_ALTERNATE_HOTKEY = "ctrl+shift+down"
var REMOVELINE_HOTKEY = "ctrl+y";
var MOVE_LINE_UP_HOTKEY = "alt+shift+up";
var MOVE_LINE_DOWN_HOTKEY = "alt+shift+down";


//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.
(function (a) {
    function h(a, b) {
        var c = a.length;
        while (c--)if (a[c] === b)return c;
        return-1
    }

    function i(a) {
        var b, g, i, j, k;
        b = a.keyCode;
        if (b == 93 || b == 224)b = 91;
        if (b in d) {
            d[b] = !0;
            for (i in f)f[i] == b && (l[i] = !0);
            return
        }
        if (!l.filter.call(this, a))return;
        if (!(b in c))return;
        for (j = 0; j < c[b].length; j++) {
            g = c[b][j];
            if (g.scope == e || g.scope == "all") {
                k = g.mods.length > 0;
                for (i in d)if (!d[i] && h(g.mods, +i) > -1 || d[i] && h(g.mods, +i) == -1)k = !1;
                (g.mods.length == 0 && !d[16] && !d[18] && !d[17] && !d[91] || k) && g.method(a, g) === !1 && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, a.stopPropagation && a.stopPropagation(), a.cancelBubble && (a.cancelBubble = !0))
            }
        }
    }

    function j(a) {
        var b = a.keyCode, c;
        if (b == 93 || b == 224)b = 91;
        if (b in d) {
            d[b] = !1;
            for (c in f)f[c] == b && (l[c] = !1)
        }
    }

    function k() {
        for (b in d)d[b] = !1;
        for (b in f)l[b] = !1
    }

    function l(a, b, d) {
        var e, h, i, j;
        d === undefined && (d = b, b = "all"), a = a.replace(/\s/g, ""), e = a.split(","), e[e.length - 1] == "" && (e[e.length - 2] += ",");
        for (i = 0; i < e.length; i++) {
            h = [], a = e[i].split("+");
            if (a.length > 1) {
                h = a.slice(0, a.length - 1);
                for (j = 0; j < h.length; j++)h[j] = f[h[j]];
                a = [a[a.length - 1]]
            }
            a = a[0], a = g[a] || a.toUpperCase().charCodeAt(0), a in c || (c[a] = []), c[a].push({shortcut: e[i], scope: b, method: d, key: e[i], mods: h})
        }
    }

    function m(a) {
        var b = (a.target || a.srcElement).tagName;
        return b != "INPUT" && b != "SELECT" && b != "TEXTAREA"
    }

    function n(a) {
        e = a || "all"
    }

    function o() {
        return e || "all"
    }

    function p(a) {
        var b, d, e;
        for (b in c) {
            d = c[b];
            for (e = 0; e < d.length;)d[e].scope === a ? d.splice(e, 1) : e++
        }
    }

    function q(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, function () {
            c(window.event)
        })
    }

    var b, c = {}, d = {16: !1, 18: !1, 17: !1, 91: !1}, e = "all", f = {"?": 16, shift: 16, "?": 18, alt: 18, option: 18, "?": 17, ctrl: 17, control: 17, "?": 91, command: 91}, g = {backspace: 8, tab: 9, clear: 12, enter: 13, "return": 13, esc: 27, escape: 27, space: 32, left: 37, up: 38, right: 39, down: 40, del: 46, "delete": 46, home: 36, end: 35, pageup: 33, pagedown: 34, ",": 188, ".": 190, "/": 191, "`": 192, "-": 189, "=": 187, ";": 186, "'": 222, "[": 219, "]": 221, "\\": 220};
    for (b = 1; b < 20; b++)f["f" + b] = 111 + b;
    for (b in f)l[b] = !1;
    q(document, "keydown", i), q(document, "keyup", j), q(window, "focus", k), a.key = l, a.key.setScope = n, a.key.getScope = o, a.key.deleteScope = p, a.key.filter = m, typeof module != "undefined" && (module.exports = key)
})(this);

key.filter = function (event) {
    var tagName = (event.target || event.srcElement).tagName;
    key.setScope(/^(TEXTAREA)$/.test(tagName) ? 'input' : 'other');
    return true;
}

$(document).ready(function () {
    var $textarea = $('#pageContentId');

    key(REFORMAT_HOTKEY + ',' + REFORMAT_ALTERNATE_HOTKEY, function () { // seems to throw
        $(".edit_buttons input[value='Format']").trigger('click');
    });

    key(DUPLICATE_HOTKEY + "," + DUPLICATE_ALTERNATE_HOTKEY, function () {
        var caretPos = $textarea.caret();
        var currentLine = getCurrentLineText(caretPos.begin);
        if (currentLine != "\n" && currentLine != undefined && currentLine != "") {
            $textarea.duplicateLine(caretPos, currentLine);
        }
        return false;
    });
    key(REMOVELINE_HOTKEY, function () {
        var caretPos = $textarea.caret();

        var currentLine = getCurrentLineText(caretPos.begin);
        if (currentLine != "\n" && currentLine != undefined && currentLine != "") {
            $textarea.removeLine(caretPos, currentLine);
        }
        return false
    });
    key(MOVE_LINE_UP_HOTKEY, function () {
        var caretPos = $textarea.caret();
        var originalCurrentLine = getCurrentLineText(caretPos.begin);
        if (originalCurrentLine != "\n" && originalCurrentLine != undefined && originalCurrentLine != "") {
            $textarea.moveLineUp(caretPos, getCurrentLineTextAndAddId(caretPos.begin), originalCurrentLine);
        }
    });
    key(MOVE_LINE_DOWN_HOTKEY, function () {
        var caretPos = $textarea.caret();
        var originalCurrentLine = getCurrentLineText(caretPos.begin);
        if (originalCurrentLine != "\n" && originalCurrentLine != undefined && originalCurrentLine != "") {
            $textarea.moveLineDown(caretPos, getCurrentLineTextAndAddId(caretPos.begin), originalCurrentLine);
        }
    });


    $.fn.moveLineUp = function (location, lineTextWithId, originalLine) {
        var lines = this.val().split("\n");
        for (var i = 0; i < lines.length; i++) {
            if (lines[i] == lineTextWithId) {
                var previousLine = lines[i - 1];
                lines[i - 1] = originalLine;
                lines[i] = previousLine;

                this.val(lines.join("\n"));
                this.setCursorPosition(location.end - (previousLine.length + 1));
                break;
            }
        }
    };

    $.fn.moveLineDown = function (location, lineTextWithId, originalLine) {
        var lines = this.val().split("\n");
        for (var i = 0; i < lines.length; i++) {
            if (lines[i] == lineTextWithId) {
                var nextLine = lines[i + 1];
                lines[i + 1] = originalLine;
                lines[i] = nextLine;

                this.val(lines.join("\n"));
                this.setCursorPosition(location.end + (nextLine.length + 1));
            }
        }
    };


    $.fn.duplicateLine = function (location, lineText) {
        var fullVal = this.val();
        var lineEnd = getCurrentLineEnd(location.end);
        this.val(this.val().substring(0, lineEnd)
            + "\n"
            + lineText
            + fullVal.substring(lineEnd, this.val().length)
        );

        this.setCursorPosition(location.end);

    };

    $.fn.removeLine = function (location, lineText) {
        this.val(this.val().replace("\n" + lineText, ""));
        this.setCursorPosition(location.end);
    }

    function getCurrentLineText(caretPos) {
        var start;
        var end;
        var textAreaContent = $textarea.val();

        for (start = caretPos; start >= 0 && textAreaContent[start] != "\n"; --start);
        for (end = caretPos; end < textAreaContent.length && textAreaContent[end] != "\n"; ++end);


        return textAreaContent.substring(start + 1, end);
    }

    function getCurrentLineTextAndAddId(caretPos) {
        var start;
        var end;
        var textAreaContent = $textarea.val();

        for (start = caretPos; start >= 0 && textAreaContent[start] != "\n"; --start);
        for (end = caretPos; end < textAreaContent.length && textAreaContent[end] != "\n"; ++end);

        var lineWithId = "$ID$" + textAreaContent.substring(start + 1, end);

        $textarea.val(textAreaContent.substring(0, start)
            + "\n"
            + lineWithId
            + textAreaContent.substring(end, textAreaContent.length)
        );

        $textarea.setCursorPosition(end);


        return lineWithId;
    }

    function getCurrentLineEnd(caretPos) {
        var end;
        var textAreaContent = $textarea.val();
        for (end = caretPos; end < textAreaContent.length && textAreaContent[end] != "\n"; ++end);
        return end
    }

    $.fn.caret = function (begin, end) {
        if (this.length == 0) return;
        if (typeof begin == 'number') {
            end = (typeof end == 'number') ? end : begin;
            return this.each(function () {
                if (this.setSelectionRange) {
                    this.setSelectionRange(begin, end);
                } else if (this.createTextRange) {
                    var range = this.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', end);
                    range.moveStart('character', begin);
                    try {
                        range.select();
                    } catch (ex) {
                    }
                }
            });
        } else {
            if (this[0].setSelectionRange) {
                begin = this[0].selectionStart;
                end = this[0].selectionEnd;
            } else if (document.selection && document.selection.createRange) {
                var range = document.selection.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    };

    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    $(".hints ul").append("<li> Use Ctrl + D or Ctrl + Shfit + down to duplicate line. (Note: doesn't work if cursor is at the end of the line WIP.)</li>");
    $(".hints ul").append("<li> Use Ctrl + Y to remove a line. (Note: doesn't work if cursor is at the end of the line WIP.)</li>");
    $(".hints ul").append("<li> Use Ctrl + Shift + O or Ctrl + shift + f to format.</li>");
    $(".hints ul").append("<li> Use Alt + Shift + up to move line up.</li>");
    $(".hints ul").append("<li> Use Alt + Shift + down to move line down.</li>");
});