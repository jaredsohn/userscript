// ==UserScript==
// @name Brown University Banner Autologin
// @description Automatically log in to Brown University's Course Management System
// @include https://selfservice.brown.edu/ss/*
// @version 1.0
// ==/UserScript==

//Make sure function occurs after pages has loaded
window.addEventListener('load',
function() {


//Replace X with your Username and Y with your password
var username = "X";
var password = "Y";

var button;

var x = document.getElementsByTagName("*");
for(var i=0; i<x.length; i++) {
if(x[i].name=="sid") {x[i].value=username;}
if(x[i].name=="PIN") {x[i].value=password;}
if(x[i].name=="loginform") {button=x[i];}
}

button.submit();


}, true);