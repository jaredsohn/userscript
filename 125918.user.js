
// ==UserScript==
// @name		ZEN+
// @version		0.1.0
// @author		korochu@163.com
// @description		谮球迷浏览论坛辅助脚本
// @namespace		http://userscripts.org/scripts/version/125918/
// @include		http://forum.enorth.com.cn/*
// ==/UserScript==

var emts1, emt1, emts2, emt2, emts3, emt3, i, re;

// display signature and change arrow icon
emts1 = document.evaluate(
		"//div[@class='mainbox']/table",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (i = 0; i < emts1.snapshotLength; i++) {
	emt1 = emts1.snapshotItem(i);
	emts2 = document.evaluate(
			".//div[@class='defaultpost']/div[2]",
			emt1,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	if (emts2.snapshotLength > 0) {
		emts2.snapshotItem(0).style.display = '';
		//emts2.snapshotItem(0).style.color = '#a4a4a4';
	}
	emts3 = document.evaluate(
			".//div[@class='defaultpost']/p/label",
			emt1,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	if (emts3.snapshotLength > 0) {
		emts3.snapshotItem(0).innerHTML = emts3.snapshotItem(0).innerHTML.replace("jt_right", "jt_down");
	}
}
