// ==UserScript==

// @name           mine bug

// @namespace      http://none

// @description    mine bug reproduction

// @include        http://lunarwars.net/viewpage.php?page_id=8

// ==/UserScript==
function main() {
  var x = document.evaluate(
    '//FORM[1]/SELECT/OPTION/@value',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);
  if(!x.singleNodeValue) { alert("didn't find the form, sell to below your max mines"); }
  else {
    x.singleNodeValue.value = 1000;
    alert('first purchase option changed to 1000, click buy');
  }
}
window.addEventListener('load',function() {main()},false);