// ==UserScript==
// @name       eBay Block Seller
// @namespace  https://userscripts.org/scripts/show/157116
// @version    1.0.0
// @description  Block specified eBay seller IDs to avoid shopping with them.
// @match      http://*.ebay.com*/*
// @copyright  2012 Alex Ross. All rights reserved.
// ==/UserScript==
var lo=document.getElementsByClassName('mbg-nw'),
    bu=['1337scammer','nightmare-seller'], //Blocked user IDs are listed here; must be lowercase values.
    ci,co;
for(ci=0;ci<lo.length;ci++) {
    if(bu.indexOf(lo[ci].innerHTML.toLowerCase())>-1&&window.location.href.indexOf('/itm/')>-1) { //Confirm that seller is in block list and that the page is an item article.
        co=confirm("This seller has been blocked.\n\nDo you still wish to view the item article?");
        if(co==false) {
            if(history.length>0) { history.back(); } //Go to previous page.
            else if(document.referrer) { window.location.href=document.referrer; } //No history page, let's check referrer.
            else { window.location.href='http://www.ebay.com.au'; } //Nothing to go back to; go to home-page of eBay.
        }
    }
}