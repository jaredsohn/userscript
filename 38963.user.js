//GreaseMonkey Script by AmitR, 12/20/2008
// ==UserScript==
// @name Seret.co.il Logo Fix
// @description fixes Seret.co.il's logo position
// @include http://*.seret.co.il/*
// @include http://seret.co.il/*
// ==/UserScript==
document.getElementsByTagName('body')[0].getElementsByTagName('table')[2].getElementsByTagName('span')[1].setAttribute('style', 'float: right');