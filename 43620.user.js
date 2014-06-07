// ==UserScript==
// @name                Sig Image Fixer
// @namespace	        http://www.digitalraven.org/
// @description	        Script to destroy sig images on the white wolf forums
// @include		http://forums.white-wolf.com/cs/forums/*
// ==/UserScript==

HideSigs();

function HideSigs() {

  var allspans = document.getElementsByTagName("DIV");
  for (var i = 0 ; i < allspans.length ; i++) {

    if(allspans[i].className == "ForumPostSignature") { // If it's a sig...
      var SpanChildNodes = allspans[i].childNodes;
      var hidestuff = false;

      for (var j = 0 ; j < SpanChildNodes.length ; j++) { // for each node within the sig
	      RecursiveImgHide(SpanChildNodes[j]);
      }
    }
  }
}

function RecursiveImgHide(CurrentNode) {

  if(CurrentNode.nodeName == "IMG") {
    replacementTextNode = document.createTextNode("Image removed");
    CurrentNode.parentNode.replaceChild(replacementTextNode, CurrentNode);              
  }

  if (CurrentNode.childNodes.length > 0) {
    var ChildNodes = CurrentNode.childNodes;
    for (var i = 0 ; i < ChildNodes.length ; i++)
      RecursiveImgHide(ChildNodes[i]);
  }

}