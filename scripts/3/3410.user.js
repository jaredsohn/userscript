// eBay Snipe at AuctionSniper.com
// version 6c
// 2010-08-25
// Copyright 2010 Scott Winder
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This script adds a "Snipe this item" link to item pages you view after
// doing a search on eBay. You can click on the link to be taken directly
// to the AuctionSniper entry form for that item.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Snipe at AuctionSniper.com
// @namespace     http://www.lethean.us/userscripts
// @description   Adds an AuctionSniper link to the currently viewed item
// @include       http://cgi.ebay.tld/*
// ==/UserScript==

var idLoc = location.pathname.indexOf("QQitemZ");
var itemId, endLoc;

if (idLoc != -1) {
	idLoc += 7;
	endLoc = location.pathname.indexOf( "QQ", idLoc );
	itemId = location.pathname.substring( idLoc, endLoc );
} else {
	idLoc = location.search.indexOf("&item=");
	if ( idLoc != -1 ) {
		idLoc += 6;
		var endLoc = location.search.indexOf( "&", idLoc );
		if ( endLoc <= idLoc ) {
			endLoc = location.search.length;
		}
		itemId = location.search.substring( idLoc, endLoc );
	}
}

if (idLoc == -1) {
    	var eleTmp = document.getElementsByClassName("inf_lab");	
	
	for (var i = 0; i < eleTmp.length; i++) {
		if ( eleTmp[i].textContent == "Item number:" ) {
			idLoc = 0;
			itemId = eleTmp[i].nextSibling.textContent;
			i = eleTmp.length;
		}
	}
}	


if (idLoc != -1) {
	var snipeUrl = "http://www.auctionsniper.com/snipeit/snipeit.aspx?item=" + itemId;
	
	var watchSpan = document.getElementById("linkTopAct");
	
	if (watchSpan) {
		var snipeSpan = document.createElement("span");
		snipeSpan.id = "sniping";
		watchSpan.parentNode.insertBefore(snipeSpan, watchSpan);
		
		var snipeLink = document.createElement("a");
		snipeLink.href = "#";
		snipeLink.addEventListener("click", function(){window.open(snipeUrl,'','width=500,height=275,resizable=yes,scrollbars=yes');}, false);
		snipeLink.title = "Snipe this auction on AuctionSniper.com";
		var img = document.createElement("img");
		img.src = "data:image/gif;base64,R0lGODlhEAAQAPcAAISChMTCxGSazPz+/LUAQhwAjQAAFQAAAPQAABwAAAAAAAAAAAAA2AAAjBUAFQAAAAgAAQAAAAAAAAAAAAAA3wIA4gAAgAAAfAAARAMA5AAAEgAAAIgAT+IAGhIAgAAAfHkAAAgAAIIAAHwAAAAAAAAAAAEAAAAAgFYAAwAAAAAAAAAAAJAAAOEAABIAAAAAADEAA5cAAJIAAHwAALAAgOIAABIAAAAAABgAkO4A5JAAEnwAAHAAFAUAupEATHwAAP8oAv8CAP8AAP8AAG0A/wUA/5EA/3wA/xUAAQoAAIIAAHwAAAAATgAAehUATAAAAGAAjwMApQAATAAAAOAAkPYAHxgAOwAAACgAE14A4RUATAAAAAA0AwAAAAAAAADAAH49TgAEEACRT8B8AAAAAQAAAAAAAAAAAP+gAP/jAP8SAP8AAP9sDP/7AP+QAP98AABxAAD7AACQAAB8AAAAAQAAAAAAAAAAAAA9AwAEABWRAAB8AMA0AOIAABIAAADAgGJ8AwnjAIISAHwAAChFAF4AABUAAAAAANv4BwX3AIISAHwAAMAYAHbuAFCQAAB8ACgAIF4AeQEAUAAAAGwCAAAAAAAAAAAAAPz1AOFlABIAAAAAAADYAADjAAASAAAAAPiDAPcqABKCAAB8ABgAGO4ATZAAO3wAAHAAAAUAAJEAAHwAAP8AzP8Aaf8ATP8AAG0pKwW3AJGSAHx8AEogK/YqAIAWAHwAAAC+SAA+6xWCEgB8AAD//wD//wD//wD//ygAAF4AABUAAAAAAAC8BAHj5QASEgAAAAC+vgA+OwCCTAB8AFf45Pb35IASEnwAAOgYd+PuEBKQTwB8ACgAGF635RWSEgB8AFH/vgX/PpH/gnz/fHggsxMq5RUWEgAAAG2+0wU+/5GC/3x8fwAAiADl5QASEgAAAD3dIAQ/KpGCFnx8ADQWvgA/PgCCgsB8fAAAIAAAKgAAFgAAAAAw9QAAZQAAAAAAAAAkAADkAAASAAAAAAAg6QB5zgBQRwAAACH5BAAAAAAALAAAAAAQABAABwhvAAcIHBAAgMGDAQYqNJgQgMCCDhdGHAAgoUCDAzEKFABAgESCEwdwFOAxY0GLBEeWvKhxo8qVFA/KnDkzQEKSLwXYhDgQZ0ecDxm6pJiyJEOHAUgSFalzKUOLEXdWzDgx5FSJDitCRKkQokyFAwICADs=";
		img.border = "0";
		img.align = "top";
		snipeLink.appendChild(img);
		
		snipeSpan.appendChild(snipeLink);
		snipeSpan.appendChild(document.createTextNode(" "), watchSpan);
		
		snipeLink = document.createElement("a");
		snipeLink.href = "#";
		snipeLink.addEventListener("click", function(){window.open(snipeUrl,'','width=500,height=275,resizable=yes,scrollbars=yes');}, false);
		snipeLink.title = "Snipe this auction on AuctionSniper.com";
		
		var snipeBold = document.createElement("strong");
		snipeBold.appendChild(document.createTextNode("Snipe this Item"));
		snipeLink.appendChild(snipeBold);
		
		snipeSpan.appendChild(snipeLink);
		snipeSpan.appendChild(document.createTextNode(" |"), watchSpan);
	}
}

// CHANGELOG:
//
// v1 (2006-03-03)
// - initial release
// 
// v2 (2006-04-12)
// - Added ability to pull item number from query
// 
// v3 (2006-11-01)
// - Added cgi.ebay.de per user request
// 
// v4 (2007-06-12)
// - Added cgi.ebay.fr per user request
// - Fixed link insertion so that it always appears
// 
// v5 (2007-07-31)
// - Replaced all domains with magic .tld suffix (thanks Keith)
// - Modified links as per mungushume's suggestion
// 
// v6 (2010-08-25)
// - Updated for (old) eBay changes
// 
// v6b (2010-08-25)
// - Added link search for when URL is not easy to parse
// 
// v6c (2010-08-25)
// - Cleaned code
// 


