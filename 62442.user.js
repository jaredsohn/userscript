// ==UserScript==
// @name           Select No
// @namespace      http://userscripts.org/scripts/show/13333
// @include        *
// ==/UserScript==



var z = document.evaluate('//input[@type="radio"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<z.snapshotLength; i++)
{
var node = z.snapshotItem(i);

if ( i < z.snapshotLength - 2 && node.value.toUpperCase() == "NO")
{
//node.checked = true;
node.click();
}

if ( i >= z.snapshotLength - 2 && node.value.toUpperCase() != "NO")
{
//node.checked = true;
node.click();
}
if (i <= 10 && node.value.toUpperCase() == "NO")
{
//node.checked = true;
node.click();
}
}

var y = document.evaluate('//input[@value="Skip"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<y.snapshotLength; i++)
y.snapshotItem(i).click();