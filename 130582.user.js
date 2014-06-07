// ==UserScript==
// @name           Imperial College Library Password Field Fix
// @namespace      http://userscripts.org/users/vahokif
// @description    Remove the maxlength of library password fields.
// @include        https://*.lib.ic.ac.uk/*
// @include        https://*.lib.imperial.ac.uk/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('input[type="password"]').removeAttr('maxlength');