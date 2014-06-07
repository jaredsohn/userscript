// ==UserScript==
// @name           KokoskoFalcon
// @namespace      KokoskoFalcon
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


document.getElementsByTagName('html')[0].style.backgroundImage="url('')";
document.getElementsByTagName('html')[0].style.backgroundColor="#5884D6";
document.getElementById('footer').style.backgroundColor="#5884D6";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#5884D6";
}
for(i=0;i<28;i++){
elements[i].style.color="#241A7D";
elements[i].style.background="transparent";
}

document.getElementsByTagName('img')[0].src = "http://img855.imageshack.us/img855/8963/senzanomee.jpg";
document.getElementById('navtabs').style.backgroundColor="#5884D6";

elements = getElementsByClass('newcontent_textcontrol');
for(i=0;i<elements.length;i++){
elements[i].style.background="#241A7D";
}

elements = getElementsByClass('posthead');
for(i=0;i<elements.length;i++){
elements[i].style.background="#5884D6";
elements[i].style.border="1px solid #5884D6";
}

elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #5884D6";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://img40.imageshack.us/img40/15/senzanomew.jpg')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}