// ==UserScript==
// @name        Tumblr Autologin
// @namespace   tumblr
// @description Tumblr Autologiner Script
// @include     https://*.tumblr.com/*
// @include     https://*.tumblr.com/login*
// @version     1
// ==/UserScript==

var smail=document.getElementById("signup_email");
var spass=document.getElementById("signup_password");
var slogin=document.getElementById("signup_forms_submit");

var tumblrUser={
	username: null,
	password: null,
	login: function(){
		//document.getElementById("signup_button_login").click();
		smail.value=this.username;
		spass.value=this.password;
		slogin.click();
	}
};

var userInfo = function(){
	if(smail.value=="" && spass.value==""){
		tumblrUser.username=""; // your username
		tumblrUser.password=""; // your password
		tumblrUser.login();
	}
}

userInfo();