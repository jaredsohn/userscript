// ==UserScript==
// @name           GaiaOnline: Link Trade Items (Double Click)
// @namespace      http://userscripts.org/users/62850
// @description    Links trade items to a market search (only items that were in the trade window when it the page loaded)
// @include        http://www.gaiaonline.com/gaia/bank.php*
// ==/UserScript==
var eles=document.getElementById('trade_panel');
if(eles){
	eles=eles.getElementsByClassName('item_image');
	for(var i=0;i<eles.length;i++){
		eles[i].setAttribute('ondblclick',"window.open('/marketplace/itemsearch/?search="+escape(eles[i].title)+"&filter=0&floor=0&ceiling=No+Limit')");
	}
}