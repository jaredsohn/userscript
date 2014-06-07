// ==UserScript==
// @name           Set_WishList_Price
// @version        0.1
// @namespace      minony@gmail.com
// @description    amazon.co.jp の ほしい物リストでページ内の金額を合計し、リスト名の下に表示します。
// @include        http://www.amazon.co.jp/wishlist/*
// ==/UserScript==


function setTotalPrice() {
	var itr = document.evaluate("//span[@class='wlPriceBold']/strong", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var sum = 0;
	for (var i = 0; i < itr.snapshotLength; i++) {
		var txt = itr.snapshotItem(i).textContent;
		txt = txt.replace(/￥|,/g, "");
		if (! isNaN(txt)) {
			sum += Number(txt);
		}
	}
	var price = String(sum);
	while(price != (price = price.replace(/^(\d+)(\d{3})/, "$1,$2")));
	setPriceText("￥ " + price);
}
function setPriceText(price) {
	var titleElm = document.getElementById("listTitle");
	
	titleElm.appendChild(newElement("br"));
	
	var priceElm = newElement("span");
	priceElm.className = "wlPriceBold";
	priceElm.style.fontSize = "120%";
	priceElm.textContent = price;
	titleElm.appendChild(priceElm);
}
function newElement(tag) {
	return document.createElement(tag);
}

setTotalPrice();

