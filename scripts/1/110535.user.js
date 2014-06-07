// ==UserScript==
// @name           Travian T3 (beta)
// @namespace      Travian T3 (beta)
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


document.getElementsByTagName('html')[0].style.backgroundImage="url('http://www.browsergamespielen.de/img/img/11298037605-travian-dorf-sommer.jpg')";


//Modifico il colore ai link
elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#CCCCFF";
}
for(i=0;i<28;i++){
elements[i].style.color="#6699FF";
elements[i].style.background="transparent";
}


//header
document.getElementsByTagName('img')[0].src = "http://www.giochiperpc.net/images/travian-game-image-08.jpg";
document.getElementsByTagName('html')[0].style.backgroundColor="#99CC66";
document.getElementById('footer').style.backgroundColor="#99CC66";
document.getElementsByTagName('img')[0].style.marginTop="-50px";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#00CCFF";
}
for(i=0;i<28;i++){
elements[i].style.color="#00CCFF";
elements[i].style.background="transparent";
}

//quote
elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #CC0000";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://www.giochiperpc.net/images/travian-game-image-08.jpg')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}
