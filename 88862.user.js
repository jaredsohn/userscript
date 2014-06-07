// ==UserScript==
// @name           Pixiv User Filter
// @namespace      http://kishibe.dyndns.tv/
// @description    Pixiv User Filter by nodchip
// @include        http://www.pixiv.net/search.php*
// @include        http://www.pixiv.net/tags.php*
// @grant       none
// ==/UserScript==
(function() {
	var filters = new Array();
	// TODO: Add some IDs to be removed.
	// If the member url is "http://www.pixiv.net/member_illust.php?id=1234567"
	// the ID will be "1234567"
	// TODO: 除外するIDを追加してください
	// メンバーURLが"http://www.pixiv.net/member_illust.php?id=1234567"の場合
	// IDは"1234567"となります。
	// filters.push("ID to be removed");
	// filters.push("除外するID");
	filters.push("224726");
	filters.push("2900788");
	filters.push("1340410");

	function main() {
		var liElements = find(document, "li");
		for ( var liElementIndex = 0; liElementIndex < liElements.length; ++liElementIndex) {
			var liElement = liElements[liElementIndex];
			if (!shouldBeFiltered(liElement)) {
				continue;
			}
			liElement.parentNode.removeChild(liElement);
			document.title += ".";
		}
	}

	function find(element, tagName) {
		var array = new Array();
		var elements = element.getElementsByTagName(tagName);
		for ( var index = 0; index < elements.length; ++index) {
			array.push(elements[index]);
		}
		return array;
	}

	function shouldBeFiltered(li) {
		if (li.getAttribute("class") != "image") {
			return false;
		}
		
		var ps = find(li, "p");
		for (var pIndex = 0; pIndex < ps.length; ++pIndex) {
			var p = ps[pIndex];
			if (p.getAttribute("class") != "user") {
				continue;
			}
			
			var as = find(p, "a");
			for (var aIndex = 0; aIndex < as.length; ++aIndex) {
				var a = as[aIndex];
				var href = a.getAttribute("href");
				var split = href.split("=");
				if (split.length != 2) {
					continue;
				}
				var memberId = split[1];

				for (var filterIndex = 0; filterIndex < filters.length; ++filterIndex) {
					var filter = filters[filterIndex];
					if (memberId == filter) {
						return true;
					}
				}
			}
		}
		
		return false;
	}

	main();
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e) {
		main();
	}, false);
})();
