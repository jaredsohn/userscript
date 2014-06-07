// ==UserScript==
// @name          UDC Accept All Friend Requests
// @namespace     http://youngpup.net/userscripts
// @description   Accepts all friend requests on Unitedcats and Uniteddogs
// @include       http://www.unitedcats.com/en/home
// @include       http://unitedcats.com/en/home
// @include       http://www.uniteddogs.com/en/home
// @include       http://uniteddogs.com/en/home
// ==/UserScript==

if (document.getElementById('friends_requests_container')!= null) {
	regExp3  = /show-animal-friends-requests/;
	if (regExp3.test(document.getElementById("friends_requests_container").innerHTML)) {
		alert("Please click Show first");
	}
	var requestCount = 0;
	var requestArray = new Array();
	var linkURL;aTagArray = document.getElementsByTagName("A");
	var linkCount = aTagArray.length;
	regExp = /accept_request/;
	for(i=0;(i<linkCount);i++) {
		if(regExp.test(aTagArray[i])) {
			requestArray.push(aTagArray[i]);
		}
	}
	requestCount=requestArray.length;
	if (requestCount>0) {
		for(i=0;(i < requestCount);i++) {
			top.location.href = requestArray[i];
		}
	}
}

// end of script

