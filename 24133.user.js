// ==UserScript==
// @name           max3d.pl
// @namespace      MFFW
// @description    Removes logo and ads 
// @include        http://*.max3d.pl/*

// ==/UserScript==

// Crap remover.

	
removeContent('brand');

removeContent('login_bar');



//===============================================
function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}
