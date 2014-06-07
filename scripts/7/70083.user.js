// ==UserScript==
// @name          prohardver.hu : all : combobox focus [Firefox]
// @namespace     http://www.prohardver.hu/
// @include       http://www.prohardver.hu/*
// @include       http://prohardver.hu/*
// ==/UserScript==
function scrollingOnClick(e)
{
	var menu = e.target;
	if (menu.ddmCont.ddmIsOpen)
		menu.ddmCont.ddmDoClose();
	else
		menu.ddmCont.ddmDoOpen();
	menu.defaultElement.scrollIntoView(false);
	menu.focus();
	if (e.preventDefault)
		e.preventDefault();
  	e.returnValue = false;
  	return false;
}

window.addEventListener(
	"load", 
	function() 
	{
		unsafeWindow.scrollingOnClick = scrollingOnClick;
		var doc = unsafeWindow.document;
		var menus = doc.evaluate("/html/body/div[3]/div/div/div/div/div/div/div/a", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var n = 0; n < menus.snapshotLength; n++)
		{
			var menu = menus.snapshotItem(n);
			var item = doc.evaluate("../div//li[@class=\"act\" or @class=\"block act\"]", menu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (item == null)
				continue;
	
			menu.defaultElement = item;
			menu.onclick = scrollingOnClick;
			//window.alert(menu.onclick);
		}
		
	},
	false);