// ==UserScript== 
// @name        Remove OpenCongress Donation Banner
// @author      Michael Soh 
// @namespace   opencongress-banner-105447 
// @description Removes the annoying donation banner.
// @version     0.1
// @license     GPL 3.0 
// @include     http://*.opencongress.org/*
//  
// @require     http://usocheckup.redirectme.net/105447.js
// 
// ==/UserScript== 

document.getElementsByClassName('banner')[0].style.display = "none";

