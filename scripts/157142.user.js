// ==UserScript==
// @name                MangaCow no top elements
// @description         Removes elements to present a clearer image at the top
// @version             0.5
// @date                2013-01-20
// @author              seifeth
// @namespace           http://userscripts.org/users/502811
// @source              http://userscripts.org/scripts/show/157142
// @include             http://mangacow.com/*
// ==/UserScript==

var elementsToDelete=["sct_header","sct_menu"];

for (i=0; i < elementsToDelete.length; i++) {
	myElement =	 document.getElementById(elementsToDelete[i]);
	myElement.parentNode.removeChild(myElement);
}

var element2 = document.getElementById("sct_content").getElementsByTagName('h2');

for (i=0; i < element2.length; i++) {
	element2[i].parentNode.removeChild(element2[i]);
}

var element3 = document.getElementsByClassName("wpm_nav");
element3[0].parentNode.removeChild(element3[0]);