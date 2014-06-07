// ==UserScript==
// @name pk.kai.ru
// @namespace pk.kai.ru/
// @description Подменю на сайте pk.kai.ru теперь выпадает по клику, а НЕ сразу после наведения мыши и больше НЕ мешает
// @author bz
// @include *pk.kai.ru*
// @exclude file://*
// ==/UserScript==


function corMenu() {
	var str = "function showSubmenu(cell, submenu) {"
		+ "	if (null != currentMenu) {"
		+ "		switchDiv(currentMenu, false);"
		+ "		if (null != selectedMenu)"
		+ "			setClassName(selectedMenu, 'top_menu_item');"
		+ "	}"
	    + ""
		+ "	if (null != submenu) {"
		+ "		setClassName(cell, 'top_menu_item_selected');"
		+ "		selectedMenu = cell;"
		+ "		submenu = getElementById(submenu);"
		+ "  		currentMenu = submenu;"
		+ "        $(selectedMenu).unbind('click').click(function(){"
		+ "			submenu.style.left = getPos(cell, 'Left') + 'px';"
		+ "			submenu.style.top = getPos(cell, 'Top') + cell.offsetHeight + 'px';"
		+ "			switchDiv(submenu, true);"
		+ "			return false;"
		+ "		});"
		+ "}"
	+ "}";
	unsafeWindow.location = 'javascript:' + str;
}

window.setTimeout(corMenu, 600);