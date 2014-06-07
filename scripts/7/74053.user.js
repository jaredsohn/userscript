// ==UserScript==
// @name           Ogame Add Remove
// @namespace      AddRemover
// @include        http://*ogame.*/*
// ==/UserScript==

	// entferne Commanderwerbung
removeContent('combox_container');
removeContent('headtext1');
removeContent('headtext2');
removeContent('header');

//******************************************************************************
//Funktion
//******************************************************************************
function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}
