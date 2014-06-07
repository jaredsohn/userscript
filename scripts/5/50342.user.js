// ==UserScript==
// @name           Usunięcie "Poleć Graczy"
// @version        1.0
// @author         krzysiek-94 (Plemiona Forum)
// @include http://pl*.plemiona.pl/game.php?*
// ==/UserScript==

function xpaths(path){
var xpathsR = document.evaluate(path,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
return xpathsR;}

var szpv = xpaths('//a[contains(@href,"mode=ref")]');
szpv.snapshotItem(0).parentNode.parentNode.removeChild(szpv.snapshotItem(0).parentNode);