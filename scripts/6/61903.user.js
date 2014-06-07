// ==UserScript==
// @name           Offprint
// @namespace      http://www.flickr.com/photos/gustavog
// @include        http://www.flickr.com/*
// ==/UserScript==

// edit the next line if you want some text instead of the cart, e.g. 'Print'
// default is just no cart and no text
var textInsteadOfCart = '';

if (location.href.match('flickr\.com\/photos\/organize')){
	// delete or comment out the following two lines to keep the Organizr tab
	var printTab = document.getElementById('tabl_tab_print');
	printTab.style.display='none';
} else {
	if (location.href.match('flickr\.com\/photos\/.+?\/[0-9]+')) {
		// delete or comment out the following five lines to keep the button over the image
		var buttons = document.evaluate('//a[@id="photo_gne_button_print"]',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    	if (buttons.snapshotLength > 0) {
			var button = buttons.snapshotItem(0);
			button.style.display='none';
		}
	} else if (location.href.match('flickr\.com\/photos\/upload\/done')){
		// delete or comment out the following five lines to keep the link after uploading
		var text = document.evaluate('//text()',
		    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<text.snapshotLength; i++) {
			var node = text.snapshotItem(i);
			node.data = node.data.replace('Create Prints at Snapfish', '');
		}
	}

	// delete or comment out the following four lines to keep the cart icon
	var images = document.evaluate('//div[@id="TopBar"]//img',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var image = images.snapshotItem(1);
	var text = document.createTextNode(textInsteadOfCart);
	image.parentNode.replaceChild(text, image);

	// delete or comment out the following six lines to keep the "organize & create" text
	var text = document.evaluate('//text()',
	    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<text.snapshotLength; i++) {
		var node = text.snapshotItem(i);
		node.data = node.data.replace('Organize & Create', 'Organize');
	}
	
	// delete or comment out the following three lines to keep the homepage module
	var mods = document.evaluate('//div[@id="promo-do-more-fb"]',
	    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var mod = mods.snapshotItem(0);
	mod.style.display='none';
}
