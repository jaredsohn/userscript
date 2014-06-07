// ==UserScript==
// @name          ZOMBIE
// @namespace      ZOMBIE
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


document.getElementsByTagName('html')[0].style.backgroundImage="url('http://1.bp.blogspot.com/-0fJiXHR2oTQ/Tfcjf-hgfEI/AAAAAAAABJE/F0YnZ84wooA/s1600/Cosa%2Bsuccede%2Bquando%2Buno%2Bzombie%2Bspende%2Bdenaro.jpg')";


//Modifico il colore ai link
elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#FC0011";
}
for(i=0;i<28;i++){
elements[i].style.color="#6699FF";
elements[i].style.background="transparent";
}


//header
document.getElementsByTagName('img')[0].src = "http://img103.herosh.com/2011/06/10/270839423.gif";
document.getElementsByTagName('html')[0].style.backgroundColor="#000000";
document.getElementById('footer').style.backgroundColor="#000000";
document.getElementsByTagName('img')[0].style.marginTop="50px";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#E3F705";
}
for(i=0;i<28;i++){
elements[i].style.color="#E3F705";
elements[i].style.background="transparent";
}

//MODIFICA BORDO
elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid yellow";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://img103.herosh.com/2011/06/10/270839423.gif')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}