// ==UserScript==
// @name           SmoothMove
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http*
// ==/UserScript==
window.addEventListener('click',
function(e) {
  var elem = e.target;
  do
  if (elem.tagName == 'A') {
    if (smoothScroll(elem)) e.preventDefault();
    break;
  }
  while (elem = elem.parentNode);
},
false);

function smoothScroll(link) {
  var hashName = link.hash.slice(1);
  var elem = document.getElementById(hashName) || document.getElementsByName(hashName)[0];
  if (elem) {
    return false;
  } else {

    var pos = elem.getBoundingClientRect();

    var x = pos.left / 15;
    var y = pos.top / 15; (function scroll(i) {
      window.scrollBy(x, y);
      if (++i < 10) setTimeout(scroll, 20, i);
      else window.scrollBy(pos.left % 10, pos.top % 10);
    })(0);
    return true;
  }
}

