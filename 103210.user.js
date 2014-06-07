// ==UserScript==
// @name   NZ Spy Summary
// @namespace  NZ
// @author  MJ
// @description  Adds spy summary for copy-paste
// @include    http://www.nukezone.nu/attack.asp?Action=Step3
// @include    http://www.nukezone.se/attack.asp?Action=Step3
// ==/UserScript==


//oh yeah opera handles textnodes differently!
function firstNode(node){
	var first = node.firstChild;
	while(first.nodeType != 1 && first.nextSibling) first = first.nextSibling;
	if(first.nodeType != 1) first = null;
	return first;
}
function lastNode(node){
	var last = node.lastChild;
	while(last.nodeType != 1 && last.previousSibling) last = last.previousSibling;
	if(last.nodeType != 1) last = null;
	return last;
}
function nextNode(node){
	var next = node.nextSibling;
	while(next.nodeType != 1 && next.nextSibling) next = next.nextSibling;
	if(next.nodeType != 1) next = null;
	return next;
}
function previousNode(node){
	var previous = node.previousSibling;
	while(previous.nodeType != 1 && previous.previousSibling) previous = previous.previousSibling;
	if(previous.nodeType != 1) previous = null;
	return previous;
}
function childNodes(node){
	var nodes = node.childNodes;
	var childs = new Array();
	for(var i = 0; i < nodes.length; ++i) if(nodes[i].nodeType == 1) childs.push(nodes[i]);
	return childs;
}
var result = document.createElement("span");
var rask = document.getElementsByClassName("AttackInfo");
var span = rask[0];
var tables = 1;
if(rask && span && span.innerHTML[0] == "S" && span.parentNode.innerHTML.search(/spy|spies/) != -1){
	var found = false;
	var a = firstNode(nextNode(nextNode(nextNode(span))));
	var province = a.innerHTML;
	result.innerHTML = "<br/>" + province;
	result.style.display = "block";
	result.style.textAlign = "left";
	result.style.width = "80%";
	span.parentNode.insertBefore(result,nextNode(nextNode(nextNode(nextNode(nextNode(span))))));
	var table = nextNode(result);
	var tr;
	while(table){
		while(table && table.nodeName != "TABLE") table = nextNode(table);
		if(table){
			tr = nextNode(firstNode(firstNode(table)));
			while(tr.className != "header") {
				if(lastNode(tr).innerHTML.search(/Few \(0/) == -1) {
					found = true;
					result.innerHTML += "<br/>" + firstNode(firstNode(tr)).innerHTML.replace(new RegExp('\\u00a0|&nbsp;'),'') + lastNode(tr).innerHTML.replace(new RegExp('\\u00a0|&nbsp;'),' ');
				}
				tr = nextNode(tr);
			}
			table = nextNode(table);
		}
	}
	
	if(!found) result.innerHTML += "<br/>None";
}
