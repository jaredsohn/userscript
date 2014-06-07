// ==UserScript==
// @name           Shartak Rearrange Inventory Lite
// @namespace      http://userscripts.org/users/125692
// @description    rearranges a few less inventory items
// @include        http://www.shartak.com/game.cgi
// ==/UserScript==

var a= document.getElementsByClassName("nodot inventory");
var first=a[0].firstElementChild;
var last=a[0].lastElementChild;
var target;
var b;
/*
b= document.getElementsByClassName("inv-08 invtype-tool");//active GPS
if(b.length>0){
    target=b[0];
    var c=document.getElementsByClassName("timenowshown");
    var buttons=c[0].nextElementSibling;
    var newElement = document.createElement("ul");
    c[0].parentNode.insertBefore(newElement,buttons);
    newElement.appendChild(target);
}
*/

b= document.getElementsByClassName("inv-07 invtype-healing");//healing herbs
if(b.length>0){
    target=b[0];
    a[0].insertBefore(target,first);
}

b= document.getElementsByClassName("inv-06 invtype-healing");//FAKS
if(b.length>0){
    target=b[0];
    a[0].insertBefore(target,first);
}

b= document.getElementsByClassName("inv-0W invtype-drink");//empties
if(b.length>0){
    target=b[0];
    a[0].insertBefore(target,last.nextSibling);
}

b= document.getElementsByClassName("inv-0X invtype-drink");//native empties
if(b.length>0){
    target=b[0];
    a[0].insertBefore(target,last.nextSibling);
}
