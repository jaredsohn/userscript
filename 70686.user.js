// ==UserScript==
// @name           griffin.js
// @namespace      http://leprosorium.ru/users/shmel
// @description    This script is no longer maintained, use notextomate instead.
// @include        http://leprosorium.ru/*
// @include        https://leprosorium.ru/*
// ==/UserScript==

var zws = String.fromCharCode(0x200b);

function tranclucate(s) {
  var result = '';
  var counter = 0;
  for (var i in s) {
    var ch = s[i];
    result += ch;
    counter++;
    if ( counter >= 4 ) {
        result += zws;
        counter = 0;
    }
  }
  return result;
}

function handler(event) {
    if (event.keyCode != 32 || ! event.ctrlKey) return;

    var target = event.target;
    if (!/textarea/i.test(target.nodeName)) return;

    var start = target.selectionStart;
    var end = target.selectionEnd;
    if (start == end) return;

    var text = target.value.substring(start, end);

    text = tranclucate(text);

    target.value = target.value.substring(0, start) + text + target.value.substring(end);
    target.selectionStart = start;
    target.selectionEnd = start + text.length;

    event.preventDefault();
    if (window.opera && window.opera.postError) {
        setTimeout(function(){ target.focus() }, 0);
    }
}

document.addEventListener('keydown', handler, false);
