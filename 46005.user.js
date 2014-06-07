// ==UserScript==
// @name           Ocado: remove instant shop
// @namespace      http://raines.me.uk/
// @description    This script removes the pointless "instant shop" from every page on ocado.com.
// @include        http://www.ocado.com/*
// ==/UserScript==

var shop = document.getElementById("suggestedOrderMessage");
if (shop) {
    shop.parentNode.removeChild(shop);
}
