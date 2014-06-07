// ==UserScript==
// @name          eBay dePopUpator
// @namespace     http://justinas.me
// @description   Gets rid of stupid eBay popups for country selection
// @copyright     copyleft 2011 Justinas Stankevicius
// @license       LGPL 3 I guess
// @version       0.1
// @include       http://*ebay.co.uk/*
// @include       http://*.ebay.co.uk/*
// @include       http://*ebay.com/*
// @include       http://*.ebay.co.uk/*
//
// @history       0.1 Now enables the „Sort by“ selection (because eBay disables it)
// @history       0.03 Stops checking for popup/overlay after 20 secs (I think that's enough), because some pages just don't have those (actually, all not-search pages, like account settings, messages and so on)
// @history       0.02 Script now checks for popup and overlay seperately, so it deletes them even faster :)
// ==/UserScript==

var id = null;
var overlayDeleted = false;
var popupDeleted = false;

var byePopup = function() {
    if (popupDeleted && overlayDeleted) {
        return null;
    }
	// First the overlay //
	overlay = document.getElementsByClassName('ajax-mask')[0]
	if (overlay == undefined) {
		console.log('no overlay')
	}

	else {
		try {
			document.body.removeChild(
				overlay
			);
			console.log('overlay deleted')
			overlayDeleted = true;
		}
		catch(err) {
		}
	}
	
	// Then the popup //
	popup = document.getElementsByClassName('ov-w lop')[0]
	if (popup == undefined) {
		console.log('no popup')
	}
	else {
		popup.style.display = 'none';
		console.log('popup deleted')
		popupDeleted = true;
	}
	// Now ebay also disables the „sort by“ select...
	sb = document.getElementById('v4-48')
	if (sb == undefined) {
	    console.log('no sb')
	    
	}
	else {
	    sb.disabled = false
	    console.log('sort button enabled')
	}
	if  (overlayDeleted && popupDeleted) {
    	window.clearInterval(id);
    	console.log('interval cleared')
    }
};

var ready = function () {
	id = window.setInterval(byePopup,200);
	console.log(id)
	window.setTimeout('window.clearInterval(id)',20000) // why? check out 0.03's changelog. I think 20 secs is enough.
};

window.addEventListener('load',ready())