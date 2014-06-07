// eBay item detail page - Snipe Link for Snipex V0.9
// ==================================================
//
//This script adds a "Snipe it" link to the auction page which are you currently on
//After clicking the link the item gets sniped by Snipex
//
// ==UserScript==
// @name          Snipex - eBay Sniper
// @description   Adds an (Snipe it!) link to the eBay item detail page
// @namespace     http://apps.facebook.com/snipexx 
// @include       http://cgi.ebay.tld/*
// ==/UserScript==
//
//==~WINDOW==~
var popupwin = 1; //POPUP WINDOW
//var popupwin = 0; //OPENS IN A NEW TAB
//======================================================================
//eBay Snipe ==== Snipex Script ========================================
//======================================================================
var snipexWindow;
var idLoc = location.pathname.indexOf("QQitemZ");
var itemId, endLoc;
if (idLoc != -1) {
    idLoc += 7;
    endLoc = location.pathname.indexOf("QQ", idLoc);
    itemId = location.pathname.substring(idLoc, endLoc);
}
else {
    idLoc = location.search.indexOf("&item=");
    if (idLoc != -1) {
        idLoc += 6;
        var endLoc = location.search.indexOf("&", idLoc);
        if (endLoc <= idLoc) {
            endLoc = location.search.length;
        }
        itemId = location.search.substring(idLoc, endLoc);
    }
}
if (idLoc != -1) {
    var snipeUrl = "http://apps.facebook.com/snipexx?findItem=" + itemId;
    var watchLink = 0;
    for (var i = 0; i < document.links.length; i++) {
        if (document.links.item(i).href.indexOf("ShowEmailAuctionToFriend") != -1) {
            watchLink = document.links.item(i);
            break;
        }
    }
    if (watchLink) {
        var snipeLink = document.createElement("a");
        snipeLink.href = snipeUrl;
        snipeLink.title = "Snipe this auction item with Snipex";
        var img = document.createElement("img");
        img.src = "data:image/gif,GIF89a%10%00%10%00%F4%00%00%02%02%02%03%03%03%04%04%04%0A%0A%0A%0F%0F%0F%10%10%10%11%11%11%14%14%14%15%15%15%16%16%16%17%17%17%18%18%18%19%19%19%1C%1C%1C%1D%1D%1D%1E%1E%1E%1F%1F%1F%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%09%00%00%11%00%2C%00%00%00%00%10%00%10%00%00%05K%60%24%8EdiF%89%98%9E%E3%12%88%C2z.C!%16%83L%BA%FA%12%97%89%C1bA%82%04e.%5B%C4%98%80%DC%02%BA%96%8AEZEE.%82%88%E9%8C%14%A0%A3cw%7B%2C%F1%AA%60%13M%89%BB%86_%914%95%18%A1S%EF%91%10%00%3B";
        img.border = "0";
        img.align = "top";
        snipeLink.appendChild(img);
        watchLink.parentNode.insertBefore(snipeLink, watchLink);
        watchLink.parentNode.insertBefore(document.createTextNode(" "), watchLink);
        snipeLink = document.createElement("a");
        //snipeLink.href = snipeUrl;
        snipeLink.id = "snipe";
        snipeLink.title = "Snipe this auction item with Snipex";
        
        if (popupwin == 1) {
            snipeLink.addEventListener("click", popup, false);
            snipeLink.href = '#';
        }
        else {
            snipeLink.href = snipeUrl;
            snipeLink.target = "_Snipex";
        }
        snipeLink.appendChild(document.createTextNode("Snipe it"));
        watchLink.parentNode.insertBefore(snipeLink, watchLink);
        watchLink.parentNode.insertBefore(document.createTextNode("  | "), watchLink);
    }
}
function popup(){
	if (snipexWindow == null || snipexWindow == undefined || snipexWindow.closed == true) {
		snipexWindow = window.open(snipeUrl, '_SnipexWindow', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=840,height=850,left=90,top= 10');
	}else {
		snipexWindow.navigate(snipeUrl);
	}
	snipexWindow.focus();
}
