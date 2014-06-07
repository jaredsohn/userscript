// ==UserScript==
// @name           vaiolettmilk Skin BETA
// @namespace      vaiolettmilk Skin BETA
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

//SOST IMG images/travianvb4/statusicon/forum_new-48.png
var x = 0;
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
if(elements[i].src == "http://forum.travian.it/images/travianvb4/statusicon/forum_new-48.png")
elements[i].src = "http://i54.tinypic.com/af7c6x.png";

if(elements[i].src == "http://forum.travian.it/images/travianvb4/statusicon/forum_link-48.png")
elements[i].src = "http://forum.travian.it/images/travianvb4/statusicon/forum_old-48.png";

if(elements[i].src == "http://forum.travian.it/images/travianvb4/statusicon/category_forum_new.png")
elements[i].src = "http://forum.travian.it/images/travianvb4/statusicon/forum_old-48.png";

}


//Modifico il colore ai link
elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#ed73ff";
}
for(i=0;i<28;i++){
elements[i].style.color="white";
elements[i].style.background="transparent";
}


//header
document.getElementsByTagName('img')[0].src = "http://i54.tinypic.com/qzrv5z.png";
document.getElementById('navtabs').style.backgroundColor="#ed73ff";
document.getElementsByTagName('html')[0].style.backgroundImage="url('http://i53.tinypic.com/2bbifm.png')";
document.getElementsByTagName('html')[0].style.backgroundColor="white";

elements = getElementsByClass('newcontent_textcontrol');
for(i=0;i<elements.length;i++){
elements[i].style.background="#ED73FF";
elements[i].style.color="black";
}


//posthead
elements = getElementsByClass('posthead');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #ED73FF";
elements[i].style.backgroundColor="#ED73FF";
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