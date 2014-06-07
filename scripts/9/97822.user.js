// ==UserScript==
// @name        ChainReactionCycles.com GBP/EUR/USD to RUR converter
// @namespace   http://www.unchqua.ru/ns/greasemonkey
// @description Converts prices set in British Pounds, Euro or US Dollars to Russian Roubles.
// @include     http://www.chainreactioncycles.com/*
// ==/UserScript==

// Exchange rates and date.
var EXCHRATE_DATE = "23.02.12";
var EXCHRATE_RURGBP = 47.0056;
var EXCHRATE_RUREUR = 39.4114;
var EXCHRATE_RURUSD = 29.7692;

var USER_CURRENCY = document.getElementById("CurrencyISO");
USER_CURRENCY = USER_CURRENCY.options[USER_CURRENCY.selectedIndex].value;
var EXCHANGE_RATE_USER =
		  USER_CURRENCY == "GBP" ? EXCHRATE_RURGBP
		: USER_CURRENCY == "EUR" ? EXCHRATE_RUREUR
		: USER_CURRENCY == "USD" ? EXCHRATE_RURUSD
		: null;

var convert_price_to_RUR = function(currency, price_str) {
	var EXCHANGE_RATE_PRICE = 0;
	switch (currency) {
	case "\u00a3":
	case "&pound;":
		EXCHANGE_RATE_PRICE = EXCHRATE_RURGBP;
		break;
	case "\u20ac":
	case "&euro;":
		EXCHANGE_RATE_PRICE = EXCHRATE_RUREUR;
		break;
	case "\u0024":
		EXCHANGE_RATE_PRICE = EXCHRATE_RURUSD;
		break;
	}
	return Math.floor(parseInt(price_str.replace("\.", ""), 10) * EXCHANGE_RATE_PRICE / 100);
}

var replace_special_chars = function(str) {
	if (!str || str.length == 0)
		return str;
	return str.replace(/&nbsp;/g, String.fromCharCode(0xa0))
	          .replace(/&amp;/g, String.fromCharCode(0x26));
}

var node, textvalue, prefix, currency, price, priceRUR, suffix, inbasket;

