// ==UserScript==
// @name		Clean9GAG
// @description	Deletes a few 9GAG Toolbars and Sidebars
// @namespace	9gag
// @copyright	none
// @version		0.1
// @include		http*://9gag.com/*
// @run-at		document-end
// @updateURL   
// ==/UserScript==

$('.post-afterbar-a, .sticky-action, .sticky-social, #sidebar').css('display: none');
// doesnt work