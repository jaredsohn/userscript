// ==UserScript==
// @id             AmazonHistoryKindleFilter
// @name           Amazon History Kindle Filter
// @version        0.0.2.20131128
// @description    Amazonの注文履歴で電子書籍表示のONOFFが出来ます
// @include        https://www.amazon.co.jp/gp/css/order-history*
// @run-at         document-end
// ==/UserScript==
GM_addStyle(
	"span.kindle_filter_btntxt {width:70px;}"
	 + "span.kindle_filter_price {color:rgb(153, 0, 0);font-size:medium;margin-left:15px;}"
);
var css = {
	item:"div.action-box.rounded"
	,itembtn:"a.jp-ss-button.amzn-btn.btn-sec-med > span"
	,itemprice:"span.price"
	,truedisplay:"div[item_kindle_flag='true'] {display:block;}"
	,trueblock:"div[item_kindle_flag='true'] {display:none;}"
	,falsedisplay:"div[item_kindle_flag='false'] {display:block;}"
	,falseblock:"div[item_kindle_flag='false'] {display:none;}"
};
var webStorage = {
	set:function (key, value) {
		if (!window.sessionStorage) {
			return null;
		};
		sessionStorage.setItem(key, value);
	}
	,get:function (key) {
		if (!window.sessionStorage) {
			return null;
		};
		return sessionStorage.getItem(key);
	}
}
var setattr = function (item) {
	var flag = false;
	Array.prototype.slice.call(item.querySelectorAll(css.itembtn)).forEach(function (obj) {
		if (obj.innerHTML=="My Kindle" ) {
			item.setAttribute("item_kindle_flag", "true");
			flag = true;
		};
	});
	if (!flag) {
		item.setAttribute("item_kindle_flag", "false");
	};
	item.setAttribute("item_kindle_price", item.querySelector(css.itemprice).innerHTML.replace(/^.*?([,\d]+)$/, "$1").replace(/,/g, ""));
};
var insertComma = function (sourceStr) {
	var destStr = sourceStr;
	var tmpStr = "";
	while (destStr != (tmpStr = destStr.replace(/^([+-]?\d+)(\d\d\d)/,"$1,$2"))) {
		destStr = tmpStr;
	};
	return destStr;
};
var displayTotalPrice = function (item_kindle_flag) {
	var price = 0;
	var items = Array.prototype.slice.call(document.querySelectorAll(css.item));
	if (items.length!=0) {
		items.forEach(function (item) {
			if (item.getAttribute("item_kindle_flag")==item_kindle_flag) {
				price += Number(item.getAttribute("item_kindle_price"));
			}
		});
	};
	document.querySelector("span.kindle_filter_price").innerHTML = "TotalPrice:" + insertComma(String(price));
};
var wrap = document.createElement("div");
wrap.className = "kindle_filter_wrap"
var btn1 = document.createElement("a");
btn1.className = "amzn-btn btn-sec-med";
btn1.addEventListener("click", function () {
	GM_addStyle(css.truedisplay + css.falseblock);
	displayTotalPrice("true");
	webStorage.set("kindle_display", "true");
});
var btn1txt = document.createElement("span");
btn1txt.innerHTML = "Kindle";
btn1txt.className = "kindle_filter_btntxt"
wrap.appendChild(btn1).appendChild(btn1txt);
var btn2 = document.createElement("a");
btn2.className = "amzn-btn btn-sec-med";
btn2.addEventListener("click", function () {
	GM_addStyle(css.trueblock + css.falsedisplay);
	displayTotalPrice("false");
	webStorage.set("kindle_display", "false");
});
var btn2txt = document.createElement("span");
btn2txt.innerHTML = "Not Kindle";
btn2txt.className = "kindle_filter_btntxt"
wrap.appendChild(btn2).appendChild(btn2txt);
var price = wrap.appendChild(document.createElement("span"));
price.className = "kindle_filter_price";
var pagedata = document.querySelector("div.page-data");
pagedata.parentNode.insertBefore(wrap, pagedata.nextSibling);
var items = Array.prototype.slice.call(document.querySelectorAll(css.item));
if (items.length!=0) {
	items.forEach(function (item) {
		setattr(item);
	});
};
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (event) {
	setattr(event.target);
	displayTotalPrice(webStorage.get("kindle_display"));
});