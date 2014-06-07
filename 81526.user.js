// ==UserScript==
// @name           APReturn2Req
// @namespace      elie
// @description    Return to FB request page from Animal Paradise
// @include        http://apps.facebook.com/animal_paradise/receive_gift/?sender*
// ==/UserScript==

// @include        http://http://apps.facebook.com/animal_paradise/finish_send_gift/*
var APAcceptDiv = document.getElementsByClassName('main')[0];

if ( APAcceptDiv == null || APAcceptDiv == undefined ) {
	//self.location.reload(true);
	self.setTimeout(function() {self.location.reload(true);}, 2000);
}
else {
	self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php#confirm_99953444729_0";}, 1000);

}

