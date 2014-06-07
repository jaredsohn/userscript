// ==UserScript==
// @name           Adf.ly Bypasser
// @namespace      Ipomu & Rizkiilyas
// @include        http://adf.ly/*
// ==/UserScript==

// I'm sick of waiting :|


window.location = (u = document.body.innerHTML.match(/id="skip_button" href="([^\"]+)"/i))[1]; document.title = "Redirecting to: " + u[1];
