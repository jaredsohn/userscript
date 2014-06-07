// ==UserScript==
// @name           CS2 Search fix
// @namespace      userscripts.org
// @description    adds mines & missing category to the search fields
// @include        http*://*.chosenspace.com/index.php?go=prices*
// ==/UserScript==
var pcatl=document.evaluate("//select[@name='price_cat_id']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var pcat=pcatl.snapshotItem(0);
if(pcat){
	var newopt=document.createElement('option');
	newopt.setAttribute('value','7');
	newopt.appendChild(document.createTextNode('Mines'));
	pcat.appendChild(newopt);
	pcatl=document.evaluate("//select[@name='price_item_id']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	pcat=pcatl.snapshotItem(0);
	newopt=document.createElement('option');
	newopt.setAttribute('value','0');
	newopt.appendChild(document.createTextNode(''));
	pcat.appendChild(newopt);
	newopt=document.createElement('option');
	newopt.setAttribute('value','163');
	newopt.appendChild(document.createTextNode('V-H Mine'));
	pcat.appendChild(newopt);
	newopt=document.createElement('option');
	newopt.setAttribute('value','164');
	newopt.appendChild(document.createTextNode('V-A Mine'));
	pcat.appendChild(newopt);
	newopt=document.createElement('option');
	newopt.setAttribute('value','165');
	newopt.appendChild(document.createTextNode('V-S Mine'));
	pcat.appendChild(newopt);
}

