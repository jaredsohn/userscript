// eBay listing featured items filter user script
// version 0.0.1
// 2007-03-06
// Copyright (c) 2007, Daniel Muenter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
// ==UserScript==
// @name			eBay featured items filter
// @namespace		http://mywebsite.com/myscripts
// @description		This script hides the featured items from ebay search result lists and shows the next site if there're only featured items on the current site.
// @include			http://*search*ebay.*/*
// @include			http://*listings.ebay.*/*
// ==/UserScript==
// -----------------------------------------------------------------------------

var tabDoc = content.document;
var url = tabDoc.URL;
var tables = tabDoc.getElementsByTagName('table');
for(var h = 0; h < tables.length; h++) {
	var table = tables[h];
	if(table.className == 'ebItemlist single') {
		// itemlist found
		var tbody = table.getElementsByTagName('tbody')[0];
		var rows = tbody.getElementsByTagName('tr');
		var hide = false;
		for(var j = 0; j < rows.length; j++) {
			var row = rows[j];
			var td = row.firstChild;
			var div = null;
			if(td.className == "navigation ebFeatMsg") {
				hide = true;
			}
			if(hide) {
				row.setAttribute('style','display:none');
			}
			try{
				div = td.getElementsByTagName('div')[0];
				if(div.hasAttribute('class')) {
					if(div.className.match(/navigation ebMsg/)) {
						hide = false;
						if(j == rows.length - 1) {
							// set state message
							var msg = "<font color=\"red\"><h1><b>There were only featured items on this site, load next site, please wait...<\/b><\/h1><\/font>";
							div.innerHTML = msg;
							row.setAttribute('style','display:all');
							// last row reached, try to load next page
							var current = 1;
							if(url.match(/QQlopgZ\d/)) {
								var tmp = url.match(/QQlopgZ(\d+)/);
								tmp = tmp[1];
								current = parseInt(tmp);
								url = url.replace(/QQlopgZ\d+/g, "");
							}
							current++;
							url += 'QQlopgZ' + current;
							window.open(url, "_self");
						}
					}
				}
			} catch(e) {}
		}
	}
}