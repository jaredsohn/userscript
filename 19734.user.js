// ==UserScript==
// @name           TriumphRat.net
// @namespace      king756
// @description    Removes the left sidebar on TriumphRat.net
// @include        http://www.triumphrat.net/*
// ==/UserScript==

if(location.href != 'http://www.triumphrat.net/') {
	var leftbar = getElementsByClassName(document.body, "td", "portal-left");
	if (leftbar) leftbar[0].parentNode.removeChild(leftbar[0]);
}


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

