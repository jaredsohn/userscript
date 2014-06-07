// ==UserScript==
// @name           TikiReturn2Req
// @namespace      elie
// @description    Return to FB request page from Tiki
// @include        http://apps.facebook.com/tikiresort_zhtw/?page=giftAccepted*
// ==/UserScript==

//var RCAcceptMore = document.getElementById('giftAcceptedBox');
var RCAcceptMore = document.getElementsByName('game_frame')[0];

if ( RCAcceptMore == null || RCAcceptMore == undefined ) {
	//alert('No form');
}
else {
	//self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php";}, 2000);

	self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php#confirm_356104976566_0";}, 2000);
}