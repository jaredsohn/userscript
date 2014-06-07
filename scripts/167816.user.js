// ==UserScript==
// @name           Remove Cnet social toolbar
// @namespace      cnetRemoveSocialToolbar
// @include        *
// ==/UserScript==

function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}

removeContent('globalSocialPromoWrap');
