// google.com Homepage Clean View
// version 0.9
// 2010-06-24
// Copyright (c) 2010, Fuhan Fan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          google.com Homepage Clean View
// @description   Hide the header, footer and <a>s on google.com homepage. Show them while mouse is over them.
// @include       http://www.google.com/
// @include       http://www.google.com/webhp*
// ==/UserScript==
document.getElementByClassName = function (range, classname) {
	var elements = [];
	var alltags = document.getElementsByTagName(range);
	for(var i=0;i<alltags.length;i++) {
		var classNames = alltags[i].className.split(" ");
		for(var j=0;j<classNames.length;j++) {
			if (classNames[j] == classname) {
				elements[elements.length] = alltags[i];
				break;
			}
		}
	}
	return elements;
}

document.addEventListener(
	"DOMNodeInserted",
	function() {
	
		var htmlNode = document.getElementsByTagName("html")[0];

		if(htmlNode) {
			htmlNode.removeAttribute("onmousemove", 0);
		}
		
		document.getElementsByName("q")[0].removeAttribute("onblur", 0);	//textbox
		
		var withClassDs = document.getElementByClassName("span", "ds");	//buttons
		for(var i=0;i<withClassDs.length;i++) {
			withClassDs[i].style.opacity = "0";
			withClassDs[i].setAttribute("onmouseover", "this.style.opacity = '0.6'");
			withClassDs[i].setAttribute("onmouseout", "this.style.opacity = '0'");
		}
		withClassDs = document.getElementByClassName("div", "ds");	//textbox
		for(var i=0;i<withClassDs.length;i++) {
			withClassDs[i].style.opacity = "0.5";
		}
		withClassDs = document.getElementByClassName("div", "gac_od");	//suggestions
		for(var i=0;i<withClassDs.length;i++) {
			withClassDs[i].style.opacity = "0.8";
		}
		
		if(document.getElementById("lga")) {	//Doodle
			document.getElementById("lga").style.opacity = "0.5";
		}
		
		if(document.getElementById("ghead")) {	//header
			document.getElementById("ghead").setAttribute("onmouseover", "this.style.opacity = '0.8'");
			document.getElementById("ghead").setAttribute("onmouseout", "this.style.opacity = '0'");
		}
		if(document.getElementById("fctr")) {	//footer
			document.getElementById("fctr").setAttribute("onmouseover", "this.style.opacity = '1'");
			document.getElementById("fctr").setAttribute("onmouseout", "this.style.opacity = '0'");
		}
		if(document.getElementById("sbl")) {	//advanced search & language tools
			document.getElementById("sbl").setAttribute("onmouseover", "this.style.opacity = '1'");
			document.getElementById("sbl").setAttribute("onmouseout", "this.style.opacity = '0'");
		}
		if(document.getElementById("cpNavTextWrapper")) {	//change background image link
			document.getElementById("cpNavTextWrapper").setAttribute("onmouseover", "this.style.opacity = '1'");
			document.getElementById("cpNavTextWrapper").setAttribute("onmouseout", "this.style.opacity = '0'");
		}
	},
	true
);

//
// ChangeLog
//
// 2010-06-24 - 0.9
// hide the Google Search and I'm Feeling Lucky button;
// make the Google Doodle transparent.
//
// 2010-06-23 - 0.8 - First version of google.com Homepage Clean View
//
