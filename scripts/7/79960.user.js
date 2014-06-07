// ==UserScript==
// @name           nohongo.j-talk.com - Kanji Converter
// @namespace      cocomonk22
// @description    Convert kanji to kanji with furigana on top in hiragana.
// @include        http://nihongo.j-talk.com/kanji/
// ==/UserScript==

document.getElementsByName("conversion")[2].checked=true;
document.getElementsByTagName("input")[3].checked=true;
document.getElementById("start_with_hiragana").checked=true;