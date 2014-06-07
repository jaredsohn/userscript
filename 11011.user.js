// ==UserScript==
// @name          Ebay Feedback Notification
// @namespace     http://www.arend-von-reinersdorff.com/ebay-feedback-notification/
// @description   Adds a notification feed to Ebay feedback pages.
// @include       http://feedback.ebay.com/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.de/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.co.uk/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.com.au/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.at/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.benl.ebay.be/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.befr.ebay.be/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.ca/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.cafr.ebay.ca/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.com.cn/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.fr/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.com.hk/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.in/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.ie/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.it/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.nl/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.pl/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.com.sg/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.es/ws/eBayISAPI.dll?ViewFeedback2*
// @include       http://feedback.ebay.ch/ws/eBayISAPI.dll?ViewFeedback2*
// ==/UserScript==

/*
 * Version 1.0.1, 26. August 2007
 * Written by Arend v. Reinersdorff, www.arend-von-reinersdorff.com
 * This script is Public Domain. You are welcome to use it in any way you like.
 */
(function() {
	var feedUrl = "http://pipes.yahoo.com/pipes/pipe.run?_cmd=Run+Pipe"
				+ "&_id=vspfUrQA3BGzQ6831vC6Jw&_render=rss&_run=1&"
				+ "ebayUsername=" + location.search.match(/userid=([^&]+)/)[1]
				+ "&ebayDomain=" + location.host.match(/feedback\.(.+)/)[1];

   //add rss feed to header
	var linkNode = document.createElement("link");
		linkNode.setAttribute("rel",   "alternate");
		linkNode.setAttribute("type",  "application/rss+xml");
		linkNode.setAttribute("title", "Get notified about new feedback");
		linkNode.setAttribute("href",  feedUrl);
	document.getElementsByTagName("head")[0].appendChild(linkNode);

    //add rss image to top of page
	var imgNode = document.createElement("img");
	    imgNode.src = "data:image/gif;base64,R0lGODlhGAAQAOYAAP////z07vvz7vrz7vny7vjy7vbx7vrp3f/m1fno3fPm3fHl3fTczP3Vu+vYzOrYzPPSu//IpOPLu+HKu+vEquu6mfy3iNi9qtaxmc+kiP+aV86kiO+dZuiaZuOYZs6ad8qYd8eXd8SWd8WWd82PZruSd8KLZr+KZuR3LuJvIv9mANxtIv5mAPtkAPdjAPhjAPViAPRiANBoIvJhAKttRPFgAPBgAOteAOpeAOhdAOVcAMJiIuJbAMBhIuBaAN9ZAN1ZANxYANlXALheItZWANRVANJUANFUAM5TAMxSAKpZIslRAMZPAMVPAMRPAMBNAL1LALxLALlKALhJALZJALRIALNIALBGAKtEAKpEAKlEAKhDAKdDAKVCAKRCAKNBAKJBAKFAAJ9BA59AAJw+AJg9AJc8AJU8AJM7AI04AIs4AIo3AH0zAj8aASEOAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAAAYABAAAAfQgAgRg4SFhocRKBoqjI2Oj5AqbIuRlZCTlpmNmJqZnCoAoRA8LhYAAR03LQ0ACSkzLCyfAGFnBSRCAD1KAFAcAVgmBEs1kpSgIiAANFECEiNeVisAFydfUznGjQATABtqT0YfDwA7QDIZCwtQONqMAGslBmgeB1BYDiAUFVRcAF0/3IEqs0VBCCcMQjlIM2RAKAxmiAgMIoUIkStNkGghQyZLEiZgOFbRITBGjhgxdOiw4cOIER8wYAQ5ckTHC4GdIn3KeUlMm59Agwod2sZNIAA7";
	    imgNode.style.border = "none";
	var aNode = document.createElement("a");
	    aNode.href = feedUrl;
	    aNode.title = "Get notified about new feedback";
	    aNode.style.position = "absolute";
	    aNode.style.top = "0%";
	    aNode.style.left = "60%";
        aNode.appendChild(imgNode);
	document.getElementsByTagName("body")[0].appendChild(aNode);
})();