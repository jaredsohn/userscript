// ==UserScript==
// @name           aldebaran_unlock
// @namespace      http://www.litres.ru/
// @description    unlocks clipboard functions within texts of Aldebaran e-library and removes the big flash banner
// @include        http://lib.aldebaran.ru/*
// ==/UserScript==

// first, we remove the flash banner
var fd = document.getElementById('FlashDiv');
if (fd)
{
fd.parentNode.removeChild(fd);
}
// ... twice
fd = document.getElementById('ml_flymedia');
if (fd)
{
fd.parentNode.removeChild(fd);
}
// now, to the copy protection.
var scr = document.createElement("script");
scr.text = "function LockSel() { \n" + 
"var holder = document.getElementById('chid'); \n" +
"if (holder == null || holder.innerHTML == '') { \n" +
"	window.setTimeout ('LockSel()', 10); \n" +
"} else { \n" +
" var spans = document.evaluate('//span[@class=\"h\"]', holder, \n" + 
"    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); \n" + 
"	for (var i = 0; i < spans.snapshotLength; i++) { \n" +
"		spans.snapshotItem(i).parentNode.removeChild(spans.snapshotItem(i)); \n" + 
"}}}\n LockSel(); \n";
document.body.appendChild(scr);
