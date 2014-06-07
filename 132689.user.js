/* This greasemonkey script adds 'Unlabelled' at the end of the labels list 
 * to search for unlabelled conversations
 *
 * Author: Simon Wheatley
 * Version: v1.0
 *
 * Copyright (c) 2012, Simon Wheatley
 * Released under the GPL license version 2.
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

// ==UserScript==
// @name           SW Gmail Unlabelled 2.0
// @namespace      http://simonwheatley.co.uk/
// @description    This script adds 'Unlabelled' at the end of the labels list to search for unlabelled conversations. This version is for the "new" version of gmail (Nov 2007).
// @include        http*://mail.google.com/*
// @require        http://code.jquery.com/jquery.min.js
// @version        v1.0
// less
// ==/UserScript==

var sw_found = false;
var sw_retry = 0;
var sw_max_retries = 12;
var sw_retry_delay = 500; // Milliseconds
var sw_menu_class = "LrBjie";
var sw_label_class = "n0"

function GM_wait(){ if (typeof unsafeWindow.$ == 'undefined') { window.setTimeout(GM_wait, 500) } }

GM_wait();

$(window).load(function(){
	console.log();
}

