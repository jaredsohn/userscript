// ==UserScript==
// @name           FreshBooks count referrals
// @namespace      http://userscripts.org/users/muntzen
// @description    Adds a count of all the referrals on the referral page
// @include        https://*.billingarm.com/*
// @include        https://*.freshbooks.com/*
// ==/UserScript==

window.addEventListener("load", function(e) {

	// check to see if we are on the referral page
	var elems = document.getElementsByTagName("h2");
	if (elems) {
		var header;
		for (i = 0 ; i < elems.length; i++) {
			if (elems[i].className == "pt") {
				if (elems[i].innerHTML == "Referrals") {
					header = elems[i];
				}
			}
		}
		
		if (header) {
			var tables = document.getElementsByTagName("table");
			var table;
			for (i = 0; i < tables.length; i++) {
				if (tables[i].className == "listTable") {
					table = tables[i]
					break;
				}
			}
			
			if (table) {
				// total is table rows - 1
				var totalCount = table.rows.length - 1;
				
				// determine the total number of subscribers
				var totalSubscribed = 0;
				for (i = 1 ; i < table.rows.length; i++) {
					if (table.rows[i].cells[3].innerHTML != '---') {
						totalSubscribed++;
					}
				}
				
				
				header.innerHTML = "Referrals (" + totalCount + " shown, " + totalSubscribed + " subscribed)";				
			}
		}
	}

}, false);