// ==UserScript==
// @name           NZ Statistics Land Counter
// @namespace      NZ
// @author         Slewey
// @description    Displays total clan land in Statistics Central
// @include        http://*nukezone.*/clanstatistics.asp
// @include        http://*nukezone.*/clanstatistics.asp?Z=*
// @include        http://*nukezone.*/clanstatistics.asp?X=Military*
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
function skaicius(i){
	var sk = '', j;
	if(i == 0) {return '0';}
	while(i > 0){
		j = i - Math.floor(i/1000)*1000;
		i = Math.floor(i/1000);
		sk = (i>0?(j<10?'00'+j:(j<100?'0'+j:j)):j) + ' ' + sk;
	}
	sk[sk.length-1]='\0';
	return sk;
}

var totalland = 0;
var centers = document.getElementsByTagName("center");
var lastC = centers[1];

var contents = document.getElementsByClassName('content');
var rows = contents[0].getElementsByTagName('tr');
for (i = 0; i < rows.length; i++) {
	if(rows[i].className != 'header') {
		var columns = rows[i].getElementsByTagName('td');
		var landtd = columns[5];
		var landint = parseInt(landtd.innerHTML.replace(/\D/g,''));
		totalland += landint;
	}
}

lastC.innerHTML = "Total Land: <b>" + skaicius(totalland) +" m²</b>";