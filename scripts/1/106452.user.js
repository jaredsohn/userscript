// ==UserScript==
// @name           Facebook Chat Fixer
// @namespace      http://userscripts.org/users/23652
// @description    SImply changes the Opacity from 0.9 to 1 fixes my issue
// @include				http://facebook.com/
// @include				http://*.facebook.com/
// @include				http://www.facebook.com/
// @include				http://www.*.facebook.com/
// @include				http://facebook.com/*
// @include				http://*.facebook.com/*
// @include				http://www.facebook.com/*
// @include				http://www.*.facebook.com/*
// @include				https://facebook.com/
// @include				https://*.facebook.com/
// @include				https://www.facebook.com/
// @include				https://www.*.facebook.com/
// @include				https://facebook.com/*
// @include				https://*.facebook.com/*
// @include				https://www.facebook.com/*
// @include				https://www.*.facebook.com/*

// ==/UserScript==

var elmModify = document.getElementById("pagelet_presence");
elmModify.style.opacity = '1';