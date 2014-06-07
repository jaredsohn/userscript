// ==UserScript==
// @name       Couchsurfing browse anonymously
// @namespace  http://hiddentao.com
// @version    0.1
// @description Allows you to browse couchsurfing without registering as a user
// @match      https://www.couchsurfing.org/n/places/*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2012+, Ramesh Nair (hiddentao.com)
// ==/UserScript==

var $ = jQuery;

$(document).ready(function(){
	$('#signup_modal').hide();
    $('.modal-backdrop').hide();
});
