// ==UserScript==
// @name        Medusa-Print-Form
// @description Medusa-Print-Form
// @include     http://medusa.regionh.dk/*
// @include     http://medusa.regionh.dk/*
// ==/UserScript==



var ModelFormValue    = document.getElementById ("txtModel");
var ModelFormLabel    = document.getElementById ("lblModel");
document.getElementById("lstPrinters").innerHTML = '<option value="137">NSH-IMT01-REG</option><option value="138">NSH-IMT01-FV</option><option value="139">NSH-IMT02-REG</option><option value="140">NSH-IMT02-FV</option>';