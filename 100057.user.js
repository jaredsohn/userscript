// ==UserScript==
// @name           Trophy Manager Bot
// @namespace      http://userscripts.org/users/revolt
// @description    Registers a random team
// @include        http://trophymanager.com/index1.php
// ==/UserScript==

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

var clubname = document.getElementsByTagName( 'input' );
var country = document.getElementsByTagName( 'select' );

function set() {
	var mail = randomString();
	var pass = randomString();
	for(i=0;i<=clubname.length-1;i++) {
		if(clubname[i].type == "text"&&clubname[i].name == "clubname") {
			clubname[i].value = randomString();
		}
		if(clubname[i].type == "text"&&(clubname[i].name == "email"||clubname[i].name == "email1")) {
			clubname[i].value = mail + '@yahoo.com';
		}
		if(clubname[i].type == "password"&&(clubname[i].name == "password"||clubname[i].name == "password1")) {
			clubname[i].value = pass;
		}
	}
	for(i=0;i<=country.length-1;i++) {
		if(country[i].name == "country") {
			country[i].selectedIndex = 94;
		}
	}
	alert('Password: ' + pass);
}

window.setTimeout(set,1000);