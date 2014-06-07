// ==UserScript==
// @name           Outlook Web Access Auto Login
// @namespace      noon
// @description    Automatically login to M$'s new web interface for Outlook
// @include        http://owamail.XXX.edu/*
// @include        https://owamail.XXX.edu/owa/auth/logon*
// @include        https://owamail.XXX.edu/exchweb/bin/auth/owalogon*
// ==/UserScript==

// Change the line below to the login page of your Outlook webmail login.
// This page must contain the actual form you enter your username/password at
// This page should match one of your @includes
var login_page = 'https://owamail.XXX.edu/exchweb/bin/auth/owalogon.asp';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//                                                      //
// To determine what your 'encrypted' version of your   //
// username and password is, enter your                 //
// username/password below.                             //
//                                                      //
// Popup windows MUST be allowed for this script to     //
// be able to generate your encrypted username/password //
//                                                      //
// MAKE SURE TO DELETE YOUR USERNAME AND PASSWORD FROM  //
// BELOW AFTER YOU HAVE DETERMINED THE ENCRYPTED        //
// VERSION(S) ! ! !                                     //
//                                                      //
// This is merely a minor measure of security to avoid  //
// your password being visible in plain text to anyone  //
// that opens this file. It is not hard to decrypt      //
// the username and password from this file. Use at     //
// your own risk.                                       //
//                                                      //
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

var username = 'ENTER_USERNAME_HERE'; // DELETE AFTER YOU GENERATE ENCRYPTED VERSION
var password = 'ENTER_PASSWORD_HERE'; // DELETE AFTER YOU GENERATE ENCRYPTED VERSION

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//                                                      //
// Paste the generated username and password from the   //
// the popup window here.                               //
//                                                      //
// MAKE SURE TO CHANGE THE TEST VARIABLE TO FALSE       //
// AFTER YOU HAVE DONE THIS STEP ! ! !                  //
//                                                      //
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

var test = true;	// CHANGE TO FALSE AFTER YOU HAVE PASTED USERNAME/PASSWORD BELOW

var encrypted_username = 'PASTE_PASSWORD_FROM_POPUP_HERE';
var encrypted_password = 'PASTE_USERNAME_FROM_POPUP_HERE';

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//                                                      //
//          DO NOT MODIFY THE CODE BELOW                //
//          UNLESS YOU KNOW WHAT                        //
//          YOU ARE DOING . . .                         //
//                                                      //
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

if (test) {
	makewindow(username, password);
}
else {
	var images = document.getElementsByTagName('img');

	// My school has a warning page.
	// You can modify the image.src address to an image that appears on 
	// your schools warning page if you have one too.
	// This will auto-redirect to the login page you have specified earlier.
	if (images.length) {
		for (var i=0; i<images.length; i++) {
			var image = images[i];
	        if (image.src == 'https://owamail.xxx.edu/images/example.gif'){
	           window.location.href = login_page;
	        }
		}
	}

	var username = document.getElementById('username');
	var password = document.getElementById('password');

	username.value = unescape(encrypted_username);
	password.value = unescape(encrypted_password);
	document.forms[0].submit();
}

function makewindow(username, password) {
	var user = escapeTxt(username);
	var pass = escapeTxt(password);

	TheNewWin = window.open('', 'name', 'height=100,width=auto, toolbar=no,directories=no,status=no,menubar=no, scrollbars=no,resizable=yes');
	TheNewWin.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http:\/\/www.w3.org\/TR\/	xhtml1\/DTD\/xhtml1-transitional.dtd"><html xmlns="http:\/\/www.w3.org\/1999\/xhtml">');
	TheNewWin.document.write('<head><title>Username/Password<\/title><\/head><body style="overflow:hidden; font-family: Verdana, sans-serif; font-size: 12px;" bgcolor="#ffffff"><p>Username: ' + user + '<\/p><p>Password: ' + pass + '');
	TheNewWin.document.write('<\/body><\/html>');
}

function escapeTxt(escapeme){
	var escaped='';
	var t;
	var chr='';
	var cc='';
	var tn='';
	for (i=0;i<256;i++) {
		tn=i.toString(16);
		if (tn.length<2) {
			tn="0"+tn;
		}
		cc+=tn;
		chr+=unescape('%'+tn);
	}

	cc=cc.toUpperCase();
	escapeme.replace(String.fromCharCode(13)+'',"%13");
	for (q=0;q<escapeme.length;q++) {
		t=escapeme.substr(q,1);
		for(i=0;i<chr.length;i++) {
			if(t==chr.substr(i,1)) {
				t=t.replace(chr.substr(i,1),"%"+cc.substr(i*2,2));
				i=chr.length;
			}
		}
		escaped+=t;
	}

	return (escaped);
}