// ==UserScript==
// @name Windows Live Sign In
// @description Automatically sign in to Windows Live Mail cause Firefox can't
// @include http://login.live.com/*
// @include https://login.live.com/*
// @version 0.1
// ==/UserScript==

//add event listener to call my anonymous function after the page loads
window.addEventListener('load',
function() {
//Get email address box and fill it
document.getElementById("i0116").value = "YOUR_USERNAME";

//Get password box and fill it
document.getElementById("i0118").value = "YOUR_PASSWORD";
}, true);
