// ==UserScript==
// @name          prohardver.hu : all : combobox focus [Opera]
// @namespace     http://www.prohardver.hu/
// @include       http://www.prohardver.hu/*
// @include       http://prohardver.hu/*
// ==/UserScript==
window.addEventListener(
	"load", 
	function() 
	{
		var menus = document.evaluate("/html/body/div[3]/div/div/div/div/div/div/div/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var n = 0; n < menus.snapshotLength; n++)
		{
			var menu = menus.snapshotItem(n);
			var item = document.evaluate("../div//li[@class=\"act\" or @class=\"block act\"]", menu, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (item == null)
				continue;
	
			menu.defaultElement = item;
			menu.onclick =
				function (e)
				{
					var menu = e.srcElement;
					if (menu.ddmCont.ddmIsOpen)
						menu.ddmCont.ddmDoClose();
					else
						menu.ddmCont.ddmDoOpen();
					menu.defaultElement.scrollIntoView(false);
					menu.focus();
					return prevDef(e);
				};
		}
		
	},
	false);