// ==UserScript==
// @name           LovableConiglietto
// @namespace      LovableConiglietto
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


document.getElementsByTagName('html')[0].style.backgroundImage="url('http://i55.tinypic.com/2hdnn2w.png')";
document.getElementsByTagName('html')[0].style.backgroundColor="#36b1ff";
document.getElementById('footer').style.backgroundColor="#36b1ff";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#36b1ff";
}
for(i=0;i<28;i++){
elements[i].style.color="white";
elements[i].style.background="transparent";
}

document.getElementsByTagName('img')[0].src = "http://i52.tinypic.com/317fhvd.png";
document.getElementById('navtabs').style.backgroundColor="#36b1ff";

elements = getElementsByClass('newcontent_textcontrol');
for(i=0;i<elements.length;i++){
elements[i].style.background="#d6efff";
}

elements = getElementsByClass('posthead');
for(i=0;i<elements.length;i++){
elements[i].style.background="#36b1ff";
elements[i].style.border="1px solid #d6efff";
}

elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #36b1ff";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://i53.tinypic.com/14xnj1l.png')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}

elements = document.getElementsByTagName('a');
for(i=0;i<elements.length;i++){
if(elements[i].innerHTML == "1")
{
elements[i].style.background="#d6efff";
}

//if(elements[i].style.border == "1px solid #498843")

//elements[i].style.border="1px solid #d6efff";



}

/*

//header


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
*/