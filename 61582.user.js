// ==UserScript==
// @name        Kill Arial
// @namespace   http://hansv.com/
// @description Replaces Arial with Helvetica. Derived from Zachary Voase's HelVimeo userscript.
// @version     1.1
// @include     *
// ==/UserScript==

function addGlobalStyle(css) {
  var head_elem = document.evaluate('//head', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!head_elem) { return; }
  var style_elem = document.createElement('style');
  style_elem.setAttribute('type', 'text/css');
  style_elem.textContent = css;
  head_elem.appendChild(style_elem);
}

addGlobalStyle(
   "@font-face {"
  +"  font-family: Arial;"
  +"  src: local(HelveticaNeueLTStd), "
  +"       local(HelveticaNeue), "
  +"       local(Helvetica); }"
);
