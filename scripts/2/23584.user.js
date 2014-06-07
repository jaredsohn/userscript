// ==UserScript==
// @name           Compact Autosale price sorter
// @description    Allows sorting of the compact autosale screen alphabetically, or by price (ascending or descending)
// @namespace      hunsley@gmail.com
// @include        *kingdomofloathing.com/sellstuff.php*
// ==/UserScript==

var price,text,name;
var optionArray = new Array();
sellOptionNodes = document.evaluate('//form[@name="sellall"]//select//option',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if(!sellOptionNodes) {
	return false;
}
for (var i=0;i<sellOptionNodes.snapshotLength;i++) {
	var tempOption = new Array();
	tempOption.node = sellOptionNodes.snapshotItem(i);
	
	text = tempOption.node.textContent;
	tempOption.name = text.split('(')[0];
	if (text.match(/\(.*\)\s\(.*\)/)) {
		whichGroup = 2;
	}
	else {
		whichGroup = 1;
	}
	tempOption.price = parseInt(text.split('(')[whichGroup].replace(/[^\d]/g,''));

	optionArray[i] = tempOption;
}

var sortOrder = GM_getValue('sortOrder','UNDEFINED');
if (sortOrder == 'UNDEFINED') {
	sortOrder = 'alpha';
	GM_setValue('sortOrder',sortOrder);
}

if((sortOrder == 'descending')||(sortOrder == 'ascending')) {
	ApplySort();
}

centerParentNode = document.evaluate('//form[@name="sellall"]/ancestor::center[1]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var sortSelect = document.createElement('select');
with (sortSelect) {
	var opt1 = document.createElement('option');
	opt1.value = "1";
	opt1.appendChild(document.createTextNode('Alphabetical'));
	if (sortOrder == 'alpha') {opt1.selected = 'true';}
	appendChild(opt1);

	var opt2 = document.createElement('option');
	opt2.value = "2";
	opt2.appendChild(document.createTextNode('Price (descending)'));
	if (sortOrder == 'descending') {opt2.selected = 'true';}
	appendChild(opt2);

	var opt3 = document.createElement('option');
	opt3.value = "3";
	opt3.appendChild(document.createTextNode('Price (ascending)'));
	if (sortOrder == 'ascending') {opt3.selected = 'true';}
	appendChild(opt3);

	addEventListener('change',function(event) {
		var newSortOrder = this.selectedIndex;
		switch(newSortOrder) {
			case 0: sortOrder = 'alpha'; break;
			case 1: sortOrder = 'descending'; break;
			case 2: sortOrder = 'ascending'; break;
		}
		GM_setValue('sortOrder',sortOrder);
		ApplySort();
	},true);
	
}
centerParentNode.insertBefore(sortSelect,centerParentNode.firstChild);

function ApplySort() {
	if (sortOrder == 'alpha') {
		optionArray.sort(AlphaSort);
	}
	else if(sortOrder == 'descending') {
		optionArray.sort(DescendingSort);
	}
	else if (sortOrder == 'ascending') {
		optionArray.sort(AscendingSort);
	}

	var parent = optionArray[0].node.parentNode;
	for(var i=0;i<optionArray.length;i++) {
		optionArray[i].node.parentNode.removeChild(optionArray[i].node);
	}
	for(var i=0;i<optionArray.length;i++) {
		parent.appendChild(optionArray[i].node);
	}	
}

function AlphaSort(a,b) {
	if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
	else if (a.name == b.name) return 0;
	else return 1;
}

function AscendingSort(a,b) {
	return (a.price - b.price);
}

function DescendingSort(a,b) {
	return (b.price - a.price);
}