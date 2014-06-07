// ==UserScript==
// @name           eBay Price Total Mod
// @namespace      causeless
// @description    eBay Price Total
// @include        http://*.ebay.tld/*
// @version        0.2.7
// ==/UserScript==

var log;

try {
	log = this.unsafeWindow.console.log;  //firebug
} catch(e) {
	log = function(){};
}


// colorize auctionstyle. thanks to Demeiz
var styleCodeSet = {
	"buyitnow": {
		"border": "red",
		"price": "darkred"
	},
	"auction": {
		"border": "blue",
		"price": "darkblue"
	}
};

var controlSet = [
	// list
	{
		"domain": "www.ebay.com/",
		"boxsel": "table.li",
		"pricesel": "td.prc div.g-b",
		"shipsel": "td.prc span.ship",
		"aucstylesel": "td.bids",
		"aucbidRE": /Bid/,
		"freeshipRE": /Free|free/,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc;
			if (aucstyle) {
				totalstr = '&gt;' +totalstr;
				cc = styleCodeSet.auction;
			} else {
				cc = styleCodeSet.buyitnow;
			}
			var t = box.querySelector("td.prc div.g-b");
			var e = document.createElement('div');
			e.innerHTML = '<div class="g-b" style="font-size:125%; color: '+cc.price+';border-bottom: 1px double '+cc.border+'">' + totalstr + '</div>';
			t.parentNode.insertBefore(e.firstChild, t);
		}
	},

	// grid
	{
		"domain": "www.ebay.com/",
		"boxsel": "div.pctr",
		"pricesel": "div.frow span.g-b, div.frow span.amt",
		"shipsel": "span.ship",
		"freeshipRE": /Free|free/,
		"aucstylesel": "div.frow",
		"aucbidRE": /Bid/,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc;
			if (aucstyle) {
				totalstr = '&gt;&gt;&gt; ' +totalstr;
				cc = styleCodeSet.auction;
			} else {
				totalstr = 'total ' +totalstr;
				cc = styleCodeSet.buyitnow;
			}
			var e = document.createElement('div');
			e.innerHTML = '<div class="prc frow" style="border-bottom: 1px double '+cc.border+'"><span class="amt"><span style="font-size:120%; color: '+cc.price+';">'+totalstr+'</span></span></div>';
			var t = box.querySelector("div.frow");
			t.parentNode.insertBefore(e.firstChild, t);
		}
	},


	// item
	{
		"domain": "www.ebay.com/",
		"boxsel": "table.vi-is1",
		"pricesel": "span span.vi-is1-prcp",
		"shipsel": "#fshippingCost",
		"freeshipRE": /FREE/,
		"aucstylesel": "th.vi-is1-lblp",
		"aucbidRE": /bid/i,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc;
			if (aucstyle) {
				totalstr = totalstr + ' or more';
				cc = styleCodeSet.auction;
			} else {
				totalstr = totalstr +' total';
				cc = styleCodeSet.buyitnow;
			}
			var e = document.createElement('div');
			e.innerHTML = '<div class="g-b" style="font-size:130%; color: '+cc.price+';border-bottom: 1px double '+cc.border+'">' + totalstr + '</div>';
			var t = box.querySelector("span span.vi-is1-prcp");
			t.parentNode.insertBefore(e.firstChild, t);
		}
	},


	// list co.uk
	{
		"domain": "shop.ebay.co.uk",
		"boxsel": "table.li>tbody>tr",
		"pricesel": "td.prc",
		"shipsel": "td.ship",
		"freeshipRE": /Free/i,
		"aucstylesel": "td.bids",
		"aucbidRE": /Bid/i,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc;
			if (aucstyle) {
				totalstr = '&gt;' +totalstr;
				cc = styleCodeSet.auction;
			} else {
				cc = styleCodeSet.buyitnow;
			}
			var t = box.querySelector("td.prc");
			t.innerHTML = '<div style="font-size:125%; color: '+cc.price+';border-bottom: 1px double '+cc.border+'">' + totalstr + '</div>' + t.innerHTML;

		}
	},

	// grid co.uk
	{
		"domain": "shop.ebay.co.uk",
		"boxsel": "div.pctr",
		"pricesel": "div.frow span.g-b, div.frow span.amt",
		"shipsel": "span.ship",
		"freeshipRE": /Free|free/,
		"aucstylesel": "div.frow",
		"aucbidRE": /Bid/,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc;
			if (aucstyle) {
				totalstr = '&gt;&gt;&gt; ' +totalstr;
				cc = styleCodeSet.auction;
			} else {
				totalstr = 'total ' +totalstr;
				cc = styleCodeSet.buyitnow;
			}
			var e = document.createElement('div');
			e.innerHTML = '<div class="prc frow" style="border-bottom: 1px double '+cc.border+'"><span class="amt"><span style="font-size:120%; color: '+cc.price+';">'+totalstr+'</span></span></div>';
			var t = box.querySelector("div.frow");
			t.parentNode.insertBefore(e.firstChild, t);
		}
	},

	// item
	{
		"domain": "cgi.ebay.co.uk",
		"boxsel": "table.vi-is1",
		"pricesel": "td.vi-is1-tbll",
		"shipsel": "#fshippingCost",
		"freeshipRE": /FREE/i,
		"aucstylesel": "th.vi-is1-lblp",
		"aucbidRE": /bid/i,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc, suf;
			if (aucstyle) {
				suf = ' or more';
				cc = styleCodeSet.auction;
			} else {
				suf = ' total';
				cc = styleCodeSet.buyitnow;
			}
			var e = document.createElement('div');
			e.innerHTML = '<div style="border-bottom: 1px double '+cc.border+'"><span style="color: '+cc.price+';"><span style="font-size:110%;">' + totalstr + '</span>'+suf+'</span></div>';
			var t = box.querySelector("td.vi-is1-tbll *");
			var s = box.querySelector("td.vi-is1-tbll span span");
			e.firstChild.className = s.className;
			t.parentNode.insertBefore(e.firstChild, t);
		}
	},

	// list .nl .fr .es 
	{
		"domain": /\/\/shop\.ebay\.(nl|fr|es)\//,
		"changecomma": true,
		"boxsel": "table.li>tbody>tr",
		"pricesel": "td.prc",
		"shipsel": "td.ship",
		"freeshipRE": /Grat/i,
		"aucstylesel": "td.bids",
		"aucbidRE": /Biedin|Ench|Puja/i,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc;
			if (aucstyle) {
				totalstr = '&gt;' +totalstr;
				cc = styleCodeSet.auction;
			} else {
				cc = styleCodeSet.buyitnow;
			}
			var t = box.querySelector("td.prc");
			t.innerHTML = '<div style="font-size:100%; color: '+cc.price+';border-bottom: 1px double '+cc.border+'">' + totalstr + '</div>' + t.innerHTML;

		}
	},

	// grid .nl .fr .es
	{
		"domain": /\/\/shop\.ebay\.(nl|fr|es)\//,
		"changecomma": true,
		"boxsel": "div.pctr",
		"pricesel": "div.frow span.g-b, div.frow span.amt",
		"shipsel": "span.ship",
		"freeshipRE": /Grat/i,
		"aucstylesel": "div.frow",
		"aucbidRE": /Biedin|Ench|Puja/i,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc;
			if (aucstyle) {
				totalstr = '&gt;&gt;&gt; ' +totalstr;
				cc = styleCodeSet.auction;
			} else {
				totalstr = 'total ' +totalstr;
				cc = styleCodeSet.buyitnow;
			}
			var e = document.createElement('div');
			e.innerHTML = '<div class="prc frow" style="border-bottom: 1px double '+cc.border+'"><span class="amt"><span style="font-size:120%; color: '+cc.price+';">'+totalstr+'</span></span></div>';
			var t = box.querySelector("div.frow");
			t.parentNode.insertBefore(e.firstChild, t);
		}
	},


	// item
	{
		"domain": "cgi.ebay.fr",
		"changecomma": true,
		"boxsel": "table.vi-is1",
		"pricesel": "td.vi-is1-tbll",
		"shipsel": "#fshippingCost",
		"freeshipRE": /Grat/i,
		"aucstylesel": "th.vi-is1-lblp",
		"aucbidRE": /Prix de départ/i,
		"insertTotal" : function(box, totalstr, aucstyle) {
			var cc, suf;
			if (aucstyle) {
				suf = ' ou plus';
				cc = styleCodeSet.auction;
			} else {
				suf = ' au total';
				cc = styleCodeSet.buyitnow;
			}
			var e = document.createElement('div');
			e.innerHTML = '<div style="border-bottom: 1px double '+cc.border+'"><span style="color: '+cc.price+';"><span style="font-size:110%;">' + totalstr + '</span>'+suf+'</span></div>';
			var t = box.querySelector("td.vi-is1-tbll *");
			var s = box.querySelector("td.vi-is1-tbll span span");
			e.firstChild.className = s.className;
			t.parentNode.insertBefore(e.firstChild, t);
		}
	},


];


