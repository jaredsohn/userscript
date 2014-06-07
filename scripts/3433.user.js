// ==UserScript==
// @name        Ignore not Creative-Commons Flickr Photos
// @namespace   http://lowreal.net/
// @include     http://www.flickr.com/photos/*
// ==/UserScript==

(function () {

	if (document.evaluate(
		"//div[@class='Set']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null).snapshotLength > 0) {
		var result = document.evaluate(
			"//div[@class='StreamView']/*",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

		var photos = document.createDocumentFragment();
		var photo;
		for (var i = 0, len = result.snapshotLength; i < len; i++) {
			var item = result.snapshotItem(i);
			if (item.nodeName.toLowerCase() == "h4") {
				if (photo) {
					photos.appendChild(photo);
				}
				photo = document.createElement("div");
				photo.className = "__GM_Photo";
			} else {
				if (!photo) continue;
			}
			photo.appendChild(item);
		}
		if (photo) {
			photos.appendChild(photo);
		}

		document.evaluate(
			"//div[@class='StreamView']",
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null).singleNodeValue.appendChild(photos);

	} else {
		var result = document.evaluate(
			"//div[@class='StreamView']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0, len = result.snapshotLength; i < len; i++) {
			result.snapshotItem(i).className = "__GM_Photo " + result.snapshotItem(i).className;
		}
	}

	var photo_path = "//div[starts-with(@class, '__GM_Photo') and not(.//img[@src='/images/icon_creative_commons.gif'])]";

	var result = document.evaluate(
		photo_path,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0, len = result.snapshotLength; i < len; i++) {
		var item = result.snapshotItem(i);
		item.style.opacity = "0.3";

		item.addEventListener("mouseover", function (e) {
			e.currentTarget.style.opacity = "1";
			e.stopPropagation();
		}, false);

		item.addEventListener("mouseout", function (e) {
			e.currentTarget.style.opacity = "0.3";
			e.stopPropagation();
		}, false);
	}

})();
