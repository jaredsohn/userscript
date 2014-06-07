// ==UserScript==
// @name        Neopets Main Shop Restock Alerter
// @namespace   http://www.userscripts.org/user/46514
// @include     http://www.neopets.com/objects.phtml?type=shop&obj_type=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

var url = window.location.href.split('=');
var shopId = url[url.length-1];

console.log(GM_getValue("minRefresh")+GM_getValue("maxRefresh"));
if (GM_getValue("stock_"+shopId, -1) === -1) {
  GM_setValue("stock_"+shopId, $('img[src^="http://images.neopets.com/items/"]').length);
  setTimeout(function() { window.location.reload(); }, 2000+Math.random()*2000);
} else {
  if ($('img[src^="http://images.neopets.com/items/"]').length > GM_getValue("stock_"+shopId)) {
    alert("Restock on shop "+shopId);
    GM_openInTab(window.location);
    GM_setValue("stock_"+shopId, $('img[src^="http://images.neopets.com/items/"]').length);
  } else {
    GM_setValue("stock_"+shopId, $('img[src^="http://images.neopets.com/items/"]').length);
    setTimeout(function() { window.location.reload(); }, 2000+Math.random()*2000);
  }
}
