// ==UserScript==
// @name           xpeHoBuHa
// @namespace      http://leprosorium.ru/users/shmel
// @description    This script is no longer maintained, use notextomate instead.
// @include        http://leprosorium.ru/*
// @include        https://leprosorium.ru/*
// ==/UserScript==

var cyrCodes = [
/*  0x410, 0x412, 0x415, 0x41c, 0x41d, 0x41e, 0x420, 0x421, 0x425,*/
  0x430, 0x435, 0x43e, /*0x440, 0x441,*/ 0x443 /*, 0x445 */
];

//var lat = 'ABEKMHOPCTXaeopcyx';
var lat = 'aeoy';

function translateChar(s, idx) {
    var srcCode = s.charCodeAt(idx);
    for (var i in cyrCodes) {
        var curCode = cyrCodes[i];
        if (curCode > srcCode) break;
        
        if (curCode == srcCode)
            return lat[i];
    }

    return s[idx];
}

function tranclucate(s) {
  var result = '';
  var counter = 0;
  for (var i in s) {
    var ch = s[i];
    var trCh = translateChar(s, i);
    result += trCh;
    if (trCh != ch) counter++;
  }

//  alert('Replaced ' + counter.toString() + ' symbols');

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
