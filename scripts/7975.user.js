// eBay listings item preview and reserve checker
// version 0.2a
// 2007-11-09
// Copyright (c) 2007, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name			eBay listings item preview and reserve checker
// @include			http://*search*ebay.*/*
// @include			http://*listings.ebay.*/*
// @include			http://*stores.ebay.*/*
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
	if(url.match(/http:\/\/.*search.+ebay.+\//) 
			|| url.match(/http:\/\/.*listings.+ebay.+\//) 
			|| url.match(/http:\/\/stores.ebay.+\//)) {
		// listings item preview and reserve checker
		var rows = document.evaluate("//tr[ @class ]",
		    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var row;
		for(var h = 0; h < rows.snapshotLength; h++) {
			row = rows.snapshotItem(h);
			var tds = row.childNodes;
			var a, itemID, td, ebcPr;	
			for(var i = 0; i < tds.length; i++) {
				td = tds[i];
				if(td.getAttribute('class') == 'ebcPr' || td.getAttribute('class') == 'basics') {
					ebcPr = td; // price tag for check whether reserve is met or not
				}
			}
			// let's start the image correction
			for(var i = 0; i < tds.length; i++) {
				td = tds[i];
				if(td.getAttribute('class') == 'ebcPic' || td.getAttribute('class') == 'picture camera') {
					var img;
					if(td.hasChildNodes() && td.firstChild.nodeName == 'A') {
						a = td.removeChild(td.firstChild);
						img = null;
						if(a.hasChildNodes()) {
							img = a.firstChild;
							var div = createElement('div', null);
							div.appendChild(a);
							td.appendChild(div);
						}
					} else if (td.hasChildNodes() && td.firstChild.nodeName == 'DIV') {
						var div = td.firstChild;
						if (div.hasChildNodes() && div.firstChild.nodeName == 'A') {
							a = div.firstChild;
							img = null;
							if(a.hasChildNodes()) {
								img = a.firstChild;
							}
						}
					}
					if(img != null) {
						img.width = width;
						img.height = height;
						img.removeAttribute('onmouseover');
						img.removeAttribute('class');
						img.alt = 'tbox';
						var href = a.getAttribute('href');
						var parent = img.parentNode;
						var itemID = href.match(/QQitemZ(\d+)QQ/)[1];
						if (parseInt(itemID) == itemID - 0) {
					        // delegate xmlhttp_request
							processRequest(img, itemID, parent, ebcPr, tld);
					    }
					}
				}
			}
		}		
		
		// add thickbox
		createThickbox();
	}
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
				if(content.match(/<a name=\"ebayphotohosting\"><\/a><br><img src="http:\/\/.*?\" name=\"eBayBig\"/)) {
					imgURL = content.match(/<a name=\"ebayphotohosting\"><\/a><br><img src="(http:\/\/.*?)\" name=\"eBayBig\"/)[1];
				} else if(content.match(/<img src="http:\/\/.*?\" name=\"eBayBig\"/)) {
					imgURL = content.match(/<img src="(http:\/\/.*?)\" name=\"eBayBig\"/)[1];
				} else if(content.match(/<\/a><img src="http:\/\/.*?\" border=\"\d*?\" name=\"stockphoto\" alt=\".*?\" title=\".*?\">/)) {
					imgURL = content.match(/<\/a><img src="(http:\/\/.*?)\" border=\"\d*?\" name=\"stockphoto\" alt=\".*?\" title=\".*?\">/)[1];
					GM_log(imgURL);
				}
				this.xhRParent.href = imgURL;
				this.xhRImg.src = imgURL;
				this.xhRImg.height = height;
				this.xhRImg.width = width;
				this.xhRImg.removeAttribute('title');
				
				// for search and item listings
				if(this.xhRPrice != null && content.match(/DetailsReserve/)) {
					var d = createElement('div', [['class','navigation'],['style','color:red']]);
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