// ==UserScript==
// @name          Auto-Hidden Input Viewer
// @description   Making from hidden input normal text input across the web
// @version       0.03
// @author        Rastislav Turek (turek@synopsi.com)
// @homepage      http://synopsi.com
// @include        *
// ==/UserScript==

function insertAfter( referenceNode, newNode )
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var inp = document.getElementsByTagName("input");

for (var i=0;i<inp.length;i++) {
	if(inp[i].type == "hidden") {
	
		var newTag1 = document.createElement("br");
		var newTag2 = document.createElement("strong");
		
		var hid = inp[i];
		hid.type = "text";
		hid.borderColor = "black";
		hid.borderWidth = "3px";
		hid.style.marginBottom = "5px";
		
		newTag2.style.backgroundColor = "white";
		newTag2.style.color = "black";
		
		newTag2.innerHTML = '[hidden field name ="'+hid.name+'"]: '

		hid.parentNode.insertBefore(newTag2, hid);
		insertAfter(hid, newTag1);
	
	}
}