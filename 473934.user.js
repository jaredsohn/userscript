// ==UserScript==
// @name        Flickr Right Click View All Sizes
// @include     http*://*flickr.com/*
// ==/UserScript==

if(!('contextMenu' in document.documentElement && 'HTMLMenuItemElement' in window)) {
	return;
}

document.body.addEventListener('contextmenu', function() {
	if(arguments[0].target.className.indexOf('navigate-target') > -1) {
		if(document.querySelector('.view-all-sizes')) {
			document.body.setAttribute('contextmenu', 'userscript-view-all-sizes');
		} else {
			document.body.setAttribute('contextmenu', 'userscript-cant-view-all-sizes');
		}
	} else {
		document.body.removeAttribute('contextmenu');
	}
}, false);

var menu = document.body.appendChild(document.createElement('menu'));
menu.outerHTML = '<menu id="userscript-view-all-sizes" type="context"><menuitem label="View all sizes of this image" icon="https://www.flickr.com/favicon.ico"></menuitem></menu>';

var menu2 = document.body.appendChild(document.createElement('menu'));
menu2.outerHTML = '<menu id="userscript-cant-view-all-sizes" type="context"><menuitem label="No other sizes of this image" icon="https://www.flickr.com/favicon.ico"></menuitem></menu>';
menu2.disabled = true; //Doesn't seem to work

document.querySelector('#userscript-view-all-sizes menuitem').addEventListener('click', function() {
	document.querySelector('.view-all-sizes').click();
}, false);