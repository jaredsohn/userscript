// ==UserScript==
// @name	Boxoh Links
// @version	1.0
// @namespace	http://www.beaglebros.com/
// @description	Adds tracking links to shipping sites on the Boxoh site
// @include	http://boxoh.com/*


var trackingNumbers, thisTrackingNumber;
trackingNumbers = document.evaluate(
	"//span[@class='ups']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < trackingNumbers.snapshotLength; i++) {
	thisTrackingNumber = trackingNumbers.snapshotItem(i);
	var rawTN = thisTrackingNumber.innerHTML;
	thisTrackingNumber.innerHTML = "<a href=\"http://wwwapps.ups.com/WebTracking/processInputRequest?HTMLVersion=5.0&loc=en_US&Requester=UPSHome&tracknum=" + rawTN + "&AgreeToTermsAndConditions=yes&track.x=27&track.y=9\">" + rawTN + "</a>";
}

trackingNumbers = document.evaluate(
	"//span[@class='usps']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < trackingNumbers.snapshotLength; i++) {
	thisTrackingNumber = trackingNumbers.snapshotItem(i);
	var rawTN = thisTrackingNumber.innerHTML;
	thisTrackingNumber.innerHTML = "<a href=\"http://trkcnfrm1.smi.usps.com/PTSInternetWeb/InterLabelInquiry.do?origTrackNum=" + rawTN + "\">" + rawTN + "</a>";
}

trackingNumbers = document.evaluate(
	"//span[@class='fedex']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < trackingNumbers.snapshotLength; i++) {
	thisTrackingNumber = trackingNumbers.snapshotItem(i);
	var rawTN = thisTrackingNumber.innerHTML;
	thisTrackingNumber.innerHTML = "<a href=\"http://www.fedex.com/Tracking?action=track&tracknumbers=" + rawTN + "\">" + rawTN + "</a>";
}

// ==/UserScript==
