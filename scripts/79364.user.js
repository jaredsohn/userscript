// ==UserScript==
// @name           FVReturn2Req
// @namespace      elie
// @description    Return to FB request page from FV
// @include        http://apps.facebook.com/onthefarm/giftaccept.php*
// @include        http://apps.facebook.com/onthefarm/sentthankyougift.php*
// ==/UserScript==

//var FVAcceptMore = document.getElementsByName('send')[0];
var FVAcceptMore = document.forms[2];

if ( FVAcceptMore == null || FVAcceptMore == undefined ) {
	self.location.reload(true);
}
else {
	self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php";}, 2000);

	//self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php#confirm_102452128776_0";}, 1000);
}