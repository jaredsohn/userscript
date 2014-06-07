// Mutual Feedback (ToolHaus)
// v0.5
// 2006-04-08
// Copyright (c) 2006, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Mutual Feedback (ToolHaus)
// @namespace	http://6v8.gamboni.org/
// @description	Direct link from ebay item page to check mutual feedback and feeders on Toolhaus.org. It will add a small mu and a small beta next to the item number.
// @source         http://6v8.gamboni.org/Greasemonkey-ebay-mutual-feedback.html
// @version        0.5
// @identifier	http://6v8.gamboni.org/IMG/js/mutualfeedbacktoolhaus.user.js
// @date           2006-04-08
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include	http://cgi.ebay.*/*
// ==/UserScript==

(function () {

	var SCRIPT = {
		name: "Mutual Feedback (ToolHaus)",
		namespace: "http://6v8.gamboni.org/Greasemonkey-ebay-mutual-feedback.html",
		description: "Direct link from ebay item page to check mutual feedback and bidders on Toolhaus.org. It will add a small mu and a small beta next to the item number.",
		source: "http://6v8.gamboni.org/Greasemonkey-eBay-mutual-feedback.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/mutualfeedbacktoolhaus.user.js",
		version: "0.5",								// version
		date: (new Date(2006, 04, 08))		// update date
		.valueOf()
	};


	var win = (unsafeWindow || window.wrappedJSObject || window);
	var itemIDRegexp = /(?:Item number:)?\s*(\d+)/im;
	
	win.EBayMutual = function() {;}

	win.EBayMutual.prototype = {

		getNode: function(xpath) {
			return document.evaluate(xpath,
									 document.body,
									 null,
									 XPathResult.ANY_UNORDERED_NODE_TYPE,
									 null);
		},


		findItemNumber: function() {
			var bodyHTML = document.body.textContent;
			if (bodyHTML) {
				var bidder = '';				

				var bidderNode = this.getNode("/html/body/span[1]//tbody/tr/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr[9]/td[2]/a[1]|/html/body/span[1]/table[2]/tbody/tr/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/div[@id='FastVIPDetails']/table/tbody/tr[9]/td[2]/a[1]");
				if(bidderNode && bidderNode.singleNodeValue)
					bidder = bidderNode.singleNodeValue;
				
				/*				if(!bidder || !seller) {					
					sellerNode = this.getNode("/html/body/span[1]/table[2]/tbody/tr/td/table/tbody/tr[1]/td[5]/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr[1]/td[2]/a[1]");
					if(sellerNode && sellerNode.singleNodeValue)
						seller = sellerNode.singleNodeValue.innerHTML;
					
					bidderNode = this.getNode("/html/body/span[1]/table[2]/tbody/tr/td/table/tbody/tr[1]/td[2]/table/tbody/tr[7]/td[2]/a[1]");
					if(bidderNode && bidderNode.singleNodeValue)
						bidder = bidderNode.singleNodeValue;
						}*/
			}

			
			var item = this.getNode("/html/body/span[1]/table[1]/tbody/tr/td/table[2]/tbody/tr[2]/td[5]|/html/body/table[1]/tbody/tr[2]/td[5]/a");
			if(item && item.singleNodeValue) {
				var thisNode = item.singleNodeValue;
				var nodeText = thisNode.innerHTML;
				var matches = itemIDRegexp.exec(nodeText);
				if (matches) {
					var itemID = matches[1];
					if(itemID) {
						if(bidder) {
							var insert = document.createElement('a');
							insert.href = 'http://toolhaus.org/cgi-bin/mutual'
								+'?Item='
								+itemID+'&Check=Check&Limit=30';
							insert.className="GM_ebaymutual";
							insert.target="blank";
							insert.innerHTML = '&nbsp;&mu;';
							thisNode.appendChild(insert);
						}
						var insert2 = document.createElement('a');
						insert2.href = 'http://toolhaus.org/cgi-bin/bidders?Item='
							+itemID+'&Check=Check';
						insert2.className="GM_ebaymutual";
						insert2.target="blank";
						insert2.innerHTML = '&nbsp;&beta;';
						thisNode.appendChild(insert2);	
					}
				} 
			} 
		}
		
	}
	
	
	// update automatically (http://userscripts.org/scripts/show/2296)
	try {
		window.addEventListener("load", function () {
			try {
				win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
				} catch (ex) {} 
			var mutual = new win.EBayMutual();
			mutual.findItemNumber();
		}, false);
	} catch (ex) {}



})();
