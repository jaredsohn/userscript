// ==UserScript==
// @name           MidwayUSA Modifications
// @namespace      http://jobson.us
// @description    Various Modifications for the MidwayUSA sites.
// @include        http://www.midwayusa.com/*
// ==/UserScript==

var console;
var wlh = window.location.href;
var baseURL = 'http://'+ document.domain +'/';
var d = document;



var mw = {
	init: function() {
		console = (unsafeWindow.console) ? unsafeWindow.console : null;
		mw.addStyleSheets();
		
		mw.BrowseProducts();	
	},
	addStyleSheets: function() {
		GM_addStyle("div.oos { cursor: pointer; color: #002299; width: auto; overflow: show; font-size: 0.75em; padding-left: 5px; }");
		GM_addStyle("div.productDisplayItem { margin: 0; padding: 5px 0; }");
		GM_addStyle("div.bg0 { background-color: #ffffff; }");
		GM_addStyle("div.bg1 { background-color: #f0f0f0; }");
		GM_addStyle("div.cpr { margin: 5px 5px 5px 120px; }");
	},
	BrowseProducts: function() {
		if (! /(BrowseProducts)/.test(wlh)) return;
		var p = $$('productDisplayItem');
		
		var OOS = d.createElement('div');
			OOS.setAttribute('class','oos');
			
		var CPR = d.createElement('div');
			CPR.setAttribute('class','cpr');

		for (var i=0;i<p.length;i++) {
			var status   = p[i].getElementsByClassName('productDisplayItemStatus')[0];
				status   = (status.childNodes.length>0) ? status.childNodes[0].nodeValue.trim() : 'Available';
			var itemName = p[i].getElementsByTagName('a')[1].childNodes[0].nodeValue.trim();
			var price    = parseFloat(p[i].getElementsByClassName('productDisplayItemCurrentPrice')[0].childNodes[0].nodeValue.replace(/^\$/,''));
						
			// If ammo, add Cost-per-Round row.
			if (/Ammunition/.test(itemName)) {
				var rnds = itemName.match(/(Box|Package|Case|Pack) of (\d+)/i);
				if (rnds && rnds.length==3) {
					rnds = parseInt(rnds[2],10);
					var cpr = (price/rnds);
						cpr = (cpr>1) ? '$'+ (Math.round(cpr*100)/100).toFixed(2) : (Math.round(cpr*1000)/10).toFixed(1)+'¢';
					var cpDiv = CPR.cloneNode(true);
						cpDiv.appendChild(d.createTextNode('Cost per Round: '+ cpr));
					p[i].insertBefore(cpDiv,p[i].getElementsByClassName('productDisplayNumberLabel')[0])
				}
			}
			
			// Remove if Unavailable or No Backorder			
			if (/(Unavailable|No Backorder)/.test(status)) {
				removeElement(p[i--]);
				continue;
			}
			
			// Hide row if not available
			if (!/Available/.test(status)) {			
				var oos = OOS.cloneNode(true);
					oos.appendChild(d.createTextNode('('+ status +') - '+ itemName));
				
				var tags = p[i].getElementsByTagName('*');
				
				for (var j=0;j<tags.length;j++) {
					tags[j].style.display = 'none';
				}
				p[i].insertBefore(oos.cloneNode(true),p[i].childNodes[0]);
			}
			
			// Recolor Row
			p[i].setAttribute('class',p[i].getAttribute('class')+' bg'+(i%2));
			
			
		}
		
		var oos = d.getElementsByClassName('oos');
		for (var i=0;i<oos.length;i++) {
			oos[i].addEventListener('click',mw.showOOS,false);
		}
		
	},
	showOOS: function() {
		var par = this.parentNode;
		removeElement(this);
		
		var tags = par.getElementsByTagName('*');
		
		for (var j=0;j<tags.length;j++) {
			tags[j].style.display = '';
		}
	}
};



window.setTimeout(mw.init,5);

String.prototype.truncate = function() { return this.replace(/^(.{1,150}).+?$/,'$1').trim()+'\u2026'; };
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

function $(el) {
	return document.getElementById(el);
}

function $$(cls) {
	return document.getElementsByClassName(cls);
}

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

function removeElement(el) {
	el.parentNode.removeChild(el);
}

