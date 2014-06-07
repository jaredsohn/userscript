// MyeBay item preview
// version 0.2
// 2007-03-28
// Copyright (c) 2007, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          my ebay item preview
// @namespace     http://my-ebay-item-preview.org/
// @description   Loads item previews in my eBay watching page if available.
// @include       http*://my.ebay.*/ws/eBayISAPI.dll*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

// a variable for the document url
var url = document.URL;
// a variable for the top level domain extension
var tld = document.domain.match(/ebay.(.+)/)[1];
// values for item previews
const height = "40";
const width = "40";

function start() {
	var items = document.evaluate("//img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var img, itemID;
	for(var i = 0; i < items.snapshotLength; i++) {
		img = items.snapshotItem(i);
		if(img.src.match(/\.jpg/) || img.src.match(/_p__64x15.gif/) || img.src.match(/iconPic_20x20.gif/)) {
			img.width = width;
			img.height = height;
			img.removeAttribute('onmouseover');
			img.removeAttribute('class');
			img.alt = 'tbox';
			var parent = img.parentNode;
			var href = parent.getAttribute('href');
			if(href != null) {
				if(href.match(/item=(\d+)&/)) {
					itemID = href.match(/item=(\d+)&/)[1];
					if (parseInt(itemID) == itemID - 0) {
						// delegate xmlhttp_request
						processRequest(img, itemID, parent, null, tld);
					}
				}
			}
		}
	}
	createThickbox();
}

// processes the xmlhttp_request and its response
function processRequest(img, itemID, parent, ebcPr, tld) {
	GM_xmlhttpRequest({
        xhRImg: img,
        xhRItemID: itemID,
		xhRParent: parent,
		xhRPrice: ebcPr,
		xhRTld: tld,
		method: 'GET',
        url: 'http://cgi.ebay.' + tld + '/ws/eBayISAPI.dll?ViewItem&item=' + itemID,
        onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var content = responseDetails.responseText;
				var imgURL;
				if(content.match(/ImageUrls = \[\[ \'(.+)\' \]\]/)) {
					imgURL = content.match(/ImageUrls = \[\[ \'(.+)\' \]\]/)[1];
				} else if(content.match(/<img title=\"\" src=\".+\" border=\"0\" name=\"ss0Viewport\">/)) {
					imgURL = content.match(/<img title=\"\" src=\"(.+)\" border=\"0\" name=\"ss0Viewport\">/)[1];
				} else if(content.match(/<img .* src=\".+\.JPG\"/)) {
					imgURL = content.match(/<img .* src=\"(.+\.JPG)\"/)[1];
				}
				var refURL = imgURL.replace(/2.JPG/, "1.JPG");
				if(content.indexOf(refURL) != -1) {
					this.xhRParent.href = refURL;
				} else {
					if(content.indexOf("1_b.JPG") != -1) {
						this.xhRParent.href = refURL.replace(/1.JPG/, "1_b.JPG");
					} else if(content.indexOf("12_sb.JPG") != -1) {
						this.xhRParent.href = refURL.replace(/1.JPG/, "12_sb.JPG");
					} else {
						this.xhRParent.href = imgURL.replace(/1_b.JPG/, "12.JPG");
					}
				}								
				this.xhRImg.src = imgURL;
				this.xhRImg.height = height;
				this.xhRImg.width = width;
				this.xhRImg.removeAttribute('title');
				
				// for search and item listings
				if(this.xhRPrice != null && content.match(/DetailsReserve/)) {
					var d = createElement('div', [['class','navigation']]);
					var msg;
					if(this.xhRTld == 'de') {
						msg = document.createTextNode('Mindestpreis nicht erreicht');
					} else {
						msg = document.createTextNode('Reserve not met');
					}
					d.appendChild(msg);
					this.xhRPrice.appendChild(d);
				}
            } else {
                this.xhRImg.src = defaultImg;
				this.xhRImg.height = "16";
				this.xhRImg.width = "16";
            }
        }
    });
}

// integrates the thickbox for item preview
function createThickbox() {
	var images = document.evaluate("//img[ @alt = 'tbox' ]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var img;
	var list = new Array();
	for(var i = 0; i < images.snapshotLength; i++) {
		img = images.snapshotItem(i);
		if(img.parentNode.nodeName == 'A') {
			list.push(img);			
		}
	}
	if(list.length > 0) {
		var head = document.getElementsByTagName('head')[0];
		var basedir = "http://feedbackfox.mozdev.org/other/";
		var li = createElement('link', [['rel', 'stylesheet'], ['type', 'text/css'], ['href', basedir + 'thickbox.css']]);
		head.appendChild(li);
		var sc1 = createElement('script', [['type', 'text/javascript'], ['src', basedir + 'js_constants.js']]);
		head.appendChild(sc1);
		var sc2 = createElement('script', [['type', 'text/javascript'], ['src', basedir + 'jquery-compressed.js']]);
		head.appendChild(sc2);
		var sc3 = createElement('script', [['type', 'text/javascript'], ['src', basedir + 'thickbox.js']]);
		head.appendChild(sc3);
		var parent;
		for(var i = 0; i < list.length; i++) {
			img = list[i];
			parent = img.parentNode;
			parent.href = img.src;
			parent.setAttribute('class', 'thickbox');
			if(!parent.href.match(/jpg/)) {
				parent.href = img.src;
			}
			img.alt = tld = 'de' ? 'Bild' : 'Picture';
		}
	}
}

// creates a new element with the given attribute list
function createElement(type, attributes) {
	var element = document.createElement(type);
	if(attributes != null) {
		for(var i = 0; i < attributes.length; i++) {
			element.setAttribute(attributes[i][0], attributes[i][1]);
		}
	}
	return element;
}

window.addEventListener('load', start());