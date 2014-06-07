// ==UserScript==
// @name           Kokosko13
// @namespace      Kokosko13
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
document.getElementsByTagName('html')[0].style.backgroundColor="#F081E3";
document.getElementById('footer').style.backgroundColor="#F081E3";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#F081E3";
}
for(i=0;i<28;i++){
elements[i].style.color="#241A7D";
elements[i].style.background="transparent";
}

document.getElementsByTagName('img')[0].src = "http://img64.imageshack.us/img64/1386/senzanomea.jpg";
document.getElementById('navtabs').style.backgroundColor="#F081E3";

elements = getElementsByClass('newcontent_textcontrol');
for(i=0;i<elements.length;i++){
elements[i].style.background="#F081E3";
}

elements = getElementsByClass('posthead');
for(i=0;i<elements.length;i++){
elements[i].style.background="#F081E3";
elements[i].style.border="1px solid #F081E3";
}

elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #F081E3";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://img40.imageshack.us/img40/15/senzanomew.jpg')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}