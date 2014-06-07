// ==UserScript==
// @name           DO IT FOR BILLY
// @namespace      Billy Mays
// @include        http://www.pdxnamethatbuilding.com/name_it/speak_up
// ==/UserScript==

	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}

var name = randomstring;
var email = randomstring+'@gmail.com';

document.getElementById('speak_up_name').value=name;
document.getElementById('speak_up_email_address').value=email;

var i = 0;
while(i<document.getElementById('speak_up_box').children.length){

document.evaluate( '//input[contains(@class, "dislike")]' , document, null, 6, null ).snapshotItem(i).click();

i++;
}

var code = document.evaluate( '//span[text()="The Billy Mays Memorial Tower"]' , document, null, 0, null 

).iterateNext().id.split('_')[1];

document.getElementById('name_speak_up_'+code+'_like').click();