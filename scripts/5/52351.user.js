// ==UserScript==
// @name           BDB spacer-B-gone
// @namespace      http://matkrig.bilddagboken.se
// @description    Ta bort spacer.gif från bilddagboken
// @include        http:/*bilddagboken.se*
// ==/UserScript==

document.addEventListener('DOMAttrModified', documentChanged, false);

function documentChanged(event) {
  var d = document.getElementById('showContentImageBlocker');
  d.style.visibility = 'hidden';
  d.parentNode.removeChild(d);
}
