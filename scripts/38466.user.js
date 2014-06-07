// ==UserScript==
// @name           visualization
// @namespace      forum
// @description    change txt to pic
// @include        http://uwants.com/*
// @include        http://discuss.com.hk/*
// ==/UserScript==
function visualize(n) {
if (n.childNodes){
if (n.childNodes[0].nodeType == 3 /*Node.TEXT_NODE*/) {       
 // If the node is a Text node, create a new Text node that        
// holds the uppercase version of the node's text, and use the        
// replaceChild() method of the parent node to replace the        
// original node with the new uppercase node.        
//var newNode = document.createTextNode(n.data.toUpperCase());  
n.innerHTML=n.innerHTML.replace(/:smile_(\d+):/ig,'<img  src="images/smilies/smile_'+"$1"+'.gif">' ).replace(/\[img.{0,10}\]/ig,'<img src="').replace(/\[\/img\]/ig,'"></img>').replace(/url=/ig,'a href=').replace(/url/ig,'a').replace(/]/ig,'>').replace(/\[/ig,'<').replace(/:loveliness:/ig,'<img  src="images/smilies/loveliness.gif" >').replace(/:funk:/ig,'<img  src="images/smilies/funk.gif" >');;
}
//parent.replaceChild(newNode, n);    }    
else {        
// If the node was not a Text node, loop through its children,        
// and recursively call this function on each child.        
var kids = n.childNodes;        
for(var i = 0; i < kids.length; i++) 
visualize(kids[i]);
    }
}
}
visualize(window.document.getElementsByTagName("body")[0]);
for (i=0;i<document.getElementsByTagName('div').length;i++){
	var div=document.getElementsByTagName('div');
	if (div[i].getAttribute('style')=='width: 100%;')
	div[i].setAttribute('style','width: 50%; margin-left: 10%;margin-right: auto;');
}
for (eval("var i=0 ;var div=document.getElementsByTagName('div')");i<div.length;i++){
	if (div[i].getAttribute('class')=='subtable altbg1')
	div[i].setAttribute('style','font-size: 15px');
}
for (var i=0;i<document.getElementsByTagName('quote').length;i++){
	var quote=document.getElementsByTagName('quote');
	quote[i].setAttribute('style','color: #000077;font-style: italic');
}
for (var i=0;i<document.getElementsByTagName('li').length;i++){
	var li=document.getElementsByTagName('li');
	li[i].setAttribute('style','margin: 3px;font-size:13px')
}
var bd=document.getElementsByTagName('body')[0];
bd.setAttribute('style','color: #0000FF');
document.vlinkcolor="#990099";
document.alinkcolor="#990099";
document.linkcolor="#990099";
/*function correction(){
	this['[url =]']='<url =>';
}

var correction=new correction();
alert(correction['[url =]']);*/