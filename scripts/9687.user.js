// ==UserScript==
// @name           BabelZilla: Auto escape non-ASCII to escaped-unicode
// @namespace      tag:drry.jp,2009-05-06:
// @include        http://www.babelzilla.org/index.php?option=com_wts&Itemid=88&type=editfile*&*&filetype=properties
// @include        http://www.babelzilla.org/index.php?option=com_wtc&Itemid=192&type=editfile&*&filetype=properties
// ==/UserScript==
const VERSION = 3.1;
// <https://developer.mozilla.org/En/XUL_Tutorial:Property_Files#Escape_non-ASCII_Characters>
// <http://www.shuwasystem.co.jp/books/gremon/escape.html>

function escapeUnicode(s)   unescape(escape(s).replace(/%(?=u[0-9A-F]{4})/g, "\\"));
function unescapeUnicode(s) unescape(escape(s).replace(/%5C(?=u[0-9A-Fa-f]{4})/g, "%"));

var textareas = document.getElementsByTagName("textarea");
var i = textareas.length;
var textarea;
while (textarea = textareas.item(--i)) {
  if (textarea.getAttribute("name").substr(0, 8) != "strings[") continue;
  textarea.addEventListener("focus", function(e) {
    var t = e.target;
    t.value = unescapeUnicode(t.value);
  }, false);
  textarea.addEventListener("blur", function(e) {
    var t = e.target;
    t.value = escapeUnicode(t.value);
  }, false);
}