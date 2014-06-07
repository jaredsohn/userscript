// ==UserScript==
// @name        Neopets Main Shop Restock Alerter [REVISED]
// @namespace   http://www.userscripts.org/user/46514
// @include     http://www.neopets.com/objects.phtml?type=shop&obj_type=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// @credit      Jannertje
// ==/UserScript==

// SCRIPT ADJUSTMENTS
// 1. adjusted refresh time every 3 seconds - random intervals
// 2. removed alert("Restock on shop "+shopId); replacing with SOUND alert
// 3. removed GM_openInTab(window.location); ~ to open in new tab on restock
// END OF ADJUSTMENTS

// SCRIPT CREDIT
// Script credit goes to Jannertje, original coder of script.
// Adjustments made by 'Scripting'
// Alert sound snippet 

var url = window.location.href.split('=');
var shopId = url[url.length-1];

function alarm() { // plays a sound when a listed item appears
	alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://www.liquidenjoyment.com/stuff/hobonickelget.swf\" autostart=true hidden=true>";
	pbDiv = document.getElementById("contentContainer");
	document.body.insertBefore(alarmDiv, pbDiv);
}

console.log(GM_getValue("minRefresh")+GM_getValue("maxRefresh"));
if (GM_getValue("stock_"+shopId, -1) === -1) {
  GM_setValue("stock_"+shopId, $('img[src^="http://images.neopets.com/items/"]').length);
  setTimeout(function() { window.location.reload(); }, 3000+Math.random()*3000);
} else {
  if ($('img[src^="http://images.neopets.com/items/"]').length > GM_getValue("stock_"+shopId)) {
    alarm();
    GM_setValue("stock_"+shopId, $('img[src^="http://images.neopets.com/items/"]').length);
  } else {
    GM_setValue("stock_"+shopId, $('img[src^="http://images.neopets.com/items/"]').length);
    setTimeout(function() { window.location.reload(); }, 3000+Math.random()*3000);
  }
}