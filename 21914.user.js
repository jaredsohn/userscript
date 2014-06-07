// ==UserScript==
// @name		Dead Awaken - Disable Selling of Weapons/Armor
// @namespace		http://www.deadawaken.com
// @include		http://www.deadawaken.com/game.php?sec=home&scr=weaponsnarmor*
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

	var no_Sales = new Array( "sell&invId");
	
	$xpath("//a[contains(@href, 'scr=weaponsnarmor')]").forEach(
		function(element)
		{
			for(i in no_Sales)
				if(element.getAttribute("href").indexOf(no_Sales[i]) != -1)
				{
					element.style.display = "none";
                    var text = document.createElement("b");
                    text.innerHTML = element.textContent;
                    element.parentNode.replaceChild(text,element);
				}
		});