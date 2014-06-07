// ==UserScript==
// @name           JadisSkin
// @namespace      JadisSkin
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


//Modifico il colore ai link
elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#da16d3";
}
for(i=0;i<28;i++){
elements[i].style.color="white";
elements[i].style.background="transparent";
}


//header
document.getElementsByTagName('img')[0].src = "http://i52.tinypic.com/k2fqyb.png";
document.getElementById('navtabs').style.backgroundColor="#7d0879";

elements = getElementsByClass('newcontent_textcontrol');
for(i=0;i<elements.length;i++){
elements[i].style.background="#6a007d";
}

//quote
elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #6a007d";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://i53.tinypic.com/14xnj1l.png')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}