// ==UserScript==
// @name           Scratchy Database Parser
// @namespace      Ren Po Ken
// @description    Makes a table on the scratchy page that holds querries for Millenium's Scratchy Database
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

var allTables, thisTable;
//finds the outermost table to insert our element into
allTables = document.evaluate(
    "//table [@width='450']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

thisTable = allTables.snapshotItem(0);

var allDots;
//start searching for scratchy dots
allDots = document.evaluate(
    "//td/input/preceding-sibling::img", 
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var Bar="";

for (var i = 0; i < allDots.snapshotLength; i++) {
	switch (allDots.snapshotItem(i).src.substring(allDots.snapshotItem(i).src.lastIndexOf('scratch')+7, allDots.snapshotItem(i).src.length-4)) {
		case "spot":	//Unscratched Spot
		Bar+='-';	break;
		case "Jackpot":	//Billy Spot
		Bar+='B';	break;
		case "JackpotX"://Unscratched Legacy Spot
		Bar+='B';	break;
		case "Secret":	//Blue Potion Spot
		Bar+='S';	break;
		case "SecretX":	//Unscratched Blue Potion Spot
		Bar+='S';	break;
		case "NWW":	//Yoma Blood Spot
		Bar+='L';	break;
		case "NWWX":	//Unscratched Yoma Blood Spot
		Bar+='L';	break;
		case "Potion":	//Potion Spot
		Bar+='P';	break;
		case "PotionX":	//Unscratched Potion Spot
		Bar+='P';	break;
		case "1x":	//1x Spot
		Bar+='1';	break;
		case "1xX":	//Unscratched WhiteEye Spot
		Bar+='1';	break;
		case "2x":	//2x Spot
		Bar+='2';	break;
		case "2xX":	//Unscratched 2x Spot
		Bar+='2';	break;
		case "3x":	//3x Spot
		Bar+='3';	break;
		case "3xX":	//Unscratched 3x Spot
		Bar+='3';	break;}
	
	if (i==5||i==13||i==19) Bar+=' ';
	}
	
if (thisTable) {
    newElement = document.createElement('span');
	
	newElement.innerHTML = Bar;
	
    thisTable.parentNode.insertBefore(newElement, thisTable);
}