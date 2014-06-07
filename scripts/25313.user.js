// ==UserScript==
// @name		Dead Awaken - Remove Unwanted Stat Links
// @namespace		http://www.deadawaken.com
// @include		http://www.deadawaken.com/game.php?sec=train&scr=statstore*
// ==/UserScript==

	function $xpath(path, context)
	{
		var arr = [];
		for(i = 0,all=document.evaluate(path,context||document, null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				item = all.snapshotItem(i); i++) 
			arr.push(item);
		return arr;
	}

	var unwanted_Ids = new Array("statId=9" , "statId=3")
	
	$xpath("//a[contains(@href, 'statId')]").forEach(
		function(element)
		{
			for(i in unwanted_Ids)
				if(element.getAttribute("href").indexOf(unwanted_Ids[i]) != -1)
				{
					element.style.display = "none";
                    var text = document.createElement("b");
                    text.innerHTML = element.textContent;
                    element.parentNode.replaceChild(text,element);
				}
		});