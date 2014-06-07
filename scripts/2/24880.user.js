// ==UserScript==
// @name           PopyardImgWidth
// @namespace      popyard.org
// @include        http://www.popyard.com/*
// ==/UserScript==


var allElements, thisElement;
allElements = document.getElementsByTagName('img');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    thisElement.setAttribute('width','');
}


var allTables, thisTable;
allTables = document.getElementsByTagName('table');
for (var j = 0; j < allTables.length; j++) {
    thisTable = allTables[j];
	
	if (thisTable.width=="1128")
	{
		thisTable.setAttribute('width','850');
	}
    
}