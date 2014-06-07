// ==UserScript==
// @name           MultiBank Transfers
// @namespace      Dav
// @include        https://moj.multibank.pl/*
// ==/UserScript==

window.addEventListener(
	"load",
	function() { 
		var przelewy = unsafeWindow.document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		// Go through all links on the page
		for (var i = 0; i < przelewy.snapshotLength; i++) {
			thisLink = przelewy.snapshotItem(i);
			
			if (thisLink.attributes["onclick"] == undefined)
				continue;

			newClick = thisLink.attributes["onclick"].nodeValue;
			
			// Redirect pre-defined transfers to custom transfers
			if (thisLink.textContent == "Przelewy")
			{
				newClick = newClick.replace("defined_transfers_list.asp", "transfer_exec.aspx");
				thisLink.attributes['onclick'].nodeValue = newClick;
			}
		}
	},
	true);
