// ==UserScript==
// @name           Contracts
// @namespace      Ranatama
// @include        http://*animecubed.com/billy/bvs/village.html
// ==/UserScript==


function speed(type){

var form = document.evaluate("//form[@name='cryo']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
var box = document.evaluate("//input[@name='numbercontract']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var text = form.innerHTML;
if(type == "Major") {
//major contracts
	var majorIndex = text.indexOf("Major Contract");
	var endIndex = text.indexOf("(+5");
	var num = parseInt(text.substring(majorIndex + 16, endIndex - 18));
	box.setAttribute("value", num);

}else{
	var minorIndex = text.indexOf("Minor Contract");
	var endIndex = text.indexOf("(+1");
	var num = parseInt(text.substring(minorIndex + 16, endIndex - 18));

	box.setAttribute("value", num);

}


}


var rdoBtn = document.evaluate("//input[@name='sellcontract']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if(rdoBtn.snapshotItem(0) != null){
var type = rdoBtn.snapshotItem(0).value;

rdoBtn.snapshotItem(0).addEventListener("click",function () { speed(type);}, false);

}
if(rdoBtn.snapshotItem(1) != null){
var type = rdoBtn.snapshotItem(1).value;
rdoBtn.snapshotItem(1).addEventListener("click",function () { speed(type);}, false);
}