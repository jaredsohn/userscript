// ==UserScript==
// @name           Twitter RTL
// @based on       77218
// @namespace ?
// @description    Flips Persian status lines to make them readable (make them right to left)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// we need to loop in order for this to work on edit search pages
var perChars = "شسیبلاتنمکگچجحخهعغفقثصضظطزرذدپوءژكآأإيئؤ";
function theTwitterRTLTimer(){

  var statuses = getElementsByClassName(document, "span", "entry-content");
  for (var i = 0; i < statuses.length; i++) {
	for (k=0; k<perChars.length; k++){
	//alert(hebChars[k]);
		if (statuses[i].innerHTML.indexOf(perChars[k])>-1){
			statuses[i].dir="rtl";
			statuses[i].align = "right";
			statuses[i].style.direction = "rtl";
			statuses[i].style.textAlign = "right";
			// if interest to not break to next line comment following line
			statuses[i].style.fontFamily = "tahoma";
			statuses[i].style.display = "block";
			break;
		}
	}
  }
  setTimeout ( theTwitterRTLTimer , 2000 );
  
};

theTwitterRTLTimer();


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
