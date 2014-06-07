// MLS.ca Extras
// 2007-09-03
// Copyright (c) 2007, Marc Novakowski
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MLS.ca Extras", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MLS.ca Extras
// @namespace     http://www.novakowski.net/
// @description   Adds a link to Google Maps, and moves the "more.." images onto the main page
// @include       http://www.mls.ca/PropertyDetails.aspx?*
// @include       http://www.realtor.ca/PropertyDetails.aspx?*
// @grant         GM_xmlhttpRequest
// ==/UserScript==

// Get property id
var propertyId = "";
var form = document.getElementById("frmMain");
if (form && form.action.match(/PropertyId=(\d+)/)) {
	propertyId = RegExp.$1;
}

// Get MLS number
var mls = "";
var mainHeadingLeft = xpath("//td[@class='MainHeadingLeft']");
if (mainHeadingLeft.snapshotLength > 0) {
	mls = mainHeadingLeft.snapshotItem(0).textContent.replace(/\D/g, '');
}
console.log("mls", mls);

// Get price
var price = "";
var mainHeadingRight = xpath("//td[@class='MainHeadingRight']");
if (mainHeadingRight.snapshotLength > 0) {
	price = mainHeadingRight.snapshotItem(0).textContent;
	price = price.substring(price.indexOf("$")).replace(/\s/g, '');
}
console.log("price", price);

// Wrap address with a link to Google Maps
var locationSpans = xpath("//div[@class='PropDetailsSummarySpecText']");
for (var i=0; i < locationSpans.snapshotLength; i++) {
	var locationSpan = locationSpans.snapshotItem(i);
	if (locationSpan.innerHTML.replace(/\s/g, '') == "Location") {
		var locationValueSpan = locationSpan.nextSibling;
		if (locationValueSpan) {
			wrapWithGmapLink(locationValueSpan, mls, price);
		}
		break;
	}
}

// Look for the "More..." button
var moreButton = document.getElementById("_ctl0_eThumbnails_btnMorePhoto");
if (moreButton && propertyId.length > 0 && GM_xmlhttpRequest) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.realtor.ca/PropertyPhotos.aspx?propertyID='+propertyId,
		onload: function(response) {
			if (response.status == 200) {
				// Remove more button
				moreButton.parentNode.removeChild(moreButton);
				var html = response.responseText;
				var imgs = html.match(/http:\/\/cdn\.realtor\.ca\/listing\/[^']+/g) ;
				// Put in map to discard duplicates
				var map = {};
				for (var i=0; i < imgs.length; i++) {
					map[imgs[i]] = true;
				}
				// Add images to thumbnail span
				var thumbSpan = document.getElementById('_ctl0_eThumbnails_rptThumbnails');
				if (thumbSpan) {
					thumbSpan.innerHTML = "";	// Remove existing thumbnails
					for (var img in map) {
						var span = document.createElement('span');
						span.innerHTML = '<a href="'+img.replace('medres', 'highres')+'" target="blank"><img class="PhotoThumbnail" src="'+img.replace('medres', 'lowres')+'" onmouseover="MM_swapImage(\'_ctl0_imgHouse\',\'\',\''+img+'\',1)"></a>';
						thumbSpan.appendChild(document.createTextNode(" "));
						thumbSpan.appendChild(span);
					}
				}
				// Expand thumbnail image sizes by about 1.7x so they are easier to see
				for (var i=0; i < thumbSpan.childNodes.length; i++) {
					var thumbnail = thumbSpan.childNodes.item(i);
					if (thumbnail.nodeType == 1) {
						thumbnail.getElementsByTagName('img')[0].style.width = "56px";
						thumbnail.getElementsByTagName('img')[0].style.height = "51px";
					}
				}
			}
		}
	});
}

function xpath(path) {
	return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function wrapWithGmapLink(element, mls, price) {
	var address = element.innerHTML;
	address = address.replace(/(<br>|&nbsp;)/g, ', ');
	address = address.replace(/^\s*[:]*\s*|\s+$/g, '');
	if (price.length > 0 && mls.length > 0) {
		address += " (" + price + " - MLS: " + mls + ")";
	} else if (mls.length > 0) {
		address += " (MLS: " + mls + ")";
	}
	element.innerHTML = 
		'<a href="http://maps.google.com/maps?q=' +
		escape(address) +
		'" target="mls_map">' +
		element.innerHTML +
		'</a>';
}
