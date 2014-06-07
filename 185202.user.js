// ==UserScript==
// @name        StackOverflow indent
// @namespace   StackOverflow indent
// @description Indents to the next tab position when you press tab instead of moving focus to the next field
// @include     http://stackoverflow.com/*
// @version     1.1
// @grant       none
// ==/UserScript==

HTMLTextAreaElement.prototype.insertAtCaret = function (text) {
  text = text || '';
  if (this.selectionStart || this.selectionStart === 0) {
    var startPos = this.selectionStart;
    var endPos = this.selectionEnd;
    this.value = this.value.substring(0, startPos) +
      text +
      this.value.substring(endPos, this.value.length);
    this.selectionStart = startPos + text.length;
    this.selectionEnd = startPos + text.length;
  } else {
    this.value += text;
  }
};

HTMLTextAreaElement.prototype.getCurrentLineStart = function() {
    if (this.selectionStart || this.selectionStart === 0) {
        var startPos = this.selectionStart;
        var startOfLine = this.value.lastIndexOf("\n", startPos) + 1;
        return startOfLine;
    } else {
        return 0;
    }
};

var input = document.getElementById("wmd-input");
if (input == null)
    return;

input.addEventListener("keydown", function(event)
{
    if (event.keyCode == 9) {
        event.preventDefault();
        var lineStart = input.getCurrentLineStart();
        var currentPos = input.selectionStart;
        var relativePos = currentPos - lineStart;
        var spacesToNextTab = 5 - (relativePos + 1) % 4;
        var spaces = "";
        for (var i = 0; i < spacesToNextTab; i++) {
            spaces = spaces + " ";
        }
        input.insertAtCaret(spaces);
    }
}, false);