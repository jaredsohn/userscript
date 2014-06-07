// ==UserScript==
// @name GT Login
// @description Automatically login to GT services.
// @include https://login.gatech.edu/cas/*
// ==/UserScript==

// Replace username and password inside the quotes with your GT
// login information
var GTUser = "username";
var GTPassword = "password";

// don't worry about the code down here unless you're a CS
// and like that kind of stuff.
var userbox = document.getElementById('username');
var passbox = document.getElementById('password');
var submitBtn = document.getElementById('fm1').getElementsByClassName('btn-submit')[0];

userbox.value = GTUser;
passbox.value = GTPassword;
submitBtn.click();