// ==UserScript==
// @name           NZ Land Counter
// @namespace      NZ
// @author           MJ
// @description    Displays total clan land in spy reports
// @include        http://www.nukezone.nu/clan.asp?Action=SpyReports&Q=*
// @include        http://www.nukezone.se/clan.asp?Action=SpyReports&Q=*
// ==/UserScript==
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
var contents = document.getElementsByClassName('content');
var provtr = firstNode(lastNode(contents[0]));
provtr = nextNode(provtr);
var spyinput = (firstNode(firstNode(provtr)).nodeName=='INPUT');
var totalland = 0;
while(provtr.className != 'header') {
	var landtd = (spyinput)?nextNode(nextNode(firstNode(provtr))):nextNode(firstNode(provtr));
	var landint = parseInt(landtd.innerHTML.replace(/\D/g,''));
	totalland += landint;
	provtr = nextNode(provtr);
}
var landtr = document.createElement('tr');
landtr.innerHTML = '<td align="right" colspan="'+(spyinput?2:1)+'">Sum:</td><td>'+skaicius(totalland)+' m²</td><td align="right" colspan="3">&nbsp;</td>';
provtr.parentNode.insertBefore(landtr,provtr);
if(contents[1]){
	var provtr = firstNode(lastNode(contents[1]));
	provtr = nextNode(provtr);
	var totallandun = 0;
	while(provtr.className != 'header') {
		var landtd = nextNode(firstNode(provtr));
		var landint = parseInt(landtd.innerHTML.replace(/\D/g,''));
		totallandun += landint;
		provtr = nextNode(provtr);
	}
	var landtr = document.createElement('tr');
	landtr.innerHTML = '<td align="right">Sum:</td><td>'+skaicius(totallandun)+' m²</td><td align="right" colspan="2">&nbsp;</td>';
	provtr.parentNode.insertBefore(landtr,provtr);
	var totalspan = document.createElement('span');
	totalspan.innerHTML = 'Total land: '+skaicius(totalland+totallandun)+' m²<br />';
	contents[1].parentNode.insertBefore(totalspan,contents[1].nextSibling);
}