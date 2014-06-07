// ==UserScript==
// @name Syrnia Shop Blocker
// @author Veridis
// @namespace http://www.veridis.com/Syrnia/ShopBlocker
// @description "a checkbox added in shops, which would add it to an 'ignore shop' list" - Orange
// @license Creative Commons Attribution License
// @version 1.0
// @include http://*syrnia.com/game.php
// @released 2009-01-11
// @compatible Greasemonkey
// ==/UserScript==

var CSS = '.block { background-color: red; color:white; cursor:pointer;}'
		+ '.unblock { background-color: green; color:white; cursor:pointer;}'
		+ '#toggleblocked { display: block; cursor:pointer;}';
var blockedShops = GM_getValue('blockedShops','').split(',');
var shopTRXPath = '/html/body/table/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td[2]/table/tbody/tr/td[2]/center/table/tbody/tr';
var shopIDRegexp = /\('shops', 'viewShop', '(.+)'\)/;
var resultIDRegexp = /\('shops', 'viewShop', '(.+)', 'back',/;

GM_addStyle(CSS);

var blockShops = function( ){
	
	var center = document.getElementById('LocationContent').firstChild;
	
	if ( document.getElementById('toggleblocked') || !center.firstChild || center.firstChild.innerHTML !== 'Shops'){
		return;
	}
	
	var shops = document.evaluate(shopTRXPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var toggleBlockedLink = document.createElement('a');
	toggleBlockedLink.innerHTML = '[toggle blocked shops]';
	toggleBlockedLink.id = 'toggleblocked';
	toggleBlockedLink.addEventListener("click", function( ){
		unsafeWindow.$$('.blocked').invoke('toggle');
	}, false);
	
	var shop;
	
	for ( i=1; i < shops.snapshotLength; i++ ) {
	
		shop = shops.snapshotItem(i);
		if (!shop){
			break;
		}
		
		if ( document.getElementById('shopSearchQ') ) {	
			renderSearchResult(shop);
		}
		else {
			renderShop(shop);
		}
	}
	
	center.insertBefore(toggleBlockedLink, center.childNodes[5]);
	unsafeWindow.$$('.blocked').invoke('hide');
};

var renderShop = function( shop ){
	var shopID = shop.firstChild.innerHTML.match(shopIDRegexp);
	
	if (!shopID){
		return;
	}
	
	var link = document.createElement('a');
	
	if (blockedShops.indexOf(shopID[1]) !== -1) {
		link.innerHTML = '[--]';
		link.className = 'unblock';
		link.addEventListener("click", function( ){
			unBlockShop(shopID[1]);
			renderShop(shop);
			shop.style.display = 'auto';
		}, false);

		shop.className = 'blocked';
		if (shop.firstChild.firstChild.className) {
			shop.firstChild.removeChild(shop.firstChild.firstChild);
		}
		shop.firstChild.insertBefore(link, shop.firstChild.firstChild);
	}
	else {
		link.innerHTML = '[X]';
		link.className = 'block';
		link.addEventListener("click", function( ){
			blockShop(shopID[1]);
			renderShop(shop);
			shop.style.display = 'none';
		}, false);
	
		shop.className = 'unblocked';
		if (shop.firstChild.firstChild.className) {
			shop.firstChild.removeChild(shop.firstChild.firstChild);
		}
		shop.firstChild.insertBefore(link, shop.firstChild.firstChild);
	}
}

var renderSearchResult = function( shop ){
	var shopID = shop.lastChild.innerHTML.match(resultIDRegexp);
	
	if (!shopID){
		return;
	}
	
	if (blockedShops.indexOf(shopID[1]) !== -1) {
		shop.className = 'blocked';
	}
	else {
		shop.className = 'unblocked';
	}
}

var blockShop = function( shopID ){
	blockedShops.push(shopID);
	GM_setValue('blockedShops',blockedShops.join(','));
};

var unBlockShop = function( shopID ){
	blockedShops.splice(blockedShops.indexOf(shopID), 1);
	GM_setValue('blockedShops',blockedShops.join(','));
};

unsafeWindow.setInterval(blockShops,1000);





