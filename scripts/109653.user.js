// Copyright (c) 2011, Deathalicious
// Released under the BSD license:
// http://www.opensource.org/licenses/bsd-license.php
//
// ==UserScript==
// @name          Fancy Tooltip
// @namespace     http://www.metafilter.com/user/25038
// @description   Shows a fancier mouseover for titles
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require       https://github.com/jaz303/tipsy/raw/master/src/javascripts/jquery.tipsy.js
// @include       *
// ==/UserScript==
$(document).ready(function (){
	var css_source = 'data:text/css;base64,' +
		'LnRpcHN5IHsgZm9udC1zaXplOiAxMHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IHBhZGRpbmc6IDVweDsg' +
		'ei1pbmRleDogMTAwMDAwOyB9CiAgLnRpcHN5LWlubmVyIHsgYmFja2dyb3VuZC1jb2xvcjogIzAwMDsg' +
		'Y29sb3I6ICNGRkY7IG1heC13aWR0aDogMjAwcHg7IHBhZGRpbmc6IDVweCA4cHggNHB4IDhweDsgdGV4' +
		'dC1hbGlnbjogY2VudGVyOyB9CgogIC8qIFJvdW5kZWQgY29ybmVycyAqLwogIC50aXBzeS1pbm5lciB7' +
		'IGJvcmRlci1yYWRpdXM6IDNweDsgLW1vei1ib3JkZXItcmFkaXVzOiAzcHg7IC13ZWJraXQtYm9yZGVy' +
		'LXJhZGl1czogM3B4OyB9CiAgCiAgLyogVW5jb21tZW50IGZvciBzaGFkb3cgKi8KICAvKi50aXBzeS1p' +
		'bm5lciB7IGJveC1zaGFkb3c6IDAgMCA1cHggIzAwMDAwMDsgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAg' +
		'NXB4ICMwMDAwMDA7IC1tb3otYm94LXNoYWRvdzogMCAwIDVweCAjMDAwMDAwOyB9Ki8KICAKICAudGlw' +
		'c3ktYXJyb3cgeyBwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAwOyBoZWlnaHQ6IDA7IGJvcmRlcjog' +
		'NXB4IHNvbGlkIHRyYW5zcGFyZW50OyB9CiAgCiAgLyogUnVsZXMgdG8gY29sb3VyIGFycm93cyAqLwog' +
		'IC50aXBzeS1hcnJvdy1uIHsgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzAwMDsgfQogIC50aXBzeS1hcnJv' +
		'dy1zIHsgYm9yZGVyLXRvcC1jb2xvcjogIzAwMDsgfQogIC50aXBzeS1hcnJvdy1lIHsgYm9yZGVyLWxl' +
		'ZnQtY29sb3I6ICMwMDA7IH0KICAudGlwc3ktYXJyb3ctdyB7IGJvcmRlci1yaWdodC1jb2xvcjogIzAw' +
		'MDsgfQogIAogIC50aXBzeS1uIC50aXBzeS1hcnJvdywgLnRpcHN5LW53IC50aXBzeS1hcnJvdywgLnRp' +
		'cHN5LW5lIC50aXBzeS1hcnJvdyB7IHRvcDogMDsgYm9yZGVyLXRvcDogbm9uZTsgfQogIC50aXBzeS1z' +
		'IC50aXBzeS1hcnJvdywgLnRpcHN5LXN3IC50aXBzeS1hcnJvdywgLnRpcHN5LXNlIC50aXBzeS1hcnJv' +
		'dyB7IGJvdHRvbTogMDsgYm9yZGVyLWJvdHRvbTogbm9uZTsgfQogIC50aXBzeS1uIC50aXBzeS1hcnJv' +
		'dywgLnRpcHN5LXMgLnRpcHN5LWFycm93IHsgbGVmdDogNTAlOyBtYXJnaW4tbGVmdDogLTVweDsgfQog' +
		'IC50aXBzeS1udyAudGlwc3ktYXJyb3csIC50aXBzeS1zdyAudGlwc3ktYXJyb3cgeyBsZWZ0OiAxMHB4' +
		'OyB9CiAgLnRpcHN5LW5lIC50aXBzeS1hcnJvdywgLnRpcHN5LXNlIC50aXBzeS1hcnJvdyB7IHJpZ2h0' +
		'OiAxMHB4OyB9CiAgLnRpcHN5LWUgLnRpcHN5LWFycm93LCAudGlwc3ktdyAudGlwc3ktYXJyb3cgeyB0' +
		'b3A6IDUwJTsgbWFyZ2luLXRvcDogLTVweDsgfQogIC50aXBzeS1lIC50aXBzeS1hcnJvdyB7IHJpZ2h0' +
		'OiAwOyBib3JkZXItcmlnaHQ6IG5vbmU7IH0KICAudGlwc3ktdyAudGlwc3ktYXJyb3cgeyBsZWZ0OiAw' +
		'OyBib3JkZXItbGVmdDogbm9uZTsgfQo=';
	var $stylesheet = $('<link>');
        $stylesheet.attr('rel',"stylesheet").attr('href',css_source).appendTo('head');
	$('[title]').tipsy();
});