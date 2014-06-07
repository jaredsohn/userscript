// ==UserScript==
// @name			CoF Troll
// @namespace		CoF
// @description		Filters out annoying people.
// @version			1.1.0
// @author 			Snappy-Poo
// ==/UserScript==

// ==UserScript== Edited version of Mafia Wars Addomator found at http://userscripts.org/users/96500
var findPattern = "//li[span[a[contains(@href,'profile=198')]]]";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 

for ( var i=0 ; i < resultLinks.snapshotLength; i++ )
{
  resultLinks.snapshotItem(i).style.backgroundColor = 'yellow';
  resultLinks.snapshotItem(i).style.display = 'none';
}

findPattern = "//li[span[a[contains(@href,'profile=198')]]]/following-sibling::hr[1]";
resultLinks = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 

for ( var i=0 ; i < resultLinks.snapshotLength; i++ )
{
  resultLinks.snapshotItem(i).style.borderColor = 'red';
  resultLinks.snapshotItem(i).style.display = 'none';
}
