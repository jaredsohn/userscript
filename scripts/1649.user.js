// ==UserScript==
// @name           eBay Shipping Preview (international)
// @namespace      http://userscripts.org/people/336
// @description    Show eBay shipping costs section in a preview div when the price is clicked.
// @version        0.2.1
// @date           2005-10-20
// @include        http*://*.ebay.*
// ==/UserScript==
//
// **COPYRIGHT NOTICE**
// 
// Copyright (C) 2005  Richard Gibson (richard.gibson@gmail.com)
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
// 
// **END COPYRIGHT NOTICE**
//
//
// Adapted from [eBay Shipping Preview](http://userscripts.org/scripts/show/1178) by Michael Felix.
//
// Changelog
// 0.2.1 (2005-10-20)
// 	corrected a small oversight in the highlight code
// 0.2 (2005-10-05)
// 	made the shipping information always display above other content
// 	improved the highlighting code
// 	switched from CSS "border" to "outline" (when available)
// 	added copyright notice (the code is now mine)
// 	added IE compatibility (just in case)
// 0.1 (2005-09-02)
// 	original release
// 
// -------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -------------------------------------------------------------------------------------------------

(function () {

function highlight (evt) {
	evt = evt || window.event;
	var target = evt.currentTarget || evt.srcElement, from = evt.relatedTarget || evt.fromElement;
	if (target && target.nodeType == 3) target = target.parentNode;
	
	while (from && from !== target) from = from.parentNode;
	
	if (from !== target) {
		target.style[target.style.outline ? 'outlineColor' : 'borderColor'] = 'red';
		target.style.background = '#ff8';
	}
};

function unHighlight (evt) {
	evt = evt || window.event;
	var target = evt.currentTarget || evt.srcElement;
	if (target && target.nodeType == 3) target = target.parentNode;
	
	target.style[target.style.outline ? 'outlineColor' : 'borderColor'] = 'transparent';
	target.style.background = 'transparent';
};

function showShipping (evt) {  
	evt = evt || window.event;
	var target = evt.currentTarget || evt.srcElement;
	if (target && target.nodeType == 3) target = target.parentNode;
	
	target.style[target.style.outline ? 'outlineColor' : 'borderColor'] = 'green';
	
	while (target && target.nodeName.toUpperCase() != 'TR') {
		target = target.parentNode;       
	}
	if (!target) return;
	
	target = target.getElementsByTagName('a')[0];
	if (!target) return;
	
	var div = document.getElementById('es_shippingDiv');
	try { setTimeout(function(){bringToFront(div);}, 0); } catch (ex) {}
	div.innerHTML = 'Loading...';
	div.style.visibility = 'visible';
	
	var failureMessage = 'Could not load shipping section.';
	HTTPRequest({method: 'GET', url: target.href,
		onerror: function(){ div.innerHTML = failureMessage; },
		onload: function (objResult) {
			if (!objResult) {
				div.innerHTML = failureMessage;
			}
			else {            
				while (div.firstChild) div.removeChild(div.lastChild);
				var fragment, node, title, titleAdded = false;
				try {
					fragment = document.createDocumentFragment();
				}
				catch (ex) {
					fragment = document.createElement('html');
				}
				fragment.appendChild(document.createElement('body')).innerHTML =
						objResult.responseText.replace(/\s+/g, ' ').replace(/^.*?<\s*body.*?>/i, '')
						.replace(/<\s*\/body\s*>.*$/i, '');
				node = document.evaluate(".//a[@name='ShippingPayment']", fragment.firstChild, null,
						XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
				if (!node) div.innerHTML = failureMessage;
				while (node) {
					title = document.evaluate(".//*[contains(@class,'title')]", node, null,
							XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
					if (titleAdded && title) break;
					fragment = node.nextSibling;
					div.appendChild(node);
					if (title) {
						titleAdded = true;
						if (fragment && (node.textContent || node.innerHTML.replace(/<.*?>|\s+/g, ""))
								== (title.textContent || title.innerHTML.replace(/<.*?>|\s+/g, ""))) {
							node = fragment;
							fragment = node.nextSibling;
							div.appendChild(node);
						}
					}
					node = fragment;
				}
			}
		}
	});
};

function hideShipping (evt) {
	evt = evt || window.event;
	var	div = document.getElementById('es_shippingDiv'),
			target = evt.currentTarget || evt.srcElement,
			to = evt.relatedTarget || evt.toElement;
	if (target && target.nodeType == 3) target = target.parentNode;
	
	while (to && to !== target) to = to.parentNode;
	
	if (to !== target) {
		div.style.visibility = 'hidden';
		unHighlight(evt);
	}
};

var STYLE_RE = /-(.)/g;
var STYLE_RE_FUNCTION = function (substring, paren1) { return paren1.toUpperCase(); };

function getStyle (varStyles, strProperty) {
	try {
		return varStyles.getPropertyValue(strProperty);
	}
	catch (ex) {
		return (varStyles || {})[(strProperty + '').replace(STYLE_RE, STYLE_RE_FUNCTION)];
	}
}

function bringToFront (el) {
	try {
		var	maxZ = 1,
				doc = el.ownerDocument || document,
				getComputedStyle = (doc.defaultView || window).getComputedStyle,
				all = doc.getElementsByTagName("*"),
				styles;
		for (var i = all.length - 1; i >= 0; i--) {
			try {
				styles = getComputedStyle(all[i], "");
			}
			catch (ex) {
				styles = all[i].currentStyle || all[i].style;
			}
			maxZ = Math.max(maxZ, parseInt(getStyle(styles, "z-index"), 10) || 0);
		}
		el.style.zIndex = maxZ + 1;
	} catch (ex) {}
}

// retrieve or make an XMLHttpRequest wrapper compatible with GM_xmlhttpRequest (Greasemonkey)
var HTTPRequest;
try {
	HTTPRequest = GM_xmlhttpRequest;
}
catch (ex) {
	// adapted from http://jibbering.com/2002/4/httprequest.html
	HTTPRequest = function (objDetails) {
		var request = null;
		/*@cc_on @*/	// JScript (Internet Explorer) conditional compilation
		/*@if (@_jscript_version >= 5)
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (ex) {
			try { request = new ActiveXObject("Microsoft.XMLHTTP"); } catch (ex) {}
		}
		@end @*/
		try { request = request || new XMLHttpRequest(); } catch (ex) {}
		if (request) { try {
			request.open(objDetails.method, objDetails.url, true);
			try {
				for (var h in objDetails.headers) {
					try { request.setRequestHeader(h, objDetails.headers[h]); } catch (ex) {}
				}
			} catch (ex) {}
			request.onreadystatechange = function () {
				var	properties = ["responseText", "status", "statusText", "readyState"],
						details = {responseHeaders: request.getAllResponseHeaders()};
				for (var i = 0; i < properties.length; i++) {
					details[properties[i]] = request[properties[i]];
				}
				try { objDetails.onreadystatechange.call(request, details); } catch (ex) {}
				if (request.readyState == 4) { try {
					objDetails[request.status == 200 ? "onload" : "onerror"].call(request, details);
				} catch (ex) {} }
			};
			request.send(objDetails.data || null);
		} catch (ex) {} }
	};
}

var div = document.createElement('div'); 
div.style.border = '2px solid black';
div.style.background = 'white';
div.style.position = 'absolute';
div.style.position = 'fixed';
div.style.visibility = 'hidden';
div.style.top = 0;
div.style.left = 0;
div.id = 'es_shippingDiv';
document.body.insertBefore(div, document.body.firstChild);

var prices = document.evaluate("//table[contains(@class,'ebItemlist')]/tbody/tr/td[@class='ebcPr']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var t = 0; t < prices.snapshotLength; t++) {
	var price = prices.snapshotItem(t);
	price.addEventListener('mouseover', highlight, true);
	price.addEventListener('click', showShipping, true);
	price.addEventListener('mouseout', hideShipping, true);
	price.style.outline = '1px solid transparent';
	if (!price.style.outline) price.style.border = '1px solid transparent';
	price.style.outlineRadius = price.style.MozOutlineRadius = price.style.MozBorderRadius = '10px';
	price.style.textDecoration = 'underline';
}

})();
