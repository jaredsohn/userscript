// ==UserScript==
// @name         Userscripts Edit Link
// @namespace    http://userscripts.org/users/drnick
// @downloadURL  https://userscripts.org/scripts/source/161321.user.js
// @updateURL    https://userscripts.org/scripts/source/161321.meta.js
// @description  Adds an Edit link next to Admin that goes directly to script edit page
// @include      *userscripts.org/scripts/*
// @grant        none
// @version      1.0
// ==/UserScript==

(function() {

	if (typeof jQuery == 'undefined') return;
	if (window.self != window.top) return;
	
	var $ = jQuery;
	var admin = $("#script-nav .menu");
	
	if (admin.length == 0) return;
	
	admin = admin.eq(0);
	var edit = admin.clone();
	var link = edit.find("a");
	link.text("Edit");
	link.attr("href", link.attr("href").replace("admin", "edit"));
	
	admin.after(edit);

})();