// ==UserScript==
// @name          Extra Headings
// @namespace     www.academyx.com
// @description   repeat first row on tall tables
// @include       http://www.dqnews.com/*
// @include       http://finance.yahoo.com/*
// ==/UserScript==

intMinRows = 25;
bitCopyDescendentsToo = true;

aryTables = document.getElementsByTagName('table');

for(x=0; x < aryTables.length; x++) {

	thisTable = aryTables[x];
	if(thisTable.getElementsByTagName('tbody')) thisTable = thisTable.getElementsByTagName('tbody')[0];
	
	aryRows = thisTable.getElementsByTagName('tr');
	
	if(aryRows.length > intMinRows) {
	
		for(y=1; y<aryRows.length; y++) {
			if(y/intMinRows == parseInt(y/intMinRows)) {
				elmNewRowHeader = aryRows[0].cloneNode(bitCopyDescendentsToo);
				thisTable.insertBefore(elmNewRowHeader,aryRows[y]);
			}
		}
	}	
}