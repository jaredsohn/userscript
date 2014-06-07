// ==UserScript==
// @name           Includes : Neopets : Shop
// @namespace      http://gm.wesley.eti.br/includes
// @description    Shop Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.0.3
// @language       en
// @contributor    Steinn (http://userscripts.org/users/85134)
// @include        nowhere
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/53965.user.js
// ==/UserScript==

Shop = function () {};
Shop.fromDocument = function (xml) {
	var sitems = [],
	items = xml.evaluate(".//td[@class = 'content']//table[1]//td/a[contains(@href, '&_ref_ck') and img]", xml, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var ai = 0, at = items.snapshotLength;ai < at;++ai) {
		var item = items.snapshotItem(ai),
		img = item.getElementsByTagName("img")[0],
		texts = xml.evaluate(".//text()[not(starts-with(., ' '))]", item.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		if (/&obj_info_id=(\d+)/.test(item.href))
		sitems.push({
			"Id":RegExp.$1,
			"Link":(!/^http:\/\//i.test(item.href)?"http://www.neopets.com":"") + (!/^\//.test(item.href)?"/":"") + item.href,
			"Image":img.src,
			"Name":texts.snapshotItem(0).textContent,
			"Description":img.getAttribute("title"),
			"Quantity":parseInt(texts.snapshotItem(1).textContent.replace(/[,.]/g,"").match(/\d+/)[0], 10),
			"Price":parseInt(texts.snapshotItem(2).textContent.replace(/[,.]/g,"").match(/\d+/)[0], 10)
		});
		//alert([sitems[ai].Id,sitems[ai].Link,sitems[ai].Quantity]);
	}

	return sitems;
}

Shop.list = function (link, onLoadCallback) {
	var xargs = array_slice(arguments, 2) || [];

	if (!link)
		alert("[Shop.buy]\nArgument 1 is missing");
	else if (typeof onLoadCallback != "function")
		alert("[Shop.list]\nCallback function is missing");
	else if (link && link.responseXML) {
		var msg = link.responseXML.evaluate(".//div[@class='errormess' and b] | .//td[@class='content']/p[5]/b | .//td[@class='content']/center/p[1]", link.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		xargs.unshift(Shop.fromDocument(link.responseXML), link, msg && /^div$/i.test(msg.tagName), msg);
		onLoadCallback.apply(this, xargs);
	} else {
		var req = new HttpRequest();
		//req.options.headers["Referer"] = "http://www.neopets.com/browseshop.phtml";

		xargs.unshift("GET", link, function (e) {
			var msg = e.responseXML.evaluate(".//div[@class='errormess' and b] | .//td[@class='content']/p[5]/b | .//td[@class='content']/center/p[1]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue,
			xargs = array_slice(arguments, 1) || [];
			xargs.unshift(Shop.fromDocument(e.responseXML), e, msg && /^div$/i.test(msg.tagName), msg);
			onLoadCallback.apply(this, xargs);
		});
		req.open.apply(req, xargs);

		req.send({"buy_obj_confirm":"yes"});
	}
};
Shop.buy = function(item, onLoadCallback) {
	if (!item)
		alert("[Shop.buy]\nArgument 1 is missing");
	else {
		var req = new HttpRequest(),
		xargs = array_slice(arguments, 2) || [];

		xargs.unshift("GET", item.Link, function (e) {
		//	https://addons.mozilla.org/en-US/firefox/addon/10636
		//	Description	Shop : Buy
		//	URL			^http:\/\/www\.neopets\.com\/buy_item\.phtml
		//	Function	referrer to specified site
		//	Config...	http://www.neopets.com/browseshop.phtml

			var xargs = array_slice(arguments, 1) || [];
			xargs.unshift(e, onLoadCallback || function () {});
			Shop.list.apply(this, xargs);
		});
		req.open.apply(req, xargs);
		req.send();
	}
};

/*
Shop.list("http://www.neopets.com/browseshop.phtml?owner=...", function(list,e,h,m)
{
	var items = [];
	var buy;
	for ( var ai = 0 , at = list.length ; ai < at ; ++ai )
	{
		var item = list[ai];
		items.push([
			item.Id,
//			item.Link,
//			item.Image,
			item.Name,
//			item.Description,
			item.Quantity,
			item.Price
		].join("\t"));
		if (item.Price == 1)
			buy = item;
	}
	alert(items.join("\n"));
});
*/