// ==UserScript==
// @name BankOtsarFixes
// @namespace http://userscripts.org/users/Faruz
// @description Fixes Bank Otsar Pages
// @include https://www.fibi-online.co.il/*
// ==/UserScript== 
var bannerRemoval = document.getElementById('Banner1');
if (bannerRemoval!=null)
bannerRemoval.style.display = "none";
var bannerRemoval2 = document.getElementById('banner2');
if (bannerRemoval2!=null)
bannerRemoval2.style.display = "none";
GM_addStyle(".maintable td { padding:3px!important;border:1px solid #DDD!important}");
GM_addStyle(".maintable td td { padding:1px!important;border:0px solid #DDD!important}");
GM_addStyle(".totalrow td { padding:1px!important;border:0px solid #DDD!important}");