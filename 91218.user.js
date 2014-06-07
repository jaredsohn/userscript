// ==UserScript==
// @name           Travian Auto-Populate Fakes
// @namespace      none
// @description    none
// @include        http://*.travian.*/a2b.php?*
// ==/UserScript==

document.forms[0].elements.namedItem('t1').value = "1";

s = document.evaluate("//label/input[@type='radio' and @value='3']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null)

if (s && s.snapshotLength > 0) {
  s.snapshotItem(0).checked = true;
}
else {
  s = document.getElementsByName('c')
  for each(e in s) {
   if (e.value == '3') {
     e.checked = true
     return;
   }
  }
} 
