// ==UserScript==
// @name           Fix Ikariam Login
// @namespace      BlackWidow
// @version	   0.0.3
// @description	   Hide elements on start cite.
// @exclude        http://support*.ikariam.*/*
// @exclude        http://board*.ikariam.*/*
// @exclude        http://*.gameforge.com/?kid=1-29815-03815-1003-101121cd
// @include        http://*.ikariam.*/*
// @include        http://s*.ikariam.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

$(function() {
$('#sidebarWrapper,#content, #sky,#sun,#sunWrapper,#water,#footer-wrapper,#header #logo,.fbBtn,.oiBtn,#pagefoldtarget,.islands, .ship, #loginWrapper, #mmoGamesOverviewPanel').toggle();
});




