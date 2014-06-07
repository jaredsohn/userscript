// ==UserScript==
// @name       		Facebook, Right Column remover
// @namespace  		http://kasoki.de
// @version    		0.1.1
// @description  	removes the right column and fill it with the more important stuff (your timeline :P)
// @match	      	https://*.facebook.com/*
// @copyright  		2013, Christopher Kaster
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $("#rightCol").remove();
    $("#contentArea").width("90%");
});
