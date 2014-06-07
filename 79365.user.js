// ==UserScript==
// @name           RCReturn2Req
// @namespace      elie
// @description    Return to FB request page from RC
// @include        http://apps.facebook.com/restaurantcity/sticker_click_handler*
// @include        http://apps.facebook.com/restaurantcity/end_send_regift*
// ==/UserScript==

var RCAcceptMore = document.getElementById('app43016202276_gift_button_more');

if ( RCAcceptMore == null || RCAcceptMore == undefined ) {
	self.location.reload(true);
}
else {
	self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php";}, 2000);

	//self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php#confirm_43016202276_0";}, 1000);
}