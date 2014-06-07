// ==UserScript==
// @name				Week at a Glance Date Update
// @description			Updates the date to current
// @include				https://banapp.cc.binghamton.edu:8483/banner/bwskfshd.P_CrseSchd?start_date_in=08/31/2010
// @include				https://banapp.cc.binghamton.edu:8483/banner/bwskfshd.P_CrseSchd?*
// @run-at				document-end
// @version				0.1a
// ==/UserScript==

// created by Victor Oza

document.evaluate("//input[@value='Submit' and @type='submit']", document, null, 9, null).singleNodeValue.click();
var date = new Date();
var d  = date.getDate();
var day = (d < 10) ? '0' + d : d;
var m = date.getMonth() + 1;
var month = (m < 10) ? '0' + m : m;
var yy = date.getYear();
var year = (yy < 1000) ? yy + 1900 : yy;
window.alert("Showing the week including: " + month + "/" + day + "/" + year);