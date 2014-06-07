// ==UserScript==
// @name        RegionH Guest Network
// @namespace   bionaught
// @description Fills out RegionH Guest Network User name & password & submits
// @include     https://http://10.205.12.1/*
// @version     1
// @grant       none
// ==/UserScript==


document.getElementById('l_bs_name').value = "acer2@rimmo.dk";


// optional password filling and auto submit

// document.getElementById('password').value = "password";
// document.getElementById('login').getElementsByTagName('form')[0].submit();