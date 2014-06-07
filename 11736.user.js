// ==UserScript==
// @name          dA Reply to Subject
// @namespace     http://www.blueratchet.com
// @description   Adds a small reply to subject funtion to deviantart notes
// @include       http://my.deviantart.com/notes/*
// ==/UserScript==
/*=======================================================================
==Written by and copyright Corey Thomasson (blueratchet.deviantart.com)==
=======================================================================*/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/-/g, "\-");
	var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}
unsafeWindow.getElementsByClassName = function(oElm, strTagName, strClassName) {
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/-/g, "\-");
	var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
} 
var elem = getElementsByClassName(window.document, "div", "column2");
var column = elem[0];
var ddd = window.document.createElement('div');
ddd.setAttribute('id', 'customboxx2');
ddd.setAttribute('onClick', 'replytosub();');
column.appendChild(ddd);
window.repliesbutton = window.document.getElementById('customboxx2');
window.repliesbutton.style.height = 'auto';
window.repliesbutton.style.width = '85px';
window.repliesbutton.style.position = 'absolute';
window.repliesbutton.style.zIndex = '1000';
window.repliesbutton.style.top = '191px';
window.repliesbutton.style.right = '75px';
window.repliesbutton.innerHTML = '<img src="http://www.blueratchet.com/r2s.png" />';
window.repliesbutton.style.cursor = 'pointer';
unsafeWindow.replytosub = function() {
	var tofind = window.prompt("What subject would you like to respond to?");
	var receps = new Array();
	var notes = getElementsByClassName(window.document, "span", "main");
	for(var d in notes) {
		var data = notes[d].innerHTML.split("<a href");
		if(!data[1]) { } else {
			var nd = (data[1]).split("</a> from ");
			var ndd = (nd[0]).split(">");
			if((ndd[1]).toLowerCase()==tofind.toLowerCase()) {
				var nnd = (nd[1]).split("</a>");
				var nndd = (nnd[0]).split("\">");
				receps[(nndd[1])] = nndd[1];
			}
		}
	}
	for(var from in receps) {
		if(window.document.getElementById("noterecipients").value=='') {
			window.document.getElementById("noterecipients").value = from;
		} else {
		window.document.getElementById("noterecipients").value = window.document.getElementById("noterecipients").value+", "+from;
		}
	}
	if(window.document.getElementById("noterecipients").value!='') {
		if(window.document.getElementById("notesubject").value=='') {
			window.document.getElementById("notesubject").value = "Re: "+tofind;
		}
	}
}