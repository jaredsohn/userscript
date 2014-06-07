// ==UserScript==
// @name           Web Resarch Report Auto Login
// @namespace      ashphy.webResearchReport
// @description    Web研究日誌に自動でログインします．
// @include        https://lion.cc.kagoshima-u.ac.jp/*
// ==/UserScript==

(function() {
	if(document.location == "https://lion.cc.kagoshima-u.ac.jp/sreport/start.php")
	{
		document.location = "https://lion.cc.kagoshima-u.ac.jp/sreport/std/logins_students.php";
	}
	
	if(document.location == "https://lion.cc.kagoshima-u.ac.jp/sreport/std/logins_students.php")
	{
		//passwordが入力されているかの確認
		var password = xpath('//input[@name="pwd"]');
		/*'//input[@name="pwd"]', document, null, 				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );*/
		
		if(!password.length)
		{
			console.log("ないよー");
		}
		else
		{
			if(password[0].value)
			{
				password[0].click();
				
				var submit = xpath('/html/body/div/table/tbody/tr/form');
				
				console.log(submit);
				submit[0].submit();
			}
		}
	}
	
	function xpath(query) {
		var results = document.evaluate(query, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		for(var i=0; i<results.snapshotLength; i++)
		{
			nodes.push(results.snapshotItem(i));
		}
		return nodes;
	}
})();