// ==UserScript==
// @name Maw Messeger
// @namespace anton.dunaev@gmail.com/
// @version 0.01
// @source absolvo.ru/
// @description example script to insert div with h1 on every page habrahabr.ru
// @include maw.ru/*
// ==/UserScript==

var endSesLinkList = document.evaluate(
 "html/body/*/A[@HREF=\"?k=end\"]", 
 document,null, XPathResult.ANY_TYPE, null); 
if(!endSesLinkList){
	flash(getSpanEl("<p align='center'><strong>Ты не зашел под своей записью! Залогинься.</strong></p>"));
}

function getSpanEl(innerText){
	var span = document.createElement("span");
	span.innerText = innerText + "/<span>";
	return span;
}
	
function flash(element){
	document.body.insertBefore(element, document.body.firstChild);
}