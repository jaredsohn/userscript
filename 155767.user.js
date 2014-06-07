// ==UserScript==
// @name       Remove visited google results
// @version    0.1
// @description  Removes visited google results
// @match      http://google.*
// @match		http://www.google.*
// @match      https://google.*
// @match		https://www.google.*
// @copyright  2012+, You
// ==/UserScript==

setTimeout(yeahOkay, 2000);
function yeahOkay() {
    var visited = document.evaluate("//h3/a[contains(@class,'vst')]/../..",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < visited.snapshotLength; i++) {
        var v = visited.snapshotItem(i);
        v.parentNode.removeChild(v);
    }
}