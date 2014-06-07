// ==UserScript==
// @name           Penny-Arcade Reshaper
// @namespace      
// @description    Removes horizontal and vertical ads and scales post to fit width.
// @include        http://www.penny-arcade.com/*
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

var adOuter = document.getElementById("advert");
if ( adOuter ){
    adOuter.parentNode.removeChild( adOuter );
}

var horizAd = document.getElementById("adhoriz");
if ( horizAd ){
    horizAd.parentNode.removeChild( horizAd );
}

var newsBox = document.getElementById("news");
if ( newsBox ){
    newsBox.style.width="100%";
}

var postHeaders = getElementsByClassName( document, "div", "postheader" );
for ( var i = 0; i < postHeaders.length; i++ ){
	element = postHeaders[i];
	element.style.width="90.5%";
}


