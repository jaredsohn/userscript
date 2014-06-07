// ==UserScript==
// @name		Dead Awaken - Remove Heart Conversion
// @namespace		http://www.deadawaken.com/
// @include		http://www.deadawaken.com/game.php?sec=train&scr=skillstore*
// @include		http://www.deadawaken.com/game.php?sec=train&scr=statstore*
// @description		Remove Heart conversion to stat/skill points
// ==/UserScript==

	function $xfirst(path,context)
	{	
		return document.evaluate(path,context||document, 
			null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	
	$xfirst("/html/body/div[@class='main']/div[@id='content']/div[@class='center']/form").style.display="none";