var xpath1 = document.evaluate("//td[@class='Label11']|//td[@class='Label11']/table/tbody/tr[position()=1]/td|//td[@class='Label14']|//td[@class='Label221']|//td[@class='Label140']|//span[@class='Label11']|//span[@class='Label221']|//span[@class='Label14']|//td[@class='Label35']|//span[@class='Label36']|//span[@class='Label193']|//span[@class='Label148']|//span[@class='Label55']|//span[@class='Label57']|//span[@class='Label201']|//span[@class='Label72']|//span[@class='Label59']|//span[@class='Label209']|//span[@class='Label264']|//span[@class='Label266']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var regexp_common_CRC_price = /^(Now|RRP|From)?(?:&nbsp;| )?(\xa3|\x24|\u20ac|&pound;|&euro;)([0-9\.]+)(.*)$/;
for (var i = 0; i < xpath1.snapshotLength; i++) {
	node = xpath1.snapshotItem(i).wrappedJSObject;
	textvalue = node.innerHTML;
	if (!regexp_common_CRC_price.test(textvalue))
		continue;
	regexp_common_CRC_price.exec(textvalue);
	prefix = RegExp.$1;
	currency = RegExp.$2;
	price = RegExp.$3;
	suffix = RegExp.$4;
	priceRUR = convert_price_to_RUR(currency, price);
	while (node.childNodes.length > 0)
		node.removeChild(node.childNodes.item(0));
	node.appendChild(document.createTextNode(/*replace_special_chars(prefix) + */priceRUR + replace_special_chars("&nbsp;р.") + suffix));
	node.setAttribute("price", price);
	node.title = currency + price + " - " + EXCHRATE_DATE;
}

var Javascript_prices_updater = function(pricearray) {
	var regexp_scroller_CRC_price = /^(Now|RRP|From)?(?:&nbsp;| )?(\xa3|\x24|\u20ac|&pound;|&euro;)([0-9\.]+)(.*)$/;
	for (var i = pricearray.length - 1; i >= 0; i--) {
		// Now ...
		textvalue = pricearray[i][3];
		if (regexp_scroller_CRC_price.test(textvalue)) {
			regexp_scroller_CRC_price.exec(textvalue);
			prefix = RegExp.$1;
			currency = RegExp.$2;
			price = RegExp.$3;
			suffix = RegExp.$4;
			priceRUR = convert_price_to_RUR(currency, price);
			pricearray[i][3] = /*replace_special_chars(prefix) + */priceRUR + replace_special_chars("&nbsp;р.") + suffix;
		}
		// RRP ...
		textvalue = pricearray[i][5];
		if (regexp_scroller_CRC_price.test(textvalue)) {
			regexp_scroller_CRC_price.exec(textvalue);
			prefix = RegExp.$1;
			currency = RegExp.$2;
			price = RegExp.$3;
			suffix = RegExp.$4;
			priceRUR = convert_price_to_RUR(currency, price);
			pricearray[i][5] = /*replace_special_chars(prefix) + */priceRUR + replace_special_chars("&nbsp;р.") + suffix;
		}
	}
}

if (window.wrappedJSObject["models_ModelsBestSellingInBrand_ModelBestSellingInBrandScroller1__en_"+USER_CURRENCY])
	Javascript_prices_updater(window.wrappedJSObject["models_ModelsBestSellingInBrand_ModelBestSellingInBrandScroller1__en_"+USER_CURRENCY]);
if (window.wrappedJSObject["models_ModelsBestSellingInCategory_ModelBestSellingInCategoryScroller1__en_"+USER_CURRENCY])
	Javascript_prices_updater(window.wrappedJSObject["models_ModelsBestSellingInCategory_ModelBestSellingInCategoryScroller1__en_"+USER_CURRENCY]);
if (window.wrappedJSObject["models_ModelsBestSellingInBrandCategory_ModelBestSellingInBrandCategoryScroller1__en_"+USER_CURRENCY])
	Javascript_prices_updater(window.wrappedJSObject["models_ModelsBestSellingInBrandCategory_ModelBestSellingInBrandCategoryScroller1__en_"+USER_CURRENCY]);
if (window.wrappedJSObject["models_ModelScroller1__en_"+USER_CURRENCY])
	Javascript_prices_updater(window.wrappedJSObject["models_ModelScroller1__en_"+USER_CURRENCY]);
if (window.wrappedJSObject["models_ModelScroller2__en_"+USER_CURRENCY])
	Javascript_prices_updater(window.wrappedJSObject["models_ModelScroller2__en_"+USER_CURRENCY]);

var xpath2 = document.evaluate("//a[@class='Link107']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var regexp_basket_CRC_price = /^(\d+) Items \((\xa3|\x24|\u20ac|&pound;|&euro;)([0-9\.]+)\)$/;
for (var i = 0; i < xpath2.snapshotLength; i++) {
	node = xpath2.snapshotItem(i).wrappedJSObject;
	textvalue = node.innerHTML;
	if (!regexp_basket_CRC_price.test(textvalue))
		continue;
	regexp_basket_CRC_price.exec(textvalue);
	inbasket = RegExp.$1;
	currency = RegExp.$2;
	price = RegExp.$3;
	priceRUR = convert_price_to_RUR(currency, price);
	while (node.childNodes.length > 0)
		node.removeChild(node.childNodes.item(0));
	node.appendChild(document.createTextNode(replace_special_chars("Товаров: ") + inbasket + replace_special_chars(", сумма: ") + priceRUR + replace_special_chars("&nbsp;р.")));
	node.setAttribute("price", price);
	node.title = currency + price + " - " + EXCHRATE_DATE;
}

if (document.location.pathname.indexOf("/Kits.aspx") == 0) {
	var xpath2 = document.evaluate("//select[@class='DropDown1']/option", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var regexp_selectbox_CRC_price = /^(.+\(\+ )(\xa3|\x24|\u20ac|&pound;|&euro;)([0-9\.]+)(.*)$/;
	var regexp_selectbox_1_CRC_price = /[\n\r]/g, regexp_selectbox_2_CRC_price = /^(\s+)?(.+)(\s+)?$/;
	var node = null;
	for (var i = 0; i < xpath2.snapshotLength; i++) {
		node = xpath2.snapshotItem(i).wrappedJSObject;
		textvalue = node.innerHTML;
		textvalue = textvalue.replace(regexp_selectbox_1_CRC_price, " ").replace(regexp_selectbox_2_CRC_price, "$2");
		if (!regexp_selectbox_CRC_price.test(textvalue))
			continue;
		regexp_selectbox_CRC_price.exec(textvalue);
		prefix = RegExp.$1;
		currency = RegExp.$2;
		price = RegExp.$3;
		suffix = RegExp.$4;
		priceRUR = convert_price_to_RUR(currency, price);
		node.text = /*replace_special_chars(prefix) + */priceRUB + replace_special_chars("&nbsp;р.") + suffix;
	}
}
