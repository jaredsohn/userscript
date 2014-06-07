// ==UserScript== 
// @name Bypass adf.ly adds
// @description Bypass adf.ly links and automatically reach the destination you want
// @version 1.0
// @include http://*adf.ly/*
// @grant none
// @run-at document-start
// ==/UserScript== 
var url=window.location.pathname;
var url1="http://dlgen.heliohost.org/adf/"+url;
window.location.replace(url1.replace("http://adf.ly/",""));