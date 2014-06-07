// ==UserScript==
// @name Ticalc.org Auto-Sorter
// @namespace http://www.BaykunProducts.webs.com
// @description Automatically sorts the files in the ticalc.org archives by rating.
var pathNAME = window.location.pathname;
if(window.location.host = "www.ticalc.org" or window.location.host = "ticalc.org"){
 if(pathNAME.substring(1,3)=="pub"){
  var newURL = window.location.protocol + "://" + window.location.host + "/" + pathNAME;
  window.location(newURL + "/rate.html");
 }
}
// ==/UserScript==