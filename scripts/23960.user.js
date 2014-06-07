// ==UserScript==
// @name           Metanet Ad
// @namespace      Forumer Footer
// @description    Removes Forumer's Ad
// @include        http://metanet.2.forumer.com/*
// ==/UserScript==
function removeContent(id){
  var node=document.getElementById(id);
  if (node){
	node.parentNode.removeChild(node);
	node=null;
  }
}
removeContent('forumer_footer');