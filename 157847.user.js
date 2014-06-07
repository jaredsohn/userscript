// ==UserScript==
// @name        AdForumBlock
// @namespace   Osieczna
// @description Blokowanie reklamowych wpisów na forum
// @include     http://www.elektroda.pl/*
// @version     1
// @grant       none
// ==/UserScript==

function removeElementsByName(tagName, name){
	var eReklamy = document.getElementsByName(name);
	for (var i = eReklamy.length - 1; i >= 0; i--) {
		if(tagName == eReklamy[i].tagName){
			var eRow = eReklamy[i].parentElement.parentElement.parentElement;
			eRow.parentElement.removeChild(eRow);
		}
	}
}

function removeElementsByClass(tagName, name, href){
	var eReklamy = document.getElementsByClassName(name);
	for (var i = eReklamy.length - 1; i >= 0; i--) {
		if(tagName == eReklamy[i].tagName && eReklamy[i].href.indexOf(href) != -1){
			var eRow = eReklamy[i].parentElement.parentElement.parentElement;
			eRow.parentElement.removeChild(eRow);
		}
	}
}

removeElementsByName("A", "ad");
removeElementsByClass("A", "nav", "#top");
