// ==UserScript==
// @name          SJSU Login
// @namespace     jj
// @description   Fills in some of the fields.
// @include       https://securelogin.arubanetworks.com/*
// ==/UserScript==

var username = document.getElementsByName("user");
username[0].value = "";

var password = document.getElementsByName("password");
password[0].value = "";

var form = document.getElementById("regform");
form.submit();
