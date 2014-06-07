// ==UserScript==
// @name          Bigger Inputs for PhpMyAdmin, edit
// @namespace     
// @description   Bigger Inputs for PhpMyAdmin, edit
// @include       https://*/3rdparty/phpMyAdmin/*
// @include       http://localhost/phpmyadmin/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
$().ready(function() {
	$("input[id*='field_']").css('width', '800px'); 
});
