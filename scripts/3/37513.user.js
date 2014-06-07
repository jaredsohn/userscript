// ==UserScript==
// @name           Big Box for pastebin.mozilla.org
// @namespace      http://jorendorff.com/
// @description    Make the textarea on pastebin.mozilla.org big
// @include        http://pastebin.mozilla.org/
// ==/UserScript==

(function () {

// I tried setting the height to a percentage of the window
// size, which would have been nicer... but px works;
// percentage does not.  (Generally the interaction between
// textarea.rows and CSS is inexplicable.)
//
var code = document.getElementById('code');
code.rows = 100;
code.style.height = (innerHeight - 200) + "px";

// oh, and another thing...
//
// pastebin goes out of its way to make it inconvenient to paste
// stuff in and then submit the form using only the keyboard.
// This last line corrects that.  It makes the Tab key advance
// to the next form field, instead of inserting a tab.
//
code.setAttribute('onkeydown', '');

}());
