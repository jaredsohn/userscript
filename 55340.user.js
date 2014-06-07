//GreaseMonkey Script by AmitR, 8/9/2009
// ==UserScript==
// @name ProjectEuler.net center alignment
// @description aligns the content in projecteuler.net to the center
// @include http://*.projecteuler.net/*
// @include http://projecteuler.net/*
// ==/UserScript==
document.getElementsByTagName('body')[0].style.margin = '20px auto';