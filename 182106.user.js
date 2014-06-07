// ==UserScript==
// @name           400gb.com work with adblock
// @description    Remove adblock check from 400gb.com 解决城通网盘检查广告屏蔽插件的问题。
// @include        http://www.400gb.com/file/*
// @copyright      2013, Wynn Chen
// @create         2013-11-07
// @lastmodified   2013-11-07
// @author         Wynn Chen
// @version        0.1
// ==/UserScript==

(function () {
	//寻找那个form：
	var allForms, targetForm = null;
	allForms = document.evaluate(
		"//form[@action='/guest_loginV2.php']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < allForms.snapshotLength; i++) {
		targetForm = allForms.snapshotItem(i);
		targetForm.onsubmit = function(){};
	}
})();
