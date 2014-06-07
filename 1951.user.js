// ==UserScript==
// @name           AdLibris.se autologin
// @namespace      http://henrik.nyh.se
// @description    Automatically submits the AdLibris.se login form if your username and password were automatically filled in (typically by the Firefox password manager).
// @include        https://www.adlibris.se/*
// ==/UserScript==

function $(id) { return document.getElementById(id); }

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var wait = 1000;

var username = $('ctl00_main_frame_txtUserId');
var password = $('ctl00_main_frame_txtPassword');
var submitter = $('ctl00_main_frame_imgLogin');

if (!password) return;

function doSignIn() {
	if(username.value.length && password.value.length)
		submitter.click();
}

window.setTimeout(doSignIn, wait);

