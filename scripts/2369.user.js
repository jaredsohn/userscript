// Version 0.2
// Wednesday, December 16, 2005.
// LinuxMail AutoLogin
// Adam Knutson
// crrimson[AT]gmail[DOT]com
//
// ==UserScript==
// @name         Linuxmail AutoLogin
// @description  Automatically logs in at linuxmail.org, and skips ads.
// @include http://www.linuxmail.org/*
// @include http://*.linuxmail.org/*
// ==/UserScript==

var location = window.location.toString();

// *********************************
// Enter your username/password here:
var USERNAME = 'username';
var PASSWORD = 'password';
// *********************************

if( location.indexOf('www\.linuxmail\.org/scripts/common/index\.main') > -1 ) {
    // if we're at the main page then login.
    var userNameField = document.forms[0].elements[5];
    var passwordField = document.forms[0].elements[6];
    var loginButton = document.forms

	if (passwordField.type == 'password') {
	    userNameField.value = USERNAME;
	    passwordField.value = PASSWORD;
	    document.forms[0].submit();
	}
	else {
	    alert("LinuxMail Autologin Error, fix me!");
	}
}


// Skip the linuxmail ads that pop up.
if( location.indexOf('mymail\.linuxmail\.org/scripts/common/intr\.main') > -1 ) {
    // This is an ad window, lets skip it.
    var links = document.links;
    
    for (var i = 0; i < links.length; i++) {

	if( links[i].innerHTML.indexOf('No thanks') > -1 ) {
	    //this is the no thanks we don't want to pay for your awful email service link
	    window.location.href = links[i].href; // click it
	}
    }
}


