// ==UserScript==
// @name           Biopokemon
// @namespace      Biopokemon
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


document.getElementsByTagName('html')[0].style.backgroundImage="url('http://www.pokemonbrothers.com/immagini/film/ranger/wallpapers/poke1280_4.jpg')";


//Modifico il colore ai link
elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#66CCFF";
}
for(i=0;i<28;i++){
elements[i].style.color="#6699FF";
elements[i].style.background="transparent";
}


//header
document.getElementsByTagName('img')[0].src = "http://gamerdork.net/wp-content/uploads/2011/02/pokemon_logo_3.gif";
document.getElementsByTagName('html')[0].style.backgroundColor="#6699FF";
document.getElementById('footer').style.backgroundColor="#6699FF";
document.getElementsByTagName('img')[0].style.marginTop="-51px";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#66CCFF";
}
for(i=0;i<28;i++){
elements[i].style.color="#6699FF";
elements[i].style.background="transparent";
}

//quote
elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #CC0000";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://gamerdork.net/wp-content/uploads/2011/02/pokemon_logo_3.gif')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}