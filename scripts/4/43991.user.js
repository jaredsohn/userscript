// ==UserScript==
// @name           OkCupid non-jumpy user tests section
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Prevent the User Tests section in the sidebar of the OkCupid root page from making the content below jump around, as it cycles through different-height entries, nor pan to the top of the document when clicking pause / unpause.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @include        http://www.okcupid.com/home*
// ==/UserScript==

var tests = $X('id("test_slideshow")');
var max_h = Math.max.apply(Math, $x('li', tests).map(getHeight));
tests.style.minHeight = max_h + "px";
var pause = $X('id("test_playpause")/a[@href="#"]');
if (pause) pause.addEventListener("click", dontPan, false);

function dontPan(e) {
  e.preventDefault();
}

function getHeight(li) {
  var is = li.style.display;
  li.style.display = "";
  var height = li.offsetHeight;
  li.style.display = is;
  return height;
}
