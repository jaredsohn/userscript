// ==UserScript==
// @name           imobster helper
// @namespace      Ajay
// @include        http://im.storm8.com/*
// ==/UserScript==


function passValidation(nname){

if (nname==”SCRIPT” || nname==”META” || nname==”LINK” || nname==”TITLE” || nname==”TD”)
{
return(false);
}
return(true);

}

function fixDom(){
//tried to break down what there code is doing with out looking like i copied it! :)
var objDom=document.getElementsByTagName(‘*’)
for (var i=0;i<objDom.length-1;i++){
var domNode=objDom.item(i)
var dname=domNode.nodeName.toUpperCase();
if (domNode.style){
if (passValidation(dname))
{
domNode.style.display="";
}
}

}
}

function fixit(){

fixDom();
document.body.style.background='#000000';
document.body.style.display="block;"
document.getElementsByTagName("div").item(0).style.display="none";
document.getElementsByTagName("link").item(0).media=""
document.getElementsByTagName("link").item(1).media=""
document.getElementsByTagName("link").item(2).media=""
}

setTimeout (fixit,500)