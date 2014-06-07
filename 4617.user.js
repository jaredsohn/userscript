// ==UserScript==
// @name           ror-manual-print
// @namespace      http://dunck.us/code/greasemonkey/
// @description    Makes printing from manuals.rubyonrails.com bareable. (removes sidebar for TOC and de-colorizes code, which looks terrible in greyscale.)
// @include        http://manuals.rubyonrails.com/*
// ==/UserScript==

var s = document.getElementById("sidebar")
s.parentNode.removeChild(s)

var divs = document.getElementsByTagName('div');

for (var d,i=0;d=divs[i];i++) {
  if (d.getAttribute('class') == 'ruby') {
    d.setAttribute('class', '');
  }
}