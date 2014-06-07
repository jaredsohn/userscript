// ==UserScript==
// @name           ChangePageTitle
// @namespace      http://userscripts.org/users/TeleKawaru
// @description    Allows a user to change the title displayed for a website
// @include        *
// ==/UserScript==

GM_registerMenuCommand("Change Title...", changeTitle);
GM_registerMenuCommand("Mock New Tab", changeToNewTab);

function changeTitle() {
	var ffFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42t2TQQrCMBBFe4HqungBV8USjC01iKt2UVBcuPAwHkAKRSwFN141zi/DULpKiCsXL8kw/3+SkETW2iDGQZeHdabL+2ZbfKiOMYPL9bYDXEsPWngkQOX7Zz+8T7Q2EGFmVoyZ9qCFRwI4PYHAkQQeCZB0P8xsB34B8AQF/PYIdXOufAPg+aM7CN9Bbo4vevPa1QwtPBLwaLvxbbt+JmjhkQBiQaSE4loxS0bNeil7oi+lcro7fpDjUgAAAABJRU5ErkJggg==';
	var newTitle = prompt("Enter new page title", 'New Tab');
	if (newTitle != null && newTitle != "") {
		document.title = newTitle;
		var links = document.getElementsByTagName('link');
		for (i=0;i<links.length;i++) {
			if (links[i]['rel'].toLowerCase() == "shortcut icon") {
				var icon = links[i];
				(newIcon = links[i].cloneNode(true)).setAttribute('href', ffFavIcon);
				icon.parentNode.replaceChild(newIcon,icon);
			}
		}
	}
}

function changeToNewTab() {
	var ffFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42t2TQQrCMBBFe4HqungBV8USjC01iKt2UVBcuPAwHkAKRSwFN141zi/DULpKiCsXL8kw/3+SkETW2iDGQZeHdabL+2ZbfKiOMYPL9bYDXEsPWngkQOX7Zz+8T7Q2EGFmVoyZ9qCFRwI4PYHAkQQeCZB0P8xsB34B8AQF/PYIdXOufAPg+aM7CN9Bbo4vevPa1QwtPBLwaLvxbbt+JmjhkQBiQaSE4loxS0bNeil7oi+lcro7fpDjUgAAAABJRU5ErkJggg==';
	var newTitle = 'New Tab';
	if (newTitle != null && newTitle != "") {
		document.title = newTitle;
		var links = document.getElementsByTagName('link');
		for (i=0;i<links.length;i++) {
			if (links[i]['rel'].toLowerCase() == "shortcut icon") {
				var icon = links[i];
				(newIcon = links[i].cloneNode(true)).setAttribute('href', ffFavIcon);
				icon.parentNode.replaceChild(newIcon,icon);
			}
		}
	}
}