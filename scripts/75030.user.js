// ==UserScript==
// @name           GMail Searchbar Toggle (Google Chrome)
// @description    Very simple script to toggle GMail searchbar that works in Google Chrome
// @version        1
// @author         Dan Cork http://dancork.co.uk
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==
//

function keypress(event) {
    element = event.target;
    elementName = element.nodeName.toLowerCase();
    if (elementName == "input" || elementName == "textarea") return true;
    if (String.fromCharCode(event.which)=="S" && !event.ctrlKey && !event.metaKey) {
      toggle_search();
    }
    return true;
}

var j = false;
var css = ".aC .nH .nH .no {display:none !important;}";

var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		var text = document.createTextNode(css);
		node.appendChild(text);
		heads[0].appendChild(node);
	}


function toggle_search() {
    if (j) {     
      text.nodeValue = text.nodeValue + css;
    }
    else {
      text.nodeValue = text.nodeValue.substring(0,text.nodeValue.length-42);
    }
    j = !j;
}

document.addEventListener("keydown", keypress, false);
