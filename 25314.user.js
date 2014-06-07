// ==UserScript==
// @name		Dead Awaken - Remove Unwanted Skill Links
// @namespace		http://www.deadawaken.com
// @include		http://www.deadawaken.com/game.php?sec=train&scr=skillstore*
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

	var unwanted_Ids = new Array( "skillId=1" , "skillId=5" , "skillId=6");
	
	$xpath("//a[contains(@href, 'skillId')]").forEach(
		function(element)
		{
			for(i in unwanted_Ids)
				if(element.getAttribute("href").indexOf(unwanted_Ids[i]) != -1)
				{
					element.style.display = "none";
					element.parentNode.replaceChild(document.createTextNode(element.textContent),element);
				}
		});