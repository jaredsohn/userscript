// ==UserScript==
// @name			Google Menu Fix
// @namespace		http://www.felixmc.com/
// @description		Preview dribbbles without leaving the home or search page
// @homepage		http://www.felixmc.com/
// @version			0.1.4
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @include			http://*.google.*
// @include			https://*.google.*
// @exclude			https://mail.google.*
// @exclude			https://*.google.*/analytics/*

// ==/UserScript==

	jQuery("#gbz a.gbzt").attr("target", "_self");