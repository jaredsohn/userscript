// ==UserScript==
// @name           Larger Mission Update
// @namespace      http://www.eklo.com/
// @description    Makes the Mission Update section on the Space Shuttle page larger for easier reading.
// @include        http://www.space.com/spaceshuttle/
// ==/UserScript==

var muDivs, muDiv;

muDivs = document.evaluate(
"//div[@class='missionupdate']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

if ( muDivs.snapshotLength == 1 )
{
    muDiv = muDivs.snapshotItem(0);
    muDiv.style.height = '800px';
}
else
{
    alert('expected one (1) missionupdate section, found: ' + muDivs.snapshotLength);
}