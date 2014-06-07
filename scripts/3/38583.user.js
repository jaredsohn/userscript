// RegExp Find user script
// version 0.05 Beta
// Richard H. Tingstad
//
// Works much like regular find in browsers, but is JavaScript and supports
// regular expressions.
//
// To use this script with Firefox, you need Greasemonkey. Works with Opera as
// well.
//
// 20100523 0.05 Fixed a small bug.
// 20100523 0.04 Rewrite, can now match across tags, etc.
// 20091002 0.03 Can switch between case sensitive and case insensitive search.
// 20090324 0.02 Slight performance improvement.
// 20081213 0.01 First version.
//
// ==UserScript==
// @name           RegExp-Find
// @namespace      http://drop.by
// @description    Regular expression find, search web pages.
// @include        *
// ==/UserScript==
(function () {
	window.addEventListener('keyup', globalKeyUp, 'true');
	window.addEventListener('keydown', globalKeyDown, 'true');

	var find=null;

var className = "rhtregexpfind";
var isCtrl = false;
var isShift = false;
var caseSensitive = true;

function globalKeyDown(e){
	if(e.keyCode == 17) isCtrl = true;
	else if (e.keyCode == 16) isShift = true;
}
function globalKeyUp(e) {
	if(e.keyCode == 16) {
		isShift = false;
		return;
	}
	if(e.keyCode == 17) {
		isCtrl = false;
		return;
	}
	if (isCtrl && isShift && e.keyCode == 77) { // Ctrl + Shift + M
		caseSensitive = !caseSensitive;
		alert("Mode set to: Case " + (caseSensitive ? "" : "in") +"sensitive.");
	}
	if (isCtrl && isShift && e.keyCode == 78) { // Ctrl + Shift + N
		if(find!=null)
			find.next();
		return;
	}
	if (!isCtrl || !isShift || e.keyCode != 70) { // Ctrl + Shift + F
		return;
	}
	var s = prompt('RegExp Find:');
	if (s == null || s == '') return;
	if(find==null)
		find=new Find();
	else{
		find.clr();
		find.build();
	}
	find.findr(s);
}

function Find(node){
	if(!node)
		node=document.getElementsByTagName('body')[0];
	this.rootNode=node;
	this.hits=0;
	this.selected=0;
	this.selection=[];
	this.build();
}

/** Clears highlightings from previous searches. **/
Find.prototype.clr=function(){
	if(this.hits==0)return;
	var nodes=[];
	var c=0;
	var i;
	for(i=0;i<this.hits;i++){
		var j;
		for(j=0;j<this.selection[i].nodes.length;j++){
			nodes[c++]=this.selection[i].nodes[j];
		}
	}
	for(i=0;i<c;i++){
		var node=nodes[i];
		var parent=node.parentNode;
		var t='';
		var sibling=node.previousSibling;
		if(sibling!=null && sibling.nodeType==3){//Text node.
			t=sibling.textContent;
			parent.removeChild(sibling);
		}
		t+=node.childNodes[0].textContent;
		sibling=node.nextSibling;
		if(sibling!=null && sibling.nodeType==3){//Text node.
			t+=sibling.textContent;
			parent.removeChild(sibling);
		}
		parent.replaceChild(document.createTextNode(t),node);
	}
	this.selected=0;
	this.selection=[];
	this.hits=0;
}

/** Builds data structures to use in search. **/
Find.prototype.build=function(){
	var nodec=0;
	var nodes=[];
	var index=[];
	var text='';
	var lastSymbol='\n';

	traverse(this.rootNode,process);
	this.nodes=nodes;
	this.text=text;
	this.index=index;
	this.nodec=nodec;

	function traverse(node,func){
		function trav(node){
			if(!node) return;
			if(node.nodeType==1){//Element node.
				if(node.tagName=='TEXTAREA'
				   || node.tagName=='SCRIPT'
				   || node.tagName=='STYLE') return;
			}
			else if(node.nodeType!=3) return;//Text node.
			if(node.nodeType==3)//Text node.
				func(node);
			var children=node.childNodes;
			for(var i=0;i<children.length;i++){
				trav(children[i]);
			}
		}
		trav(node);
	}

	function process(node){
		var t=node.textContent;
		if(t!='\n' || lastSymbol!='\n'){
			nodes[nodec]=node;
			index[nodec]=text.length;
			++nodec;
			text+=t;
			lastSymbol=t.charAt(t.length-1);
		}
	}
}

/** Find regular expression. **/
Find.prototype.findr=function(s){
	var regex = new RegExp(s, caseSensitive ? "g" : "ig");
	var myArray;
	var text=this.text;
	while ((myArray = regex.exec(text)) != null){
		this.mark(myArray.index,regex.lastIndex);
	}
	if(this.hits<1)alert('Not found.');
	else{
		this.selection.sort(
			function(a,b){
				var r=a.y-b.y;
				if(r==0){
					r=a.from-b.from;
					while(r>=1||r<=-1)r/=10;
				}
				return r;
			});
		var i;
		var nodes=this.selection[this.selected].nodes;
		var n=nodes.length;
		for(i=0;i<n;i++){
			nodes[i].setAttribute('style','background-color:#00FF00');
		}
	}
}

/** Searches for a string. **/
Find.prototype.find=function(s){
	var last=-1;
	var text=this.text;
	while(true){
		var p=(last==-1 ? text.indexOf(s) : text.indexOf(s,last+s.length));
		if(p==-1){
			if(last==-1)alert('Not found.');
			break;
		}
		this.mark(p,p+s.length);
		last=p;
	}
}

/** Highlights everything between the given indeces in the flattened text. **/
Find.prototype.mark=function(from,to){
	var parts=0;
	var selected=[];
	var nodes=this.nodes;
	var index=this.index;
	var text=this.text;
	var first=this.nodec-1;
	var last=this.nodec-1;
	var i=0;
	for(i=0;i<this.nodec;i++){
		if(index[i]>from){first=i-1;break;}
	}
	for(i=first;i<this.nodec;i++){
		if(index[i]>=to){last=i-1;break;}
	}
	function createNode(){
		var d=document.createElement('span');
		d.setAttribute('style','background-color:#FFFF00');
		d.className=className;
		selected[parts++]=d;
		return d;
	}
	if(first==last){
		var start=document.createTextNode(text.substring(index[first],from));
		var middle=createNode();
		var len=to-from;
		middle.appendChild(document.createTextNode(
			nodes[first].textContent.substr(from-index[first],len)));
		var end=document.createTextNode(
			nodes[first].textContent.substr(from-index[first]+len));
		var parent=nodes[first].parentNode;
		parent.replaceChild(end,nodes[first]);
		parent.insertBefore(middle,end);
		parent.insertBefore(start,middle);

		nodes[first]=end;
		index[first]=to;
	}
	else{
		var start=document.createTextNode(text.substring(index[first],from));
		var end=createNode();
		end.appendChild(document.createTextNode(
			nodes[first].textContent.substr(from-index[first])));
		var parent=nodes[first].parentNode;
		parent.replaceChild(end,nodes[first]);
		parent.insertBefore(start,end);

		for(i=first+1;i<last;i++){
			var currentNode=nodes[i];
			var n=createNode();
			n.appendChild(currentNode.cloneNode(true));
			currentNode.parentNode.replaceChild(n,currentNode);
		}
		start=createNode();
		end=document.createTextNode(
			nodes[last].textContent.substr(to-index[last]));
		start.appendChild(document.createTextNode(
			nodes[last].textContent.substring(0,to-index[last])));
		var parent=nodes[last].parentNode;
		parent.replaceChild(end,nodes[last]);
		parent.insertBefore(start,end);

		nodes[last]=end;
		index[last]=to;
	}
	this.nodes=nodes;
	this.index=index;
	var hit=new Object();
	hit.nodes=selected;
	var node=selected[0];
	var y=0;
	do{
		y+=node.offsetTop;
		node=node.offsetParent;
	}while(node);
	hit.y=y>=20?y-20:y;
	hit.from=from;
	hit.to=to;
	if(this.hits==0){
		this.position=y;
		window.scroll(0,hit.y);
	}
	this.selection[this.hits++]=hit;
}

/** Returns currently highlighted match (string). **/
Find.prototype.getSelection=function(){
	var o=this.selection[this.selected];
	return this.text.substring(o.from,o.to);
}

/** Select (green hightlight) next match. **/
Find.prototype.next=function(){
	if(this.hits<2)return;
	var nodes=this.selection[this.selected].nodes;
	var i=0;
	for(i=0;i<nodes.length;i++){
		nodes[i].setAttribute('style','background-color:#FFFF00');
	}
	if(this.selected>=this.selection.length-1)
		this.selected=0;
	else
		this.selected++;
	nodes=this.selection[this.selected].nodes;
	for(i=0;i<nodes.length;i++){
		nodes[i].setAttribute('style','background-color:#00FF00');
	}
	window.scroll(0,this.selection[this.selected].y);
}

}
)();
