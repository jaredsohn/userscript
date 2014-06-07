// ==UserScript==
// @name			Trac without Header
// @description		Use the space of the header for your trac ticket content. To accomplish this, the script removes the header with logo and rearrange the place of the search form to the left side.
// @author			Sven-Steffen Arndt
// @include			http://trac.*/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version			1.0
// ==/UserScript==

// rearrange search form and delete header
$("#banner").prepend($("#search"));
$("#search").css('float','left');
$("#header").remove();