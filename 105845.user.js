// ==UserScript==
// @name           Bioteck
// @namespace      Bioteck
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


document.getElementsByTagName('html')[0].style.backgroundImage="url('http://us.123rf.com/400wm/400/400/josieg182/josieg1820807/josieg182080700002/3269605-nastri-rosa-e-fiori-contro-uno-sfondo-viola.jpg')";


//Modifico il colore ai link
elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#DA3287";
}
for(i=0;i<28;i++){
elements[i].style.color="#DA3287";
elements[i].style.background="transparent";
}


//header
document.getElementsByTagName('img')[0].src = "http://r16.imgfast.net/users/1611/17/32/04/album/teckto10.png";
document.getElementsByTagName('html')[0].style.backgroundColor="#990099";
document.getElementById('footer').style.backgroundColor="#990099";
document.getElementsByTagName('img')[0].style.marginTop="-51px";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#DA3287";
}
for(i=0;i<28;i++){
elements[i].style.color="#DA3287";
elements[i].style.background="transparent";
}

//quote
elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #CC0000";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://r16.imgfast.net/users/1611/17/32/04/album/teckto10.png')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}

