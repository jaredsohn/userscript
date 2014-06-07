// ==UserScript==
// @name		Dead Awaken - Disable Ability to Delete/Reset Character
// @namespace		http://www.deadawaken.com
// @include		http://www.deadawaken.com/game.php?sec=pref&scr=preferences
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

	var remove_These = new Array( "createnew" , "delete" , "freeze");
	
	$xpath("//a[contains(@href, 'scr=')]").forEach(
		function(element)
		{
			for(i in remove_These)
				if(element.getAttribute("href").indexOf(remove_These[i]) != -1)
				{
					element.style.display = "none";
				}
		});