function parsePriceVal(s, modeset) {
	if (modeset.changecomma) {
		// comma
		s = s.replace(/\./g, '').replace(/,/g, '.');
	} else {
		// period
		s = s.replace(/,/g, '');
	}
	log(s);
	return parseFloat(s);
}

function drawTotal(modeset){
	var snap, i, boxes = [];

	snap = document.querySelectorAll(modeset.boxsel);

	for (i=0; i<snap.length; i++) {
		try {
			var box = snap[i];

			var pricestr = box.querySelector(modeset.pricesel).textContent;
			var shipstr  = box.querySelector(modeset.shipsel).textContent;
			var aucstylestr, aucstyle = false;
			try {
				aucstylestr = box.querySelector(modeset.aucstylesel).textContent;
			} catch(e) {
				aucstylestr = ""; // dummy
			}

			if (pricestr.split(/[0-9\.,]+/g).length > 2) {
				// use first price
				pricestr = pricestr.split(/([0-9\.,]+)/).slice(0,2).join('');
			}
			var price = parsePriceVal(pricestr.replace(/[^0-9\.,]+/g, ''), modeset);
			var ship, total, totalstr;

			ship = shipstr.replace(/[^0-9\.,]+/g, '');
			if (ship.length == 0 && ! (modeset.freeshipRE.test(shipstr))) {
				// not available, vary, etc.
//				totalstr = 'no data';
				totalstr = ' ???.?? ';
			} else {
				if (ship.length == 0) {
					// free shipping
					ship = 0;
				} else {
					ship = parsePriceVal(ship, modeset);
				}
				total = price + ship;
				totalstr = pricestr.replace(/[0-9\.,]+/,total.toFixed(2));
				if (modeset.changecomma) {
					totalstr = totalstr.replace('.', ',');
					while(totalstr != (totalstr = totalstr.replace(/\b(-?\d+)(\d{3})/, "$1.$2")));
				} else {
					while(totalstr != (totalstr = totalstr.replace(/\b(-?\d+)(\d{3})/, "$1,$2")));
				}

				try {
					if (modeset.aucbidRE.test(aucstylestr)) {
						aucstyle = true;
					}
				} catch(e) {
				}
			}
			modeset.insertTotal(box, totalstr, aucstyle);
		} catch(e) {
			log(modeset, e);
		}
	}
}
var i;
for (i = 0; i < controlSet.length; i += 1) {
	var mode = controlSet[i];
	try {
		if ("test" in Object(mode.domain)) {
			if (! mode.domain.test(location.href)) {
				continue;
			}
		} else {
			if (location.href.indexOf(mode.domain) == -1) {
				continue;
			}
		}
		drawTotal(mode);
	} catch(e) {
		log(e);
	}
}
