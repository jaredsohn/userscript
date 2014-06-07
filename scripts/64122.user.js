// ==UserScript==
// @name           Neopets : Auto Player
// @namespace      Neopets
// @description    Automatically plays neopets for you, so you don't have to.
// @include        *http://www.neopets.com/*
// ==/UserScript==


Kadoatery = function() {};

Kadoatery.convert = function(doc) {
	var kads = doc.evaluate("//td[@class='content']/div[1]/table/tbody/tr/td/a[img]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); // list of kads (only the sad ones)
	var output = {
		"list": []
	};

	for (var ai = kads.snapshotLength; ai--;) {
		var kad = kads.snapshotItem(ai);

		var b = kad.parentNode.getElementsByTagName("strong"),
		not_fed = b[1].parentNode.tagName.toUpperCase() == "TD";

		output.list.push({
			"Link": (/^http:/.test(kad.href) ? "" : "http://www.neopets.com/games/kadoatery/") + kad.href,
			"Name": b[0].textContent,
			"Feeder": (not_fed ? "" : b[1].textContent),
			"Item": (not_fed ? b[1].textContent : "")
		});
	}

	return output;
};

if (location.hash == "#debug" && /^\/games\/kadoatery(\/|\/index\.phtml)?$/.test(location.pathname)) {
	var output = [];

	for each(var kad in Kadoatery.convert(document).list) {
		output.push([kad.Link.match(/\d+$/), kad.Name, kad.Feeder, kad.Item]);
	}

	alert(output.join("\n"));
}