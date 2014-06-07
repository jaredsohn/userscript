// ==UserScript==
// @name        Make code.google.com/p/ headers minimal
// @author      Tim 'mithro' Ansell <mithro@mithis.com> http://userscripts.org/users/mithro
// @license     Apache 2.0, http://www.apache.org/licenses/LICENSE-2.0.html
// @namespace   http://blog.mithis.net/
// @match       https://code.google.com/p/*
// @homepage    http://userscripts.org/scripts/show/441022
// @updateURL   https://userscripts.org/scripts/source/441022.meta.js
// @downloadURL https://userscripts.org/scripts/source/441022.user.js
// @version     0.2
// ==/UserScript==


GM_addStyle(" \
div.headbg { \
  display: none; \
} \
\
#mt .tab img { \
 width: 16px; \
 height: 16px; \
 float: left; \
 margin-right: 10px; \
} \
#mt span { \
float: right; \
}\
")

function FirstChildElement(n) {
  var x = n.firstChild;
  while (x.nodeType != 1) {
    x = x.nextSibling;
  }
  return x;
}

var name = document.getElementById('pname');
var logo = document.getElementById('plogo');

var mt = document.getElementById('mt');

FirstChildElement(mt).innerHTML =
  logo.innerHTML + 
  FirstChildElement(mt).innerHTML + 
  '&nbsp;-&nbsp;' +
  FirstChildElement(name).innerHTML;

var gaia = document.getElementById('gaia');
var gaia_span = FirstChildElement(gaia);
gaia_span.classList.add('tab');
gaia_span.classList.add('active');
mt.insertBefore(gaia_span, mt.getElementsByClassName('gtbc')[0]);
