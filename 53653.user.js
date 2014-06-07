// ==UserScript==
// @name           GU link fix
// @namespace      NZ
// @author      MJ
// @description    Changes the Province info page links order
// @include        http://www.nukezone.nu/show.asp?Action=Players&X=*
// @include        http://www.nukezone.se/show.asp?Action=Players&X=*
// ==/UserScript==

//oh yeah opera handles textnodes differently!
function firstNode(node){
	var first = node.firstChild;
	while(first.nodeType != 1 && first.nextSibling) first = first.nextSibling;
	return first;
}
function lastNode(node){
	var last = node.lastChild;
	while(last.nodeType != 1 && last.previousSibling) last = last.previousSibling;
	return last;
}
function nextNode(node){
	var next = node.nextSibling;
	while(next.nodeType != 1 && next.nextSibling) next = next.nextSibling;
	return next;
}
function previousNode(node){
	var previous = node.previousSibling;
	while(previous.nodeType != 1 && previous.previousSibling) previous = previous.previousSibling;
	return previous;
}
function childNodes(node){
	var nodes = node.childNodes;
	var childs = new Array();
	for(var i = 0; i < nodes.length; ++i) if(nodes[i].nodeType == 1) childs.push(nodes[i]);
	return childs;
}

var centers = document.getElementsByTagName("center"); //oh yeah table design sucks
var links = childNodes(centers[1]);
var enemy, msg;
for(var i = 0; i < links.length; ++i){
	if(links[i].nodeName == "BR") continue;
	if(links[i].innerHTML.search(/message/) != -1) msg = links[i];
	else if(links[i].innerHTML.search(/Enemy/) != -1) enemy = links[i];
}
if(enemy) {
	var oldbr = nextNode(enemy);
	var newenemy = enemy.cloneNode(true);
	var newbr = oldbr.cloneNode(true);
	enemy.parentNode.insertBefore(newenemy, msg);
	enemy.parentNode.insertBefore(newbr, msg);
	enemy.parentNode.removeChild(oldbr);
	enemy.parentNode.removeChild(enemy);
}
