// ==UserScript==
// @name           bro3_10k
// @version        1.0
// @namespace      http://example.com/
// @description    ブラウザ三国志の訓練施設で1万以上の数を指定できるようにするスクリプトです
// @include        http*://*.3gokushi.jp/facility/*
// @icon		
// ==/UserScript==
( function(){
	var nodes = document.evaluate('/descendant::*[starts-with(@name,"unit_value")]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, maxi = nodes.snapshotLength; i < maxi; i++)
		{
 		 nodes.snapshotItem(i).maxLength=5;
		}
}) ();
