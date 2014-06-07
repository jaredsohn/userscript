// ==UserScript==
// @name           Odstranitev Facebook gumbka
// @description    Removes the "Connect to Facebook" button from your eRep profile
// @version        1.1
// @author	   eCitizen Matevzs1
// @namespace      http://ww*.erepublik.com/*
// @include        http://ww*.erepublik.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$(document).ready(function() {
	$("#RES_ID_fb_login").remove();
});