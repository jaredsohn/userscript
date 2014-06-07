// ==UserScript==
// @name        AldiFixer
// @description Fixes Aldi logistics site
// @author      Steve Keylon and Stephen Bell
// @include	https://www.logisticsacp.com/*
// @version     0.4
// ==/UserScript==
//GM_addStyle("#_waffle_blocking_layer {display: none !important;}");
setTimeout(function() {document.getElementById('_waffle_blocking_layer').style.display = 'none';}, 500);