// ==UserScript==
// @name           CSReturn2Req
// @namespace      elie
// @description    Return to FB request page from CS
// @include        http://apps.facebook.com/countrystory/gifts_accepted*
// @include        http://apps.facebook.com/countrystory/end_send_regift*
// ==/UserScript==

var CSAcceptMore = document.getElementById('app165747315075_gift_button_more');

if ( CSAcceptMore == null || CSAcceptMore == undefined ) {
	self.location.reload(true);
}
else {
	self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php";}, 2000);

	//self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php#confirm_165747315075_0";}, 1000);
}