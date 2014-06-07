// ==UserScript==
// @name           Slashdot Unfix Header
// @description    Makes slashdot's header and sidebar scroll with the page again.
// @namespace      http://userscripts.org/users/282819
// @include        http://*.slashdot.org/*
// @include        http://slashdot.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('div.col_1').css('position', 'absolute');
$('header.h').css('position', 'relative');
$('header.h').css('top', '-40px');
$('#content').css('margin-top', '-40px');