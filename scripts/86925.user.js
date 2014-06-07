// ==UserScript==
// @name           六维空间资源发行年代
// @namespace      
// @include        http://bt.neu6.edu.cn/forumdisplay.php?fid=*
// ==/UserScript==

(function() {
	var th = document.evaluate('//thead/tr/th/ul', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (!th) return;
	var lititle = document.createElement("li");
	var liall = document.createElement("li");
	var li2010 = document.createElement("li");
	var li2009 = document.createElement("li");
	var noyear = window.location.href.split("&year=")[0];
	var year = window.location.href.split("&year=")[1];
	lititle.innerHTML = '<li class="pipe">|</li>发行年代:';
	liall.innerHTML = '<a title="显示全部年代发行资源" href="' + noyear + '&year=all"><span>全部</span></a>';
	li2010.innerHTML = '<a title="只显示2010年发行资源" href="' + noyear + '&year=2010"><span>2010</span></a>';
	li2009.innerHTML = '<a title="只显示2009年发行资源" href="' + noyear + '&year=2009"><span>2009</span></a>';
	th.appendChild(lititle);
	th.appendChild(liall);
	th.appendChild(li2010);
	th.appendChild(li2009);
	switch (year) {
	case "all":
	case undefined:
		liall.className = "current";
		break;
	case "2010":
		onlyyear("2010");
		break;
	case "2009":
		onlyyear("2009");
		break;
	default:
		onlyyear(year);
	}

	function onlyyear(year) {
		if (year == "2009" | year == "2010" | year == "all") eval("li" + year).className = "current";
		var b = document.evaluate('//form/table/tbody[not(contains(tr/th/span/a/text(),"' + year + '"))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (b.snapshotLength) {
			for (var i = 0; i < b.snapshotLength; i++) {
				if (b.snapshotItem(i).textContent.indexOf("版块主题") != -1) break;
			}
			if (i == b.snapshotLength) i = 0;
			else i++
			for (; i < b.snapshotLength; i++) {
				b.snapshotItem(i).style.display = "none";
			}
		}
		var c = document.evaluate('//div/a[contains(@href,"forumdisplay.php")][contains(@href,"page")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (c.snapshotLength) {
			for (var i = 0; i < c.snapshotLength; i++) {
				c.snapshotItem(i).href = c.snapshotItem(i).href + "&year=" + year;
			}
		}
	}
})();