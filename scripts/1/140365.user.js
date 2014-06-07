// ==UserScript==
// @name        Full Stop Spacer
// @namespace   hmmmmm
// @description Places a space after full stops for better translation on Chrome. Should work with ajax now. 
// @include     http://sprashivai.ru/Evgenia_Diordiychuk
// @version     2.01
// ==/UserScript==

var Gbl_Timer = '';

AddSpace();
document.addEventListener('DOMNodeInserted', AjaxAddSpace, false);

function AddSpace(){
	txtNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var searchRE = new RegExp('\\.','gi'); 
	var replace = '. '; 
	for (var i=0;i<txtNodes.snapshotLength;i++) { 
		var node = txtNodes.snapshotItem(i); 
		node.data = node.data.replace(searchRE, replace);
	}
}

function AjaxAddSpace(){
	
	if(typeof(Gbl_Timer)=='number'){
		clearTimeout(Gbl_Timer);
		Gbl_Timer = '';
	}
	
	Gbl_Timer = setTimeout(function(){AddSpace();}, 200);

}
