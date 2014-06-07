// ==UserScript==
// @name		GoogleSameTab
// @namespace		greg.bunia@gmail.com
// @description		This script prevents Google from opening new tabs when switching accounts
// @version		0.1.0
// @require		https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @include		http://*.google.*
// @include		https://*.google.*
// @exclude		https://mail.google.*
// @exclude		https://*.google.*/analytics/*

// ==/UserScript==

jQuery("*[role='navigation']").first().find('div[aria-hidden]').last().children().find('a[rel="noreferrer"]').prop('target','_self')