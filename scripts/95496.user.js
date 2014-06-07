// ==UserScript==
// @name           amazon japan price total
// @namespace      causeless
// @include        http://www.amazon.co.jp/*
// @version        v0.1.4
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
		"border": "brown",
		"price": "darkred"
	},
	"auction": {
		"border": "blue",
		"price": "darkblue"
	}
};

var controlSet = [
	// firstPrice
	{
		"domain": /^http:\/\/www\.amazon\.co\.jp\//i,
		"boxsel": "#BBPricePlusShipID",
		"fixedpoint": 0,
		"pricesel": "b.price",
		"shipsel": "span.plusShippingText",
		"freeshipRE": /無料/,
		"insertTotal" : function(box, totalstr) {
			var cc = styleCodeSet.buyitnow;
			var e = document.createElement('div');
			e.innerHTML = '<div style="border-bottom: 1px solid '+cc.border+'"><span class="price" style="font-size:130%; font-weight: bold; color:'+cc.price+';">' + totalstr + '</span>  (配送料込み)</div>';
			box.insertBefore(e.firstChild, box.firstChild);
			box.setAttribute('style', 'color: #444444');

			var t = box.querySelector('b.price');
			t.setAttribute('style', 'color: #444444');

			t = document.querySelector('#priceBlock b.priceLarge');

			e = document.createElement('span');
			e.innerHTML = ' + 配送料 = <b class="priceLarge" style="font-weight: bold; color:'+cc.price+';">' + totalstr + '</b>  (配送料込み)';
			t.parentNode.insertBefore(e, t.nextSibling);
			t.setAttribute('style', 'color: #444444');
		}
	},

	// other seller
	{
		"domain": /^http:\/\/www\.amazon\.co\.jp\//i,
		"boxsel": "table.mbcOfferRow",
		"fixedpoint": 0,
		"pricesel": "td.mbcPriceCell",
		"shipsel": "span.plusShippingText",
		"freeshipRE": /無料/,
		"insertTotal" : function(box, totalstr) {
			var cc = styleCodeSet.buyitnow;
			var t = box.querySelector("td.mbcPriceCell");
			var e = document.createElement('div');
			totalstr = totalstr.split(/([0-9\.,]+)/).slice(0,2).join('');

			e.innerHTML = '<div style="border-bottom: 1px solid '+cc.border+'"><span class="price" style="color:'+cc.price+';">' + totalstr + '</span>  (配送料込み)</div>';
			t.insertBefore(e.firstChild, t.firstChild);
			t.setAttribute('style', 'color: #444444');

		}
	},

	// other seller
	{
		"domain": /^http:\/\/www\.amazon\.co\.jp\/(.+?\/)?offer-listing\//i,
		"boxsel": "div.resultsset tbody.result tr td:first-child",
		"fixedpoint": 0,
		"pricesel": "span.price",
		"shipsel": "span.price_shipping, span.supersaver",
		"freeshipRE": /無料/,
		"insertTotal" : function(box, totalstr) {
			var cc = styleCodeSet.buyitnow;
			var t = box.querySelector("span.price");
			var e = document.createElement('div');
			totalstr = totalstr.split(/([0-9\.,]+)/).slice(0,2).join('');

			e.innerHTML = '<div style="border-bottom: 1px solid '+cc.border+'"><span class="price" style="color:'+cc.price+';">' + totalstr + '</span>  (配送料込み)</div>';
			t.parentNode.insertBefore(e.firstChild, t);
			t.setAttribute('style', 'color: #444444');

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
	if (!('fixedpoint' in modeset)) {
		modeset.fixedpoint = 2;
	}

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
				pricestr = pricestr.split(/([0-9\.,]+)/).slice(0,2).join('');
				log(pricestr);
//				continue;
				// not support max price yet
			}
			var price = parsePriceVal(pricestr.replace(/[^0-9\.,]+/g, ''), modeset);
			var ship, total, totalstr;

			ship = shipstr.replace(/[^0-9\.,]+/g, '');
			if (ship.length == 0 && ! (modeset.freeshipRE.test(shipstr))) {
				// not available, vary, etc.
				totalstr = 'no data';
			} else {
				if (ship.length == 0) {
					// free shipping
					ship = 0;
				} else {
					ship = parsePriceVal(ship, modeset);
				}
				total = price + ship;
				totalstr = pricestr.replace(/[0-9\.,]+/,total.toFixed(modeset.fixedpoint));
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
