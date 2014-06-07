// ==UserScript==
// @name          What.cd categories to links
// @author        lwessman
// @description   Changes categories to links on What.cd
// @include       http://www.what.cd/browse.php*
// @include       http://what.cd/browse.php*
// @include       http://incegmbh.com/browse.php*
// @include       http://www.incegmbh.com/browse.php*
// @date          2007-11-23
// @version       1.1
// ==/UserScript==

var cats = document.evaluate("//label[contains(@for,'category')]",document, null, 6, null);
for (var i = 0; i < cats.snapshotLength; i++) {
 var cat = cats.snapshotItem(i);
 var a   = document.createElement('a');
 a.setAttribute('href', '/browse.php?cat%5B%5D='+cat.getAttribute('for').replace(/category/, ""));
 a.innerHTML = cat.firstChild.nodeValue;
 cat.replaceChild(a,cat.firstChild);
}