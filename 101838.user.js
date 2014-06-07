// ==UserScript==
// @name			Google Search AJAX Killer
// @description		auto redirect to the non-AJAX URL.
// @version        1.0
// @include			http://www.google.com/*
// @include			http://www.google.co.jp/*
// @include			http://www.google.*/*
// @include			https://encrypted.google.com/*
// ==/UserScript==

window.addEventListener("hashchange", function(){ 
var hx = location.href.indexOf("#"); if(hx == -1) return; 
var hash = location.href.substring(hx + 1); 
var query = (hash.match(/(^|&)(q=[^&]+)/)||[])[2]; if(!query) return; 
window.removeEventListener("hashchange", arguments.callee, false); 
var baseUrl = "/search?"; 
var params = [query, "complete=0"].join("&"); 
location.href = baseUrl + params; 
}, false); 