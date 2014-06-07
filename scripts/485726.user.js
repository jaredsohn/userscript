// ==UserScript==
// @name        mods.de - Lesezeichen überall
// @namespace   mods.de
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Zeigt die Lesezeichen auf allen Seiten an
// @include     *forum.mods.de/bb/board.php?*
// @include     *forum.mods.de/bb/thread.php?*
// @version     1.0
// @grant       none
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

var divObj = getElementsByClassName(document, 'div', 'std color1 navbar');

var newDiv = document.createElement('div');
newDiv.className = "MoesBookmarks";
newDiv.align = "left";
newDiv.padding = "2px";
divObj[0].parentNode.insertBefore(newDiv, divObj[0].nextSibling);
$(".MoesBookmarks").load("/index.php .padded.bookmarklist.color1");