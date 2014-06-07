// ==UserScript==
// @name			Facebook Cleaner by Kahfi.19
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Kahfi.19
// @version			8
// ==/UserScript==
//
window.onload=function() {
if (document.getElementById("pagelet_ego_pane_w") != null) document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden'; 
document.getElementById('pagelet_ego_pane').style.visibility = 'hidden'; 
}