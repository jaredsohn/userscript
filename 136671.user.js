// ==UserScript==
// @name			Facebook Adds Cleaner
// @description	    Freaking clean ads
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			annonym
// @version			0
// @versionnumber	0
// @namespace		
// ==/UserScript==
//
window.onload=function() {
if (document.getElementById("pagelet_ego_pane_w") != null) document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden'; 
document.getElementById('pagelet_ego_pane').style.visibility = 'hidden'; 
}