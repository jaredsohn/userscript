// ==UserScript==
// @name Sorted Redmine Google Dox embed fix
// @description Resizes the Remine Google Doc tab in Firefox for the Sorted project
// @include https://secure.headfirst.co.nz/redmine/tab/show/rc-sorted-rebuild
// @run-at document-end
// ==/UserScript==

var iframe = document.getElementsByTagName('iframe');
if ( iframe.length > 0 ) iframe[0].height = '800';
