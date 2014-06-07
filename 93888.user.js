// mixi ads remover
// written by Julio Matus
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This script removes all ads from mixi
//
// ==UserScript==
// @name          mixi ads remover
// @namespace     http://www.rikijpn.co.cc/
// @description   This script removes all ads from mixi.
// @include       http://mixi.jp/*
// @include       https://mixi.jp/*
// @include       http://*.mixi.jp/*
// @include       https://*.mixi.jp/*
// ==/UserScript==



function removeElementWithID(id){
    elementToRemove = document.getElementById(id);
    if (elementToRemove){
	elementToRemoveParent = elementToRemove.parentElement;
	elementToRemoveParent.removeChild(elementToRemove);
	return true;
    }
    return false;
}
function removeElementWithClass(id){
    var items = document.getElementsByClassName(id).length;
    for (var i = 0; i < items; i++){
	elementToRemove = document.getElementsByClassName(id)[0];
	elementToRemoveParent = elementToRemove.parentElement;
	elementToRemoveParent.removeChild(elementToRemove);
    }
}

removeElementWithClass("adBanner");
removeElementWithID("adBanner");
removeElementWithClass("adImpactFooter");
removeElementWithID("prContentsArea");
removeElementWithID("footprintjack");
removeElementWithID("footprintjack02");

