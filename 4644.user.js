// ==UserScript==
// @name          Instructables Allsteps in click
// @namespace     instructables.com
// @description	  Directly goes to allsteps when clicked
// @author	  farkob
// @include       http://*instructables.com/*
// ==/UserScript==

function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
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

var links = getElementsByClassName(document, "a", "entryListTitle");
  for (var e = 0; e < links.length; e++) {
links[e].href = links[e].href+"?ALLSTEPS";
}
