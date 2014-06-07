// ==UserScript==
// @name           Torncity War Base OK players
// @namespace      http://userscripts.org/users/59285
// @include        http://www.torncity.com/factions.php?step=hitlist
// ==/UserScript==

var ccTR;
var dfTR;

ccTR = document.evaluate(
    "//tr[@bgcolor='#cccccc']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < ccTR.snapshotLength; i++) 
{
    thisTR = ccTR.snapshotItem(i);
    TDs = thisTR.getElementsByTagName('td');
    if(TDs[3])
	{
		thisFont = TDs[3].getElementsByTagName('font');
		if(thisFont[0]) {
			if(thisFont[0].color == '#ff0000') 
			{
				thisTR.parentNode.removeChild(thisTR);
			}
		}
	}
}

ccTR = document.evaluate(
    "//tr[@bgcolor='#dfdfdf']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < ccTR.snapshotLength; i++) 
{
    thisTR = ccTR.snapshotItem(i);
    TDs = thisTR.getElementsByTagName('td');
    if(TDs[3])
	{
		thisFont = TDs[3].getElementsByTagName('font');
		if(thisFont[0]) {
			if(thisFont[0].color == '#ff0000') 
			{
				thisTR.parentNode.removeChild(thisTR);
			}
		}
	}
}
