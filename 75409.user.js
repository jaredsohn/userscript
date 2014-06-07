// ==UserScript==
// @name           New Lockerz Auto-Signup
// @namespace      http://userscripts.org/scripts/show/75409
// @description    What the name says..
// @include        http://www.lockerz.com/signup/*
// ==/UserScript==



function randomString(length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function randomalpha(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function randomphone_number(length) {
    var chars = '0123456789'.split('');
    
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function randomNumber() {
	var Number = Math.floor((Math.random() * 11) + 5)
	return Number;
}

function randomNumber2() {
	var Number = Math.floor((Math.random() * 11) + 10)
	return Number;
}


var first_name = randomString(randomNumber());
var last_name = randomString(randomNumber());
var country = "PT"
var prefix = "00351"
var rnd_ph_n = randomphone_number(9)
var phone_number = prefix + rnd_ph_n
var postal_code = randomphone_number(5)
var birth_date_month = Math.floor((Math.random() * 12) + 1)
var birth_date_day = Math.floor((Math.random() * 28) + 1)
var birth_date_year = Math.floor((Math.random() * 26) + 1970)
var pass = "lockerzcoins";

document.getElementById("first_name").value = first_name;
document.getElementById("last_name").value = last_name;
document.getElementById("country_code").value = country;
document.getElementById("postal_code").value = postal_code;
document.getElementById("time_zone").value = "0";
document.getElementById("gender_m").checked = true;
document.getElementById("phone_number").value = phone_number;
document.getElementById("birth_date_month").value = birth_date_month;
document.getElementById("birth_date_day").value = birth_date_day;
document.getElementById("birth_date_year").value = birth_date_year;
document.getElementById("password").value = pass;
document.getElementById("password_confirm").value = pass;
recaptcha_response_field
document.getElementById("recaptcha_response_field").focus();