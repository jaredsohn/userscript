// ==UserScript==
// @name        Lachschon Premium Gallery Features
// @description Kommentarseiten in der Gallery im Stil: (1|2|3) bzw.(1...3|4)
// @include     http://*lachschon.de/gallery/*
// @include     http://*lachschon.de/tags/*
// @include     http://*lachschon.de/user/*/posts/slides
// @include     http://*lachschon.de/
// ==/UserScript==

var CommentsPerPage = 30; //Anzahl der Kommentare ab der 2. Seite
var showOneCommentPage = false; //wenn man will, dass auch (1) gezeigt werden soll (d.h. bei maximal 10 Kommentaren)

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function buildCommentPageNode(commentNode, pageNumber) {
	var newNode = commentNode.cloneNode(true);
	if (pageNumber!=1) newNode.setAttribute("href", commentNode.getAttribute("href").replace(/#/, pageNumber + "/#"));
	newNode.firstChild.data=pageNumber;
	return newNode;
}

var InfoElements = getElementsByClass("info", document.getElementById("imglist"),'*');
for (var i=0; i<InfoElements.length; i++) {
	var commentNode = InfoElements[i].lastChild;	//Link zu den Comments
	var commentCount = parseInt(commentNode.firstChild.data);
	var pageCount =	1;
	if (commentCount>10) pageCount += Math.ceil((commentCount-10)/CommentsPerPage);//Anzahl der Kommentarseiten
	if(pageCount>1 || showOneCommentPage){
		commentNode.firstChild.data = commentCount + " K.";	//Damit mehr Platz f�r Kommentarseiten bleibt wird Kommentare zu K.
		InfoElements[i].appendChild(document.createTextNode(" ("));
		InfoElements[i].appendChild(buildCommentPageNode(commentNode, 1));
		
		if (pageCount!=1) {
			if (pageCount<=3) InfoElements[i].appendChild(document.createTextNode("|"));
			else InfoElements[i].appendChild(document.createTextNode("..."));
			
			if (pageCount==2) InfoElements[i].appendChild(buildCommentPageNode(commentNode, 2));
			else {
				InfoElements[i].appendChild(buildCommentPageNode(commentNode, pageCount-1));
				InfoElements[i].appendChild(document.createTextNode("|"));
				InfoElements[i].appendChild(buildCommentPageNode(commentNode, pageCount));
			}
		}
		InfoElements[i].appendChild(document.createTextNode(")"));
	}
}