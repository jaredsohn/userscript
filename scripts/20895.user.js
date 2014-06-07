// ==UserScript==
// @name           MandG tweaks
// @include        http://www.mandg.co.uk/Consumer/Home/index.jsp
// ==/UserScript==

var a_elements, a_element;
var regExpMatches, my_onclick, my_href;
var i;

a_elements = document.evaluate("//a[@onclick]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < a_elements.snapshotLength; i++) {
   a_element = a_elements.snapshotItem(i);
   my_onclick = a_element.getAttribute('onclick');
   if ((my_onclick !== null) && (my_onclick.indexOf("popUp") === 0)) {
      regExpMatches = my_onclick.match(/http.*? /);
      my_href = regExpMatches[0];
      a_element.setAttribute('href', my_href);
      a_element.removeAttribute('onclick');
   }
}