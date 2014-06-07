// ==UserScript==
// @name			Auto-login to Salesforce
// @version			1.0.0
// @date			6/29/2011
// @description		Tests whether you're signing in to your development org or test org, fills in your login credentials, then logs in
// @include			https://login.salesforce.com/*
// @include			https://test.salesforce.com/*
// ==/UserScript==
var URL = document.location.href;
var Live = false;
var Test = false;
if(URL.indexOf('login.salesforce') > 0) Live = true;
else Test = true;
var Usern = document.getElementById('username');
var Passw = document.getElementById('password');
if(Live){
	Usern.value = 'username for live';
	Passw.value = 'password for live';
}else{
	Usern.value = 'username for test';
	Passw.value = 'password for test';
}
document.getElementById('Login').click();