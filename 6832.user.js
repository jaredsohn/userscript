// ==UserScript==
// @name           Login to @hotmail
// @description    Why should I have to type out @hotmail.com every single ****ing time?
// @include        http://login.live.com/*
// ==/UserScript==

// set your domain here
var _domain = "@hotmail.com";

//
var login_field = document.getElementsByName("login")[0];


login_field.addEventListener("blur", function(e) {

if (this.value.indexOf(_domain) < 0) {
this.value = this.value + _domain;
} else {
return;
}


}, false);


 
