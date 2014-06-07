// ==UserScript==
// @name        Hkgolden AD
// @namespace   hkgolden_ad
// @version     1
// @include http://forum*.hkgolden.com/*
// @downloadURL   https://userscripts.org/scripts/source/173028.user.js
// @updateURL     https://userscripts.org/scripts/source/173028.meta.js
// ==/UserScript==
var ad = document.getElementsByClassName("myTestAd")[0];
ad.style.height = '1px';
ad.style.display = 'none';