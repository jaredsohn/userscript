// ==UserScript==
// @name           deleteMixi3gokushiAds
// @version        0.1.0
// @namespace      http://userscripts.org/scripts/show/115355
// @description    うざい広告を消すです
// @icon           http://lh4.googleusercontent.com/-TLABZfYahec/TpbGOHqNaEI/AAAAAAAABU4/NiBJPzy46Zw/s135/icon_deleteMixi3gokushiAds.png
// @include        http://m*.3gokushi.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){

	// うざい広告のID
	var targetIDs = [
		'mixi_ad_head',
		'mixi_ad_groups'
	];

	for (var i = 0; i < targetIDs.length; i++){
		// とにかく、まずは非表示にする
		GM_addStyle('#' + targetIDs[i] + ' { display: none !important }');

		// 非表示のままでは気持ち悪いので、ノード自体も削除する
		var node = document.getElementById(targetIDs[i]);
		if (node != null) {
			node.parentNode.removeChild(node);
		}
	}

}) ();
