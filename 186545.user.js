// ==UserScript==
// @name      		Bazaar admin close reason fix
// @version    		1
// @match      		http://bazaar.tf/*
// @require         http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function(){
	$('textarea.form-control').addClass('close-reason');
});