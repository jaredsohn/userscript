// ==UserScript==
// @name           Twitter RTL
// @namespace      77218
// @description    Flips Hebrew status lines to make them readable
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// we need to loop in order for this to work on edit search pages
var statuses = getElementsByClassName(document, "span", "entry-content");
var hebChars = "אבגדהוזחטיכלמנסעפצקרשת";

for (var i = 0; i < statuses.length; i++) {
	for (k=0; k<hebChars.length; k++){
	//alert(hebChars[k]);
		if (statuses[i].innerHTML.indexOf(hebChars[k])>-1){
			statuses[i].dir="rtl";
			statuses[i].align = "right";
			statuses[i].style.direction = "rtl";
			statuses[i].style.textAlign = "right";
			break;
		}
	}
}

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
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
	return (arrReturnElements);
}

