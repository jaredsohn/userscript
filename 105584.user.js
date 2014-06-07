
// ==UserScript==
// @name           Bionshed
// @namespace      Bionshed
// @include        http://forum.travian.it/*
// @include        http://forum.travian.*
// ==/UserScript==


function getElementsByClass( searchClass, domNode, tagNames) {
	if (domNode == null) domNode = document;
	if (tagNames == null) tagNames = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagNames);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}


document.getElementsByTagName('html')[0].style.backgroundImage="url('http://www.travian.it/img/x.gif')";
document.getElementsByTagName('html')[0].style.backgroundColor="#669933";
document.getElementById('footer').style.backgroundColor="#669933";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#669933";
}
for(i=0;i<28;i++){
elements[i].style.color="#FFFF00";
elements[i].style.background="transparent";
}

document.getElementsByTagName('img')[0].src = "http://www.travian.it/img/x.gif";
document.getElementById('navtabs').style.backgroundColor="#669933";

elements = getElementsByClass('newcontent_textcontrol');
for(i=0;i<elements.length;i++){
elements[i].style.background="#FFFF00";
}

elements = getElementsByClass('posthead');
for(i=0;i<elements.length;i++){
elements[i].style.background="#669933";
elements[i].style.border="1px solid #669933";
}

elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #669933";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://www.travian.it/img/x.gif')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
