// Based on code by Jesper's "Undertexter.se Url Fix"
//
// ==UserScript==
// @name           Undertexter.se direct download
// @description    Changes undertexters.se's subtitle urls to get direct downloads.
// @include        http://www.undertexter.se*
// @include        http://undertexter.se*
// ==/UserScript==

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
	} else {
	// else the target has siblings, insert the new element between the target and it's next sibling.
	parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

urls = document.getElementsByTagName('a');

for(i=0;i<urls.length;i++) {
	var oldUrl = urls.item(i).href;
	var oldUrlParent = urls.item(i).parentNode.tagName;
	if(oldUrl.match(/p=subark&/) && !oldUrl.match(/#/) && (oldUrlParent == "td" || oldUrlParent == "TD")) {
		var orginal=urls.item(i);
		var newUrl = oldUrl.replace("?p=subark&","uutext.php?");
		var a = document.createElement('a');
		var img = document.createElement('img');
		// Get table where all links is stored so we can change width.
		var table = orginal.parentNode.parentNode.parentNode.parentNode;
		a.setAttribute("href", newUrl);
		a.setAttribute("title","Ladda ner undertext");
		img.setAttribute("border","0");
		img.setAttribute("src","data:image/gif;base64,R0lGODlhCgAMAJEAAL6+/yRBif///////yH5BAEAAAMALAAAAAAKAAwAAAIcnI+hywEPn4pxUukusHc25wmiAIIjuQ3fgrRDAQA7");
		img.setAttribute("alt","DL");
		img.setAttribute("style","display:block;float:right;");
		a.appendChild(img);
		insertAfter(a,orginal);
		if((table.tagName == "TABLE" || table.tagName == "table") && !table.getAttribute("style")) {
			table.setAttribute("style","width:339px!important;");
		}
	}
}