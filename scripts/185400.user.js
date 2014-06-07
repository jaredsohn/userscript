// ==UserScript==
// @name        HUKD Hide Flamedeers
// @namespace   none
// @description Hide any "humorous" Flamedeer deals.
// @include     http://www.hotukdeals.com/*
// @version     4
// @grant       none
// ==/UserScript==

var regex = /(flamedeer|deer|flame)/ig;

HIDE_DEER_IN_LISTINGS = true;
HIDE_DEER_IN_HOT_DEALS_PANEL = true;
HIDE_DEER_COMMENTS = true;
HIDE_FLAMEDEER_SIDEBAR_ADVERT = true;

HIDE_HOTUKDEALS_APP_SIDEBAR_ADVERT = false;
HIDE_FIND_VOUCHER_CODES = false;
HIDE_NEWSLETTER_SIGNUP = false;

// Fix body of page
if(HIDE_DEER_IN_LISTINGS)
{
	var snapResults = document.evaluate("//ul[@class='structure s-items s-items-listings detail-view']/li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
			itemText = elm.textContent.trim();
		var result = itemText.match(regex);
		if (result != null)
		{
			  snapResults.snapshotItem(i).style.display="none"; 
			}
	}
}

// Fix the Hot Deals panels
if(HIDE_DEER_IN_HOT_DEALS_PANEL)
{
	var snapResults2 = document.evaluate("//div[@id='sidebar-hottest-deals']/ul/li", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapResults2.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults2.snapshotItem(i);
			itemText = elm.innerHTML.trim();
		var result = itemText.match(regex);
		if (result != null)
		{
			  snapResults2.snapshotItem(i).style.display="none"; 
			}
	}
}

// Hide the Flamedeer Hunt panel too
if(HIDE_FLAMEDEER_SIDEBAR_ADVERT)
{
	HideSection(".//div[@id='sidebar-app-flamedeer']");
}

// Hide any comment which mentions deers or flamedeers
if(HIDE_DEER_COMMENTS)
{
	var snapResults = document.evaluate("//div[@class='comment-content']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
			itemText = elm.textContent.trim();
		var result = itemText.match(regex);
		if (result != null)
		{
			  elm.parentNode.parentNode.style.display="none";
			}
	}
}

// ...and some other general removal
if(HIDE_HOTUKDEALS_APP_SIDEBAR_ADVERT)
{
	HideSection(".//div[contains(@id,'sidebar-app-banner')]");
}

if(HIDE_FIND_VOUCHER_CODES)
{
	HideSection(".//div[@id='sidebar-voucher-filter']");
}

if(HIDE_NEWSLETTER_SIGNUP)
{
	HideSection(".//div[@id='sidebar-newsletter']");
}

function HideSection(xpath)
{
var snapResults = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.display="none"; 
}
}