// ==UserScript==
// @name           RMP
// @namespace      RMP
// @include        http://*.ratemyprofessors.com/*
// ==/UserScript==

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}

function removeElement(elementID){
	try {document.getElementById(elementID).parentNode.removeChild(document.getElementById(elementID));}
	catch(err){}
}
var theEls = new Array();
try {theEls = getElementsByClassName(document.getElementById("rmp_container"), "div", "rmp_leaderboard"); } catch(err){}
try {document.getElementById('rmp_container').removeChild(theEls[0]);} catch(err){}

removeElement('rmp_new_image');
removeElement('block1_hid');
removeElement('mtvuBar');
removeElement('rmp_Sidebar');
removeElement('rmp_footer');
removeElement('down');
removeElement('rmp_leftColumn');

try {document.body.innerHTML = "<br/>" + document.body.innerHTML + "<br/>";} catch(err){}
try {document.getElementById('rmp_homeFind').style.height = '120px';} catch(err){}
try {document.getElementById('rmp_wrap').style.border = '5px solid #0973c9';} catch(err){}
try {document.getElementById('rmp_wrap').style.position = 'absolute';} catch(err){}
try {document.getElementById('rmp_wrap').style.top = '30px';} catch(err){}
try {document.getElementById('rmp_wrap').style.left = '30px';} catch(err){}
try {document.getElementById('rmp_wrap').innerHTML = "<a href=\"index.jsp\" style=\"font-size: 25px; font-weight: bold;\">Rate My Professors</a><br/>" + document.getElementById('rmp_wrap').innerHTML;} catch(err){}

var thePs = new Array();
try {thePs = document.getElementsByTagName("a")} catch(err){}
try {
	for (var i = 0; i<thePs.length; i++)
	{		
		if (thePs[i].href == "http://www.ratemyprofessors.com/About.jsp")
		{
			thePs[i].parentNode.removeChild(thePs[i]);
		}
	}
} catch(err){}//alert(err);}

