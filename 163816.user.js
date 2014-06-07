// ==UserScript==
// @name		Elkien Woningbrowser
// @namespace		userscripts
// @description		Knoppen toevoegen om te browsen tussen huizen
// @include		http://wrb.edwa.nl/aanbod/huuraanbod/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant		none
// @version		0.1
// ==/UserScript==



// Config
var url = window.location.protocol + "//" + window.location.host + window.location.pathname;

// Querystring
var queryString = {};
window.location.href.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) { queryString[$1] = $3; }
);

var woningId = Number(queryString.ID);
var prev = woningId - 1;
var next = woningId + 1;
var navbar = $('div#main-right div#breadcrumb > ul');

// Append navigation
navbar.append('<li style="float: right;"><a href="'+url+'?ID='+next+'">Volgende</a></li>');
navbar.append('<li style="float: right;"><a href="'+url+'?ID='+prev+'">Vorige</a></li>');
