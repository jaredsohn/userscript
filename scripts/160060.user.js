// ==UserScript==
// @name              showRMB
// @namespace         ggshily
// @description       show rmb in apple store
// @include           store.apple.com/*
// @version           0.02

// ==/UserScript==

(function() {

	const HK_DOLLAR = "HK$";

	function $(w){
		return document.getElementById(w.substring(1));
	};
	
	function xpath(query, context){
		return document.evaluate(context?(query.indexOf('.')==0?query:'.' + query):query, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
	function run(){
		var items = xpath('//*[@itemprop="price"]', document);
		
		for(var i = 0; i < items.snapshotLength; i++)
		{
			var item = items.snapshotItem(i);

			//console.log(item);

			item.textContent = parseCount(item);
		}
	}

	function parseCount(item) {
		var content = item.textContent;
		if(content.indexOf(HK_DOLLAR) >= 0)
		{
			var index = content.indexOf(HK_DOLLAR);
			var end = content.indexOf("\n", index + HK_DOLLAR.length);
			var count = content.substring(index + HK_DOLLAR.length, end);
			//console.log(count);

			content = content.replace(count, count + "(RMB " + getRMB(count) + ")");

			console.log(content);
		}

		return content;
	}

	function getRMB(countStr) {
		var count = (Number(countStr.replace(",", "")) * .8).toString();

		if(count.indexOf(".") >= 0)
		{
			count = count.substring(0, count.indexOf(".") + 2);
		}
		return count;
	}
	
	run();
	
	// document.addEventListener("DOMNodeInserted",
	// function(evt)
	// {
	// 	run();
	// });
	
})();