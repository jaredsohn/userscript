// ==UserScript==
// @namespace     http://aitor.name/greasemonkey
// @name          Prepare 37signals.com's "Getting Real" e-book for printing
// @description   Just removes some unwanted stuff
// @include       http://gettingreal.37signals.com/*
// ==/UserScript==

function getElementsByClassName(oElm, strTagName, strClassName){
    /*
        Written by Jonathan Snook, http://www.snook.ca/jonathan
        Add-ons by Robert Nyman, http://www.robertnyman.com
    */
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

getElementsByClassName( document, "div", "side")[ 0].style.display = "none";
getElementsByClassName( document, "div", "copyright")[ 0].style.display = "none";
getElementsByClassName( document, "div", "header")[ 0].style.display = "none";
getElementsByClassName( document, "div", "next")[ 0].style.display = "none";
document.getElementById( "footer").style.display = "none"

