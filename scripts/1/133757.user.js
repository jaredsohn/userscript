/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// ==UserScript==
// @name        KNT-Ebay
// @creator     Knetus
// @description Affiche la somme total de la transaction(Prix de l'objet + frais de port),Convertit en euros certaines devises etrangeres                                 )
// @include     *shop.ebay.fr/*
// @include     http://cgi.ebay.fr/*
// @version     0.1.1
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var log;

try {
	log = this.unsafeWindow.console.log;  //firebug
} catch(e) {
	log = function(){};
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var couleurPrix = ("darkred");
var Euro = ("EUR");

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var Devise =
[	
	{"Pays": "USD","Cours":1.2724},
	{"Pays": "AUD","Cours":1.2965},
	{"Pays": "GBP","Cours":0.8071},
	{"Pays": "PLN","Cours":4.3441},
];
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var controlSet =
[
	//////////////////////////////////////// "shop.ebay.fr" Mosaique
	{
		"Domaine": "shop.ebay.fr",
		"BaliseBox": "td.gv-td",
		"BalisePrix": "span.ig-b12",
		"BaliseFdp": "span.ig-scs",
		"InsertTotal" : function(box, totalstr) {
			
			var e = document.createElement('div');
			e.innerHTML = '<span class="ig-si ig-frg ig-scs" style="font-size:small; margin-top: 6px ; color: '+couleurPrix+';"><b>'+totalstr+'</b></span>';
			var t = box.querySelector("div.cm-ovh");
			t.parentNode.insertBefore(e.firstChild, t.nextSibling);

		}
	},	
	//////////////////////////////////////// "shop.ebay.fr" Liste
	{
		"Domaine": "shop.ebay.fr",
		"BaliseBox": "div.rs-iDiv",
		"BalisePrix": "div.lv-pb5 b",
		"BaliseFdp": "p.lv-sd",
		"InsertTotal" : function(box, totalstr)		{
			
			var e = document.createElement('div');
			e.innerHTML = '<div class="lv-dvpr" style=" margin-top: 10px ;color: '+couleurPrix+';"><b>'+totalstr+'</b></span></div>';
			var t = box.querySelector("p.lv-sd");
			t.parentNode.insertBefore(e.firstChild, t.nextSibling);
		}
	},
	//////////////////////////////////////// "cgi.ebay.fr"
	{
		"Domaine": "cgi.ebay.fr",
		"BaliseBox": "table.vi-is1",
		"BalisePrix": "td.vi-is1-tbll span",
		"BaliseFdp": "#fshippingCost span",
		"InsertTotal" : function(box, totalstr) {

			var t = box.querySelector("td.vi-is1-solid");						
			t.innerHTML = '<div class="lv-dvpr" style=" margin : 8px 0px 5px 0px ;">Prix Total :</div>';
			t.className = "vi-is1-lblp vi-is1-solidBg";
			t.setAttribute('colspan','0');
			var e = document.createElement('td');
			e.innerHTML = '<div class="vi-is1-prcp" style="margin : 8px 0px 5px 0px  ;color: '+couleurPrix+';"><b>'+totalstr+'</b></div>';
			e.className = "vi-is1-solid";
			e.setAttribute('colspan','3');
			t.parentNode.appendChild(e);
		}		
	},
];
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawTotal(modeset){
	var snap, i, boxes = [];

	snap = document.querySelectorAll(modeset.BaliseBox);

	if (snap.length > 0){
	
		for (i=0; i<snap.length; i+= 1) {
			try {
				var box = snap[i];

				var pricestr = box.querySelector(modeset.BalisePrix).textContent;
				var shipstr  = box.querySelector(modeset.BaliseFdp).textContent;	
				
				var price = parsePriceVal(pricestr.replace(/[^0-9\.,]+/, ''));
				var Money = pricestr.replace(/[\+\s\,\.\d+]+/g, '');
				var ship = shipstr.replace(/[^0-9\.,]+/, '');
			
				if (ship.length == 0){ 
					ship = 0;
				}
				else {
					ship = parsePriceVal(ship);
				}
					
				var total = price + ship;			
			
				if ((Euro = Money)){				
					for (z = 0; z < Devise.length; z  += 1) {						
						var mode = Devise[z];						
						if (Money.match(mode.Pays)){
							total = total / mode.Cours;
							Money = "EUR";
							break;
						}
					}				
				}			

				var totalstr = total.toFixed(2);
	
				totalstr = totalstr.replace(/\./g, '\,');
	
				while(totalstr != (totalstr = totalstr.replace(/\b(-?\d+)(\d{3})/, "$1 $2")));
				modeset.InsertTotal(box, totalstr+" "+Money);
			
			
			} catch(e) {
				log(modeset, e);
			}
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function parsePriceVal(s) {
	s = s.replace(/\./g, '').replace(/\,/g, '.');
	return parseFloat(s);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////       DEBUT       //////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var i;

for (i = 0; i < controlSet.length; i += 1) {
	var mode = controlSet[i];
	try {
		if (location.href.indexOf(mode.Domaine) == -1) {
			continue;
		}
		
		drawTotal(mode);
	} catch(e) {
		log(e);
	}
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////