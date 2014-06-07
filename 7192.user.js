/* (C) 2006 - 2009 Johannes la Poutre

This script works on all product detail pages of the Ikea.com
catalog, where the product availability check pull-down is found.

It takes all departments from the pull down and checks for availability
of the current product. The results are summarized in a table below 
the pull down element.

LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

CHANGELOG
=========

Version 1.03 / 20090310
	- updated for new availability information
	- rollover store names to see full text (tooltip)

Version 1.02 / 20071016
	- updated 'include' url for changed ikea site
	- tweaked layout
	- added some robustness if page layout changes

Version 1.01
	- truncate long availability lines (Canada store)

Version 1.00
	- initial release


*/
// ==UserScript==
// @name           Ikea Availability Check
// @namespace      http://userscripts.org/users/28
// @description    Check for availability in all local Ikea departments 
// @include        http://www.ikea.com/*/catalog/products/*
// @version	   1.03
// ==/UserScript==


// http://www.ikea.com/webapp/wcs/stores/servlet/IkeamsStockAvailSearch?productId=74283&ikeaStoreNumber1=081&langId=-22&storeId=9

var Ikea = {
	baseUrl: "http://www.ikea.com/webapp/wcs/stores/servlet/IkeamsStockAvailSearch",
	init: function() {
		var tab = document.createElement('table');
		tab.style.border = '1px solid #c00';
		tab.style.backgroundColor = "rgb(255, 234, 204)";
		tab.style.padding = '10px;'
		tab.style.width ='100%';
		//document.getElementsByTagName('body')[0].appendChild(tab);
		var parent = document.getElementById('dispBuyInShop');
		if (! parent) parent = document.getElementById('stocksearch');
		if (parent) {
			parent.appendChild(tab);
		} else {
			parent = document.getElementsByTagName('body')[0];
			parent.insertBefore(tab, parent.firstChild);
		}
		this.table = tab; 
		this.addRow('Store', 'Available', 'th');
	},

	addRow: function(col1, col2, type, title) {
		if (! type) type = 'td';
		var tr = document.createElement('tr');
		tr.setAttribute('title', title);
		var td1 = document.createElement(type);
		td1.appendChild(document.createTextNode(col1));
		var td2 = document.createElement(type);
		td2.appendChild(document.createTextNode(col2));
		tr.appendChild(td1);
		tr.appendChild(td2);
		this.table.appendChild(tr);
	},

	checkAvail: function() {
		var qs = "?";
		var fm = document.getElementById('stocksearch');
		var inp = fm.getElementsByTagName('input');
		for (var i=0; i<inp.length; i++) {
			qs += inp[i].getAttribute('name') + '=' + inp[i].getAttribute('value') + '&';
		}
		var sel = document.getElementById('ikeaStoreNumber1');
		var obs = sel.getElementsByTagName('option');
		// skip first option 'choose below...'
		for (var i=1; i<obs.length; i++) {
			var url = this.baseUrl + qs + 'ikeaStoreNumber1=' + obs[i].getAttribute('value');
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: this.resParser(obs[i].firstChild.nodeValue)
			});
		}
	},
	
	resParser: function(name) {
		var _this = this;
		return function(res) {
			// <div class="sc_com_stockInfo sc_graph_stockInfo_container">
			var resText = res.responseText.match(/<div class="sc_com_stockInfo sc_graph_stockInfo_container">\s*([^<]+)</)[1];
			if (resText.length > 22) {
				abbr = resText.substring(0,20) + "...";
			} else {
				abbr = resText;
			}
			_this.addRow(name, abbr, null, resText);
		};
	}
};

Ikea.init();
Ikea.checkAvail();
