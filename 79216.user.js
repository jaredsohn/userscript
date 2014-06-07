// ==UserScript==
// @name			童童派膠
// @namespace		        idskelvin.no-ip.org/
// @description		        派膠給童童
// @include			http://forum*.hkgolden.com/*
// @version			1.0.0
// ==/UserScript==

var today = new Date ()
var hours = today.getHours();
if (hours <=20) location.href = ("http://forum7.hkgolden.com/ProfilePage.aspx?userid=201419");