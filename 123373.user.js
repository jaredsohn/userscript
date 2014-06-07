// ==UserScript==
// @name           4chonTitle
// @namespace      4chonTitle
// @description    4chonTitle
// @include        http://4chon.net/*/res/*.html
// ==/UserScript==

/*
Want to hide spoilers in the title? Change this to "false" without the quotation marks.
*/
var spoilSpoilers = true;


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
var mc = getElementsByClass('post op', document); //Interact with the right area of the source code
document.title = mc[0].childNodes[1].childNodes[0].nodeValue; //Set the title to the first line of the post
if (spoilSpoilers == false && mc[0].childNodes[1].childNodes[0].getAttribute("class") == "spoiler") //Check whether it's a spoiler, if so, don't spoil it
	{
		document.title = "Spoiler";
	}
else
	{
		document.title = mc[0].childNodes[1].childNodes[0].childNodes[0].nodeValue; //Otherwise handle bold text
	}