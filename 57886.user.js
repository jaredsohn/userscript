// ==UserScript==
// @name           YarisWorld Enhanced Mod UI
// @namespace      http://bkuri.com/projects/greasemonkey
// description     Removes logo and extra items to increase screen real estate; resizes images automatically if/when needed. Also adds "Home" and "ModCP" menu items and collapsible menu functionality.
// @exclude        http://www.yarisworld.com/forums/modcp/*
// @exclude        http://yarisworld.com/forums/modcp/*
// @exclude        http://www.yarisworld.com/forums/modcp/posthistory.php*
// @exclude        http://yarisworld.com/forums/modcp/posthistory.php*
// @include        http://www.yarisworld.com/forums/*
// @include        http://yarisworld.com/forums/*
// ==/UserScript==

function removeItems (xpath, removeParent) {
	var useless = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var item, p;
	for (var i = 0; i < useless.snapshotLength; i++) {
		item = useless.snapshotItem(i);
		p = item.parentNode;
		p.removeChild(item);
		if (removeParent) p.parentNode.removeChild(p);
	}
}

// Menu enhancements
function moreLess (event) {
	GM_setValue('expanded', !GM_getValue('expanded'));
	showHide();
	event.preventDefault();
}

function showHide () {
	var expanded = GM_getValue('expanded', true);
	for (var i = 0; i < allMenus.snapshotLength; i++) {
		menu = allMenus.snapshotItem(i);
		switch (i) {
			case 1:
			case 2:
			case 8:
				menu.setAttribute("style", expanded? "display:none" : "display:auto");
			break;
		}
	}

	var plusMinus = document.getElementById('plus-minus');
	plusMinus.innerHTML = expanded? "+" : "-";

	var homeLink = document.getElementById('home-link');
	homeLink.setAttribute("style", expanded? "display:none" : "display:auto");
}

function addMenuItem (index) {
	menu = allMenus.snapshotItem(index);
	var td = document.createElement('td');
	td.setAttribute ("class", "vbmenu_control2");
	menu.parentNode.insertBefore(td, (index == 0)? menu : menu.nextSibling);

	switch (index) {
		case 0:
			// Create plus/minus link at the beginning of the menu bar
			var button = document.createElement('a');
			var label = document.createTextNode('+');
			button.appendChild(label);
			button.setAttribute("href", "#");
			button.addEventListener("click", moreLess, true);
			button.setAttribute("id", "plus-minus");
			td.appendChild(button);

			// create "Home" link
			button = document.createElement('a');
			label = document.createTextNode('Home');
			button.appendChild(label);
			button.setAttribute("href", "index.php");
			button.setAttribute("style", "display:hidden");
			button.setAttribute("id", "home-link");
			td.appendChild(button);
		break;

		case allMenus.snapshotLength -1:
			// add ModCP link
			td.innerHTML = "<td><a href='modcp/index.php' target='_blank'>ModCP</a></td>";
		break;
	}
}

// Automatic image resizer
function resizeImages(maxWidth) {
	var images, idx;
	images = document.getElementsByTagName("img");

	for(idx=0; idx < images.length; idx++) {
		var image  = images[idx];
		var width = image.width;

		if (width > maxWidth) {
			var percent = width/maxWidth;
			image.width = width/percent;
			image.height = image.height/percent;
		}
	}
}

var allMenus = document.evaluate("//td[@class='vbmenu_control2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var menu;
addMenuItem(0);
addMenuItem(allMenus.snapshotLength -1);

// Remove main logo
//removeItems("//a[@href='index.php']");
removeItems("//BODY/TABLE/TBODY/TR/TD[1]");

// Remove main footer
//removeItems("/html/body/form[1]");

// Remove extra table headers
removeItems("//thead");

// Remove extra table headers (alternate approach)
removeItems("//td[@class='tcat']");

// Remove extra table footers
removeItems("//tfoot");

// Remove extra table footers (alternate approach)
removeItems("//td[@class='tfoot']", true);

resizeImages(670);
showHide();