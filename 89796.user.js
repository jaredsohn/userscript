// ==UserScript==
// @name          Button for Tag This Photo
// @description   this is just a personal tool
// @include       *facebook.com/photo.php?fbid=*
// @version	  1.0.2
// ==/UserScript==

function getElementsByClass(searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
}

function starttag() {
	var taglink = document.getElementsByClassName('tagging_link');
	taglink.Click;
	alert("LOL!");
}

var photocount, newElement;
photocount = document.getElementById('photo_count');

if (photocount) {
    newElement = document.createElement('a'),
	newElement.setAttribute('href', 'javascript:void(0);');
	newElement.addEventListener('click', starttag, false);
	newElement.appendChild(document.createTextNode('TAG!'));
    photocount.parentNode.insertBefore(newElement, photocount);
}
