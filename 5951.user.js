// Google Secure Pro
// version 1.6
// Started 2006-10-13
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Secure Pro", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Secure Pro
// @description   Forces Google Search, gMail, gCal, Google Docs & Spreadsheets, and Google Reader to use secure connection.
// @include       http://mail.google.com/*
// @include       http://www.google.tld/calendar/*
// @include       http://docs.google.tld/*
// @include       http://spreadsheets.google.tld/*
// @include       http://www.google.tld/reader/*
// @include       http://www.google.tld/bookmarks/*
// @include       http://www.google.tld/history/*
// @include       http://groups.google.tld/*
// @include       http://sites.google.tld/*
// @include       http://knol.google.tld/*
// @include       http://www.google.tld/notebook/*
// @include       http://www.google.tld/webmasters/tools/*
// @include       http://www.google.tld/contacts
// @include       http://www.google.tld/voice/*
// @include       http://www.google.tld/finance*
// @include       http://www.google.tld/dictionary*
// @include       http://www.google.com/search*

// ==/UserScript==

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}

//
// ChangeLog
// 0.1 - 2006-10-13 - Removed spreadsheets from the script. It does not support SSL.
// 0.2.1 - 2007-04-10 - Added Google Reader and Google Spreadsheets.
// 0.4 - 2007-05-02 - Added Google History and Google Bookmarks.
// 0.5 - 2007-05-09 - Added iGoogle
// 0.6 - 2007-05-10 - Removed iGoogle.  Noticed it won't allow user to search from the SSL iGoogle.  Researching workaround..
// 0.8 - 2008-03-24 - Added Google Groups
// 0.9 - 2008-07-24 - Added Google Sites
// 1.0 - 2008-10-04 - Added Google Knol
// 1.1 - 2009-02-04 - Added Google Notebook and Google Webmasters
// 1.2 - 2009-05-17 - Added Google Voice and Google Contacts
// 1.3 - 2009-11-1  - Fixed Google Webmasters link & added if-statement so page doesn't reload if HTTPS is already loaded (Thanks Bob3333).  Also added Google Finance.
// 1.4 - 2009-11-29 - Fixed small bug with Google Finance as it wasn't encrypting the first page
// 1.5 - 2009-12-4  - Added Google Dictionary
// 1.6 - 2010-5-22  - Added Google Search & Added TLD fix (thanks Agantha)