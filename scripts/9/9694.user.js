// ==UserScript==
// @name           EbayRedirectPopupRemove
// @namespace      EBay
// @description    Remove the redirect popup
// @include        http://www.ebay.*
// ==/UserScript==

var layer=document.getElementById("oc_usp");
layer.parentNode.removeChild(layer);