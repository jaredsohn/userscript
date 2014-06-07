// ==UserScript==
// @name           GOODLUCK!!BABY!!
// @namespace      ftrx.jp
// @description    GOODLUCK!!BABY!!
// @include        http://gamemeter.net/cmt/*
// ==/UserScript==

(function(){
	
	// http://yamanoue.sakura.ne.jp/blog/coding/68
	// 朮版xpath
	function xpath(query) {
		var results = document.evaluate(query, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		for(var i=0; i<results.snapshotLength; i++){
			nodes.push(results.snapshotItem(i));
		}
		return nodes;
	}
	
	var a = xpath("//div[@class='comment_box_r']");
	a[0].innerHTML = a[0].innerHTML.split(' <a href="/cmt/').join('<br>GOODLUCK!!BABY!! <a href="/cmt/');
	
})();


