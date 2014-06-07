// ==UserScript==
// @name        Facebook UserScript
// @namespace   http://dev.cyb3rsoft.com/userscripts/facebook
// @version     0.1
// @description Modifies some aspects of Facebook as a UserScript
// @match       https://www.facebook.com/*
// @copyright   (c) 2013 - Seraf Junior Dos Santos Fagundes
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

/**
 *  Hide right column
 */
$('.ego_section').css('display', 'none